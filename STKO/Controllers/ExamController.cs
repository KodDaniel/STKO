using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using STKO.Interfaces;
using STKO.Models.DomainModels;
using STKO.ViewModels;

namespace STKO.Controllers
{
    /// <summary>
    /// The controller for the Exam type
    /// </summary>
    [Authorize]
    public class ExamController : Controller
    {
        //private readonly ILogger<ExamController> _logger;
        private readonly IExamRepository _examRepo;
         
        public ExamController(/*ILogger<ExamController> logger,*/ IExamRepository examRepo)
        {
            //_logger = logger;
            _examRepo = examRepo;
        }

        /// <summary>
        /// This method renders the initial view for "ListExams"
        /// </summary>
        ///<returns>A view</returns>
        public IActionResult ListExams() => View();

        /// <summary>
        /// This method renders the initial view for the "CreateExam"
        /// </summary>
        ///<returns>A view with an empty ExamViewModel-object</returns>
        public IActionResult CreateExam() => View(new ExamViewModel());

        /// <summary>
        /// This method takes an ID parameter to locate an exam in the database.
        /// If the exam exists in the database, this exam is sent to the "DisplayExam" view as a view model object
        /// </summary>
        /// <param name="id"></param>
        ///<returns>Either a view with an ExamViewModel object, or a LocalRedirect to an error page</returns>
        public async Task<IActionResult> DisplayExam(long id)
        {
            Exam e = await _examRepo.GetById(id);

            return e != null ?  View(ExamViewModelFactory.Edit(e)) : LocalRedirect("/urlNotFound.html");
        }
    }
}