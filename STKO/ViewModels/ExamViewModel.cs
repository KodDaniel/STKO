using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using STKO.Models.DomainModels;
using STKO.Validation;

namespace STKO.ViewModels
{
    /// <summary>
    ///A view model used as a blueprint for mapping data from the Exam domain model to a view representation format
    /// </summary>
    public class ExamViewModel
    {
        public long ExamId { get; set; }

        [Display(Name = "Provnamn")]
        [Required(ErrorMessage = "Du måste fylla i ett provnamn")]
        public string ExamName { get; set; }

        [Display(Name = "Skapades")] 
        public string CreateDate { get; set; }

        [Display(Name = "Ändrades senast")] 
        public string ChangeDate { get; set; } /*= "Har aldrig ändrats";*/

        [Display(Name = "Skicka mejlpåmminelse")]
        [UIHint("DateTime-Local")]
        [ValidateSendReminderDate] 
        public string SendReminderDate { get; set; } /*= "Nej";*/

        [Display(Name = "Provtid")]
        [Required(ErrorMessage = "Du måste välja en provtid")]
        public string ExamTime { get; set; }

        [Display(Name = "Slumpmässig ordning")]
        public string RandomOrder { get; set; }
        public string UserId { get; set; }
        public IEnumerable<Question> Questions { get; set; }

    }
}
