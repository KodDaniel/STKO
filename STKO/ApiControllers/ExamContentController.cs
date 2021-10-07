using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using STKO.Interfaces;
using STKO.Models.DomainModels;
using STKO.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using STKO.Controllers;

namespace STKO.ApiControllers
{
    //TODO: Ersätt Try-Catch-Block med Exception Filter
    //TODO: Var mer specifik och nyanserad avseende vilka statuskoder du returnerar
    /// <summary>
    /// An API controller for database operations related to the Exam type
    /// </summary>
    [ApiController]
    [Route("/api/[controller]")]
    public class ExamContentController : ControllerBase
    {
        private readonly IExamRepository _examRepo;
        private readonly ILogger<ExamContentController> _logger;
        private readonly UserManager<ApplicationUser> _userManager;

        public ExamContentController(UserManager<ApplicationUser> userManager, IExamRepository examrepo, ILogger<ExamContentController> logger)
        {
            _userManager = userManager;
            _examRepo = examrepo;
            _logger = logger;
        }

        /// <summary>
        /// This method returns all exams from the database.
        /// </summary>
        ///<returns>An IEnumerable with exams</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllExams()
        {
            IEnumerable<Exam> allExams = await _examRepo.GetAllExams();
            return allExams != null ? Ok(allExams) : NotFound();
        }

        /// <summary>
        /// This method takes an ID parameter to locate an exam in the database.
        /// </summary>
        /// <param name="id"></param>
        ///<returns>An exam-object</returns>
        [HttpGet("{id:long:min(1)}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetExam(long id)
        {
            Exam e = await _examRepo.GetById(id);
            return e != null ? Ok(e) : NotFound();
        }

        /// <summary>
        /// This metod returns all the exams in the database belonging to the current user
        /// </summary>
        ///<returns>An IEnumerable with exams</returns>
        [HttpGet("GetExamsForUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetExamsForUser()
        {
            string userId = await _userManager.GetUserIdAsync(await _userManager.GetUserAsync(User));
            IEnumerable <ExamViewModel> exams = ExamViewModelFactory.Details(await _examRepo.GetExamsWhere(e => e.UserId == userId));
            return exams != null ? Ok(exams) : NotFound();

        }

        /// <summary>
        /// This method takes an ID parameter to locate all questions for a specific exam.
        /// </summary>
        /// <param name="id"></param>
        ///<returns>An IEnumerable with questions</returns>
        [HttpGet("GetQuestions/{id:long:min(1)}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetQuestions(long id)
        {
            Exam e = await _examRepo.GetById(id);
            return e?.Questions != null ? Ok(e.Questions) : NotFound();
        }

        /// <summary>
        /// This method updates an exam in the database
        /// </summary>
        /// <param name="viewModel"></param>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateExam(ExamViewModel viewModel)
        {
            string userId = await _userManager.GetUserIdAsync(await _userManager.GetUserAsync(User));
            Exam exam = ExamViewModelFactory.MapBackToModelClass(viewModel, userId);

            if (exam != null)
            {
                try
                {
                    await _examRepo.Update(exam);
                    return NoContent();
                }
                catch (Exception e)
                {
                    _logger.LogError($"ERROR:Something went wrong in the action {nameof(UpdateExam)}: {e.Message}");
                     return StatusCode(500, "Internal server error");
                }
            }

            return NotFound();
        }


        /// <summary>
        /// This method adds an exam to the database
        /// </summary>
        /// <param name="viewModel"></param>
        [HttpPost] 
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> SaveExam (ExamViewModel viewModel)
        {
            string userId = await _userManager.GetUserIdAsync(await _userManager.GetUserAsync(User));
            Exam exam = ExamViewModelFactory.MapBackToModelClass(viewModel, userId);
            
            //Om denna variabel är något annat än 0 har en ny entity lagts in i databasen
            long id = 0;
            
            if (exam != null)
            {
                try
                {
                    await _examRepo.Add(exam);
                    id = exam.ExamId;
                }
                catch (Exception e)
                {
                    _logger.LogError($"ERROR:Something went wrong in the action {nameof(SaveExam)}: {e.Message}");
                    return StatusCode(500, "Internal server error");
                }
            }

            return id != 0 ? NoContent() : NotFound();
        }

        /// <summary>
        /// This method removes an exam from the database
        /// </summary>
        /// <param name="id"></param>
        [HttpDelete("{id:long}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteExam(long id)
        {
            Exam exam = await _examRepo.GetById(id);

            if (exam != null)
            {
                try
                {
                    await _examRepo.Delete(id);
                    return NoContent();
                }
                catch (Exception e)
                {
                    _logger.LogError($"ERROR:Something went wrong in the action {nameof(DeleteExam)}: {e.Message}");
                    return StatusCode(500, "Internal server error");
                }
            }

            return NotFound();
        }

      
    }
}
