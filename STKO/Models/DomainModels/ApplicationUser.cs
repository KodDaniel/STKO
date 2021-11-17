using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace STKO.Models.DomainModels
{
    /// <summary>
    /// A class that extends the IdentityUser class, thus allowing us to define specific user behavior for this application
    /// </summary>
    public class ApplicationUser : IdentityUser
    {

        public ApplicationUser()
        {
            //base.UserName = base.Email;
            //base.NormalizedUserName = base.NormalizedEmail;
        }

        public ICollection<Exam> Exams { get; set; }
        public DateTime RegisterDate { get;} = DateTime.Now;
        public override string ToString() => $"ID: {base.Id}, Användarnamn: {base.UserName}, Epost-adress:{base.Email}";
    }
}
