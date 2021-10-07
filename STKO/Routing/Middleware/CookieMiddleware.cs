//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Http;

//namespace STKO.Routing.Middleware
//{
//    //Tänk på att hantera Cookie-Consent framöver
//    public class CookieMiddleware
//    {
//        private  readonly RequestDelegate next;
//        public CookieMiddleware(RequestDelegate nextDelgate) => next = nextDelgate;

//        public async Task Invoke(HttpContext context)
//        {
//            context.Response.Cookies.Append("username", context.User.Identity?.Name ?? "okänt",
//                new CookieOptions
//                {
//                    SameSite = SameSiteMode.Strict,
//                    Secure = true,
//                    MaxAge = TimeSpan.FromHours(6)

//                });

//            //Skicka vidare i pipelinen
//            await next(context);
//        }

//    }
//}
