using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace STKO.ViewModels
{
    public enum LinkType { Controller, RazorPage }

    /// <summary>
    ///A view model that acts as a blueprint to dynamically generate a navbar
    /// </summary>
    public class NavigationLinkViewModel   
    { 
        public LinkType LinkType { get; set; }
        public string HeadLine { get; set; }
        public string Location { get; set; }
        public string Link { get; set; }
    }

    public class NavbarViewModel 
    {
        public string NavbarTitle { get; init; }
        public Dictionary<string, List<NavigationLinkViewModel>> NavbarContent { get; set; }

        /// <summary>
        ///A method that allow us to destruct an object of the NavigationLinkViewModel type
        /// </summary>
        /// <param name="title"></param>
        /// <param name="content"></param>
        /// <returns>A string and a dictionary</returns>
        //https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/functional/deconstruct#user-defined-types
        public void Deconstruct(out string title, out Dictionary<string, List<NavigationLinkViewModel>> content)
        {
            title = NavbarTitle;
            content = NavbarContent;
        }
    } 

}
