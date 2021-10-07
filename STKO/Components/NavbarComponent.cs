using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using STKO.Models.DomainModels;
using STKO.ViewModels;

namespace STKO.Components
{
    /// <summary>
    /// A View Component that renders the Navbar.
    /// Creates links dynamically and distinguishes between a regular user and an admin user
    /// </summary>
    public class NavbarComponent : ViewComponent
    {
        private readonly NavbarViewModel _adminMenu = new()
        {
            NavbarTitle = "Admin",
            NavbarContent = new Dictionary<string, List<NavigationLinkViewModel>>
            {
                ["Användare"] = new()
                {
                    new NavigationLinkViewModel {HeadLine = "Hantera användare", LinkType = LinkType.RazorPage, Location = "/Users/List" },
                    new NavigationLinkViewModel { HeadLine = "Skapa ny användare", LinkType = LinkType.RazorPage, Location = "/Users/Create"}
                },
                ["Roller"] = new()
                {
                    new NavigationLinkViewModel { HeadLine = "Hantera roller", LinkType = LinkType.RazorPage, Location = "/Roles/List" },
                    new NavigationLinkViewModel { HeadLine = "Skapa ny roll", LinkType = LinkType.RazorPage, Location = "/Roles/Create"}
                }
            }
        }; 
         
        private readonly NavbarViewModel _startMenu = new()
        {
            NavbarTitle = "Studiekollen",
            NavbarContent = new Dictionary<string, List<NavigationLinkViewModel>>
            {
                ["Prov"] = new()
                {
                    new NavigationLinkViewModel { HeadLine = "Skapa prov", LinkType = LinkType.Controller, Location = "/Exam/CreateExam"},
                    new NavigationLinkViewModel { HeadLine = "Mina prov", LinkType = LinkType.Controller, Location = "/Exam/ListExams"}
                }
            }
        };

        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        
        public NavbarComponent(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }


        /// <summary>
        /// Takes a NavbarViewModel-object,
        /// and uses destructuring to dynamically create links to be placed in the navbar
        /// </summary>
        /// <param name="navbar"></param>
        private void CreateLinks(NavbarViewModel navbar) 
        {
            (_, Dictionary<string, List<NavigationLinkViewModel>> navbarContent) = navbar;

            foreach ((string _, List<NavigationLinkViewModel> dropdowns) in navbarContent)
            {
                foreach (NavigationLinkViewModel dropdownLink in dropdowns)
                {
                    switch (dropdownLink.LinkType)
                    {
                        //Vi använder vårt enum för att besluta om vi ska använda URL.Page() eller URL.Action()
                        //Detta är viktigt i fall att vi skulle ha en controller/action med samma mönster som page
                        //Till exempel: Vi har UserController med en Action med namnet List, och vi har en mapp med namnet User...
                        //..som innehåller en razor page med namnet List.
                        case LinkType.RazorPage:
                            dropdownLink.Link = dropdownLink.Location;
                            break;
                        case LinkType.Controller:
                        {
                            string[] ControllerAndAction = dropdownLink.Location.Split("/", StringSplitOptions.RemoveEmptyEntries);
                            dropdownLink.Link = Url.Action(controller:ControllerAndAction[0],action:ControllerAndAction[1]);
                            break;
                        }
                    }
                }
            }
        }
        /// <summary>
        /// Examines the role of the login user, and returns a specific type of navbar based on role affiliation
        /// </summary>
        /// <returns>A view with a NavbarViewModel-object</returns>
        public async Task<IViewComponentResult> InvokeAsync()
        {
            NavbarViewModel navbar = _startMenu;

            if (HttpContext.User.Identity != null && _signInManager.IsSignedIn(HttpContext.User))
            {
                 ApplicationUser user = await _userManager.GetUserAsync(HttpContext.User);

                 if (await _userManager.IsInRoleAsync(user, "Admin"))
                 {
                     navbar = _adminMenu;
                 }
            }
           
            CreateLinks(navbar);
           
            return View(navbar);

        }
    }
}
