using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;

namespace STKO.Routing.Endpoints 
{
    /// <summary>
    /// A class that allows us to define a fallback route if all other routing options in the application have been discarded
    /// </summary>
    public static class DetermineFallbackRoute
    {

        /// <summary>
        /// This method takes an HttpContext object and uses this object to examine the user's role affiliation,
        /// in order to generate a redirect to a specific fallback route
        /// </summary>
        /// <param name="context"></param>
        public static Task Endpoint(HttpContext context)
        {
            LinkGenerator generator = context.RequestServices.GetService<LinkGenerator>();

            string uri;

            //Om Admin
            if (context.User.IsInRole("Admin"))
            {
                uri = generator.GetUriByPage(context, "/Index");
            }
            //Om ej inloggad
            else if (context.User.Identity != null && !context.User.Identity.IsAuthenticated)
            {
                uri = generator.GetUriByPage(context, "/Account/Register");
            }
            //Om inloggad men inte Admin
            else
            {
                uri = generator.GetUriByAction(context, action: "CreateExam", controller: "Exam");
            }

            context.Response.Redirect(uri);

            // Whenever you’re in need of returning a Task object, but have no asnyc method to return, use Task.CompletedTask
            return Task.CompletedTask;

        }
    }
}
