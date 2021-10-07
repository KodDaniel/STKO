using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace STKO.Models.DomainModels
{
    /// <summary>
    /// Enum representing time in an Exam
    /// </summary>
    public enum ExamTimeMinutes { None = 0, Five = 5, Fifteen = 15, Thirty = 30, FourtyFive = 45, Sixty = 60, Ninety = 90 }

    /// <summary>
    ///  The domain model for an Exam
    /// </summary>
    public class Exam
    {
        public long ExamId { get; set; }
        public string ExamName { get; set; }
        //Temoprärt init för att kunna simulera olika skapelsedatum i SeedData-klassen
        public DateTime CreateDate { get; init; } = DateTime.Now;
        public DateTime? ChangeDate { get; set; }
        public DateTime? SendReminderDate { get; set; }
        public ExamTimeMinutes ExamTimeMinutes { get; set; }
        public bool RandomOrder { get; set; }
        public IEnumerable<Question> Questions { get; set; }
        public ApplicationUser User { get; init; }
        public string UserId { get; init; }
    }
}
