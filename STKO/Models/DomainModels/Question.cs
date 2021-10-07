using System.ComponentModel.DataAnnotations;

namespace STKO.Models.DomainModels
{
    /// <summary>
    ///  The domain model for an Question
    /// </summary>
    public class Question
    {
        public long QuestionId { get; set; } 
        [Required(ErrorMessage = "Du måste fylla i en fråga.")]
        public string Query { get; set; }
        public string Answer { get; set; }
        public string Result { get; set; } 
        public Exam Exam { get; init; }
        public long ExamId { get; init; }

    }
}
