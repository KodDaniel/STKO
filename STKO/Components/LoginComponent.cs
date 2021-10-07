using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using STKO.Models.DomainModels;

namespace STKO.Components
{
    /// <summary>
    /// A View Component that contains parts of the login and logout logic
    /// </summary>
    public class LoginComponent : ViewComponent
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public LoginComponent(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager; 
        }
        /// <summary>
        /// Checking for a logged in user. If so, a specific view is returned, if not another view is returned
        /// </summary>
        /// <returns>A view</returns>
        public async Task<IViewComponentResult> InvokeAsync()
        {
            if (!_signInManager.IsSignedIn(HttpContext.User))
            {
                return View();
            }
            ApplicationUser user = await _userManager.GetUserAsync(HttpContext.User);
            return View("LoggedIn",user);
        }
    }
}
