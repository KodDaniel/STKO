using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
 
namespace STKO.ExtensionMethods
{
    /// <summary>
    /// A class of extension methods for the DateTime type
    /// </summary>
    public static class DateTimeExtensions
    {
        // 24-timmars-format: https://stackoverflow.com/posts/3023721/timeline
        private const string applicationDateFormat = "yyyy-MM-dd HH:mm";

        /// <summary>
        /// Extension Method that formats a DateTime object to the desired format for the application
        /// </summary>
        /// <returns>A string</returns> 
        public static string ApplicationDateTimeFormat(this DateTime dateTime) =>
        dateTime.ToString(applicationDateFormat);

        /// <summary>
        /// Extension Method that formats a nullable DateTime object to the desired format for the application
        /// </summary>
        /// <returns>A string</returns>  
        public static string ApplicationDateTimeFormat(this DateTime? dateTime) =>
            dateTime?.ToString(applicationDateFormat);

    }
}
