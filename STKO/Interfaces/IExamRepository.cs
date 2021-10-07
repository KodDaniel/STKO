using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using STKO.Models.DomainModels;

namespace STKO.Interfaces
{
    /// <summary>
    /// An interface for the class "ExamRepository"
    /// </summary>
    public interface IExamRepository 
    { 
        public Task<Exam> GetById(long id);

        public Task Add(Exam exam);

        public Task Update(Exam exam);

        public Task Delete(long id);

        public Task<List<Exam>> GetAllExams();
         
        public Task<List<Exam>> GetExamsWhere(Expression<Func<Exam, bool>> condition);

    }
}
