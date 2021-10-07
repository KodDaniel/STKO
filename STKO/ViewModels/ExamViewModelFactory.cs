using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using STKO.ExtensionMethods;
using STKO.Models.DomainModels;

namespace STKO.ViewModels
{
    /// <summary>
    ///A view model factory class that in various ways transforms an Exam object into an ExamViewModel object (and vice versa)
    /// </summary>
    public static class ExamViewModelFactory 
    {
        //Lista med ValueTuples
        // https://stackoverflow.com/questions/44250462/how-to-create-a-list-of-valuetuple/44250573
        public static List<(ExamTimeMinutes EnumTime, string StringTime)> ExamTimeDisplayList { get; } = new()
        {
            (ExamTimeMinutes.None, "Ingen"),
            (ExamTimeMinutes.Five, "5 minuter"),
            (ExamTimeMinutes.Fifteen, "15 minuter"),
            (ExamTimeMinutes.Thirty, "30 minuter"),
            (ExamTimeMinutes.FourtyFive, "45 minuter"),
            (ExamTimeMinutes.Sixty, "60 minuter"),
            (ExamTimeMinutes.Ninety, "90 minuter")
        };
        /// <summary>
        ///Takes a string representation of Exam time and returns the enum equivalent if it exists
        /// </summary>
        /// <param name="examTime"></param>
        /// <returns>An enum.</returns>
        //Default är ExamTimeMinutes.None
        public static ExamTimeMinutes GetExamTimeEnum(string examTime) =>
            ExamTimeDisplayList.SingleOrDefault(a => a.StringTime == examTime).EnumTime;

        /// <summary>
        ///Takes a enum representation of Exam time and returns the string equivalent if it exists
        /// </summary>
        /// <param name="examTimeEnum"></param>
        /// <returns>A string.</returns>
        //Default "Ingen"
        public static string GetExamTimeString(ExamTimeMinutes examTimeEnum) =>
            ExamTimeDisplayList.SingleOrDefault(a => a.EnumTime == examTimeEnum).StringTime ?? "Ingen";

        /// <summary>
        ///Takes a ExamViewModel-object and maps it back to an Exam-object (from view model to domain model)
        /// This mapping process also requires a user ID, which is provided by the method's second argument
        /// </summary>
        /// <param name="viewModel"></param>
        /// <param name="userId"></param>
        /// <returns>An Exam-object</returns>
        public static Exam MapBackToModelClass(ExamViewModel viewModel, string userId)
        {
            if (viewModel != null)
            {
                return new Exam
                {
                    ExamId = viewModel.ExamId,
                    ExamName = viewModel.ExamName,
                    //Notera pattern matching
                    ChangeDate = viewModel.ChangeDate is "Har aldrig ändrats" or null ? null : DateTime.Parse(viewModel.ChangeDate),
                    RandomOrder = viewModel.RandomOrder is "Ja" or "true",
                    SendReminderDate = viewModel.SendReminderDate is "Nej" or "" ? null : DateTime.Parse(viewModel.SendReminderDate),
                    ExamTimeMinutes = GetExamTimeEnum(viewModel.ExamTime),
                    Questions = viewModel.Questions,
                    UserId = userId
                };
            }

            return null;

        }


        /// <summary>
        ///Takes a Exam-object and maps it to an ExamViewModel-object (from domain model to view model).
        ///This mapping process is tailored with regard to the details representation for a single exam
        /// </summary>
        /// <param name="e"></param>
        /// <returns>An ExamViewModel-object</returns>
        public static ExamViewModel Details(Exam e)
        {
            if (e != null)
            {
                return new ExamViewModel
                {
                    ExamId = e.ExamId,
                    ExamName = e.ExamName,
                    CreateDate = e.CreateDate.ApplicationDateTimeFormat(),
                    ChangeDate = e.ChangeDate == null ? "Har aldrig ändrats" : e.ChangeDate.ApplicationDateTimeFormat(),
                    SendReminderDate = e.SendReminderDate == null ? "Nej" : e.SendReminderDate.ApplicationDateTimeFormat(),
                    ExamTime = GetExamTimeString(e.ExamTimeMinutes),
                    RandomOrder = e.RandomOrder ? "Ja" : "Nej",
                    UserId = e.UserId,
                    //Questions = e.Questions
                };
            }

            return null;
        }

        /// <summary>
        ///Overload to Details Method. Takes an IEnumerable of Exams-object and maps it to an IEnumerable of ExamViewModel-object
        /// </summary>
        /// <param name="exams"></param>
        /// <returns>An IEnumerable of ExamViewModel-objects</returns>
        public static IEnumerable<ExamViewModel> Details(IEnumerable<Exam> exams) => exams.Select(Details);

 
        /// <summary>
        ///Takes a Exam-object and maps it to an ExamViewModel-object (from domain model to view model).
        ///This mapping process is tailored with regard to the edit representation for a single exam
        /// </summary>
        /// <param name="e"></param>
        /// <returns>An ExamViewModel-object</returns>
        public static ExamViewModel Edit(Exam e)
        {
            if (e != null)
            {
                return new ExamViewModel
                {
                    ExamId = e.ExamId,
                    ExamName = e.ExamName,
                    CreateDate = e.ChangeDate.ToString(),
                    ChangeDate = e.ChangeDate.ToString(),
                    SendReminderDate = e.SendReminderDate?.ToString("yyyy-MM-ddThh:mm"),
                    ExamTime = GetExamTimeString(e.ExamTimeMinutes),
                    RandomOrder = e.RandomOrder ? "true" : "false",
                    UserId = e.UserId,
                    //Questions = e.Questions
                };
            }

            return null;
        }


    }
}
