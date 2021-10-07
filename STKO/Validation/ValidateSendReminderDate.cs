using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace STKO.Validation
{
    /// <summary>
    ///A custom model validation attribute that allows us to check a date
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class ValidateSendReminderDate : ValidationAttribute
    {
        /// <summary>
        /// A custom Validation attribute that examines whether we have a valid date, and also examines whether this date has already occurred or not
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns>A ValidationResult-object.</returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            string date = value as string;

            //Notera att vi ej validerar tomma strängar, eftersom det är valfritt att ha en mejlpåminnelse
            if (!string.IsNullOrEmpty(date))
            {
                if (!DateTime.TryParse(date, out DateTime parsedDate))
                {
                    return new ValidationResult(ErrorMessage = "Du måste ange ett giltigt datum");
                }

                if (DateTime.Now > parsedDate)
                {
                    return new ValidationResult(ErrorMessage = "Du måste ange ett datum som ännu inte varit");
                }
            }
        
            return ValidationResult.Success;
            
        }
    }
}
