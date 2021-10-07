using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using STKO.Interfaces;
using STKO.Models.Database;
using STKO.Models.DomainModels;

namespace STKO.Models.Repositories
{
    /// <summary>
    /// The repository for the Exam type
    /// </summary>
    public class ExamRepository:IExamRepository
    {
        private readonly DataContext _context;
        public ExamRepository(DataContext context) => _context = context;

        /// <summary>
        /// Takes an ID that is used to try to find an Exam in the database. If the specific Exam is found,
        /// the database returns it. Otherwise null is returned
        /// </summary>
        /// <param name="id"></param>
        /// <returns>An Exam-object or null.</returns>
        public async Task<Exam> GetById(long id) => 
            await _context.Exams.Include(a => a.Questions).SingleOrDefaultAsync(a=>a.ExamId == id);

        /// <summary>
        /// Takes an Exam-object and adds it to the database
        /// </summary>
        /// <param name="exam"></param>
        public async Task Add(Exam exam)
        {
            await _context.AddAsync(exam);
            await _context.SaveChangesAsync();
        }
        /// <summary>
        /// Takes an Exam-object and updates it in the database
        /// </summary>
        /// <param name="exam"></param>
        public async Task Update(Exam exam)
        {
            //Notera att Visual Studio är inställt på att gå sönder vid NullReferencException.
            //(Vi når därför inte try-catch i controller). Se länk nedan:
            // https://stackoverflow.com/questions/13725619/cant-catch-nullreferenceexception
            exam.ChangeDate = DateTime.Now;
            _context.Update(exam);
            await _context.SaveChangesAsync();
        }
        /// <summary>
        /// Takes an ID that is used to try to find an Exam in the database.
        /// If the specific Exam is found it is removed from the database
        /// </summary>
        /// <param name="id"></param>
        public async Task Delete(long id)
        {
            Exam exam = await _context.Exams.FirstOrDefaultAsync(e => e.ExamId == id);
            _context.Remove(exam);
            await _context.SaveChangesAsync();
            
        }

        /// <summary>
        /// Returns all the exams from the database
        /// </summary>
        /// <returns>A List of Exam-objects wrapped in a task</returns>
        //Läs kommentar från Neo: https://stackoverflow.com/posts/46447615/timeline angående varför vi väljer List
        //List istället för IEnumerable tillåter oss även att använda include
        public async Task<List<Exam>> GetAllExams() => 
            await _context.Exams.Include(e => e.Questions).ToListAsync();

        /// <summary>
        /// Takes a predicate in the form of the type Expression. Then applies this predicate to the database
        ///to return all exams that matches the predicate.
        /// </summary>
        /// <param name="condition"></param>
        /// <returns>A List of Exam-objects wrapped in a task</returns>
        public async Task<List<Exam>> GetExamsWhere(Expression<Func<Exam, bool>> condition) => 
            await _context.Exams.Where(condition).Include(e => e.Questions).ToListAsync();
   
    }
}
