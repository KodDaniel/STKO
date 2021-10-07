using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using STKO.Models.DomainModels;

namespace STKO.Models.Database
{
    /// <summary>
    /// The application specific Data Context class. Inherits from IdentityDbContext
    /// </summary>
    public class DataContext : IdentityDbContext<IdentityUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Exam> Exams { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            RelationshipConstraints(modelBuilder);
            ColumnConstraints(modelBuilder); 
            TableNames(modelBuilder);
        }
        private static void RelationshipConstraints(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Exam>().HasOne(r => r.User).WithMany(a => a.Exams).IsRequired()
                .HasForeignKey(a => a.UserId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Question>().HasOne(a => a.Exam).WithMany(a => a.Questions).IsRequired()
                .HasForeignKey(a => a.ExamId).OnDelete(DeleteBehavior.Cascade);
        }

        private static void ColumnConstraints(ModelBuilder modelBuilder)
        {
            //IsRequired behövs för att indexer i ExamRepository inte ska kasta exception
            modelBuilder.Entity<Exam>().Property(t => t.ExamId).HasColumnName("ExamId").IsRequired();
            modelBuilder.Entity<Exam>().Property(t => t.ExamName).HasMaxLength(100).IsRequired();
            modelBuilder.Entity<Exam>().Property(t => t.ExamTimeMinutes).IsRequired();

            modelBuilder.Entity<Exam>().Property(t => t.CreateDate).IsRequired().HasColumnType("datetime2");
            modelBuilder.Entity<Exam>().Property(t => t.ChangeDate).IsRequired(false).HasColumnType("datetime2");
            //modelBuilder.Entity<Exam>().Ignore(t=>ExamTimeDisplayDictionary);

            modelBuilder.Entity<Question>().Property(t => t.ExamId).HasColumnName("QuestionId");
            modelBuilder.Entity<Question>().Property(t => t.Answer).IsRequired(false);
            modelBuilder.Entity<Question>().Property(t => t.Result).HasMaxLength(20).IsRequired(false);

            modelBuilder.Entity<IdentityUser>().Property(r => r.Email).IsRequired();
            modelBuilder.Entity<IdentityUser>().Property(r => r.UserName).IsRequired();
            modelBuilder.Entity<IdentityUser>().Property(r => r.NormalizedEmail).IsRequired();
            modelBuilder.Entity<IdentityUser>().Property(r => r.NormalizedUserName).IsRequired();


            //// TO-DO: Denna rad fungerar inte just nu. Lös det. Viktig princip då...
            ////..du måste kunna hantera kolumner du skapat i klassen ApplicationUser med Fluent-API
            //// Lägg dock märke till att vissa kommando fungerar på RegisterDate, t.ex HasColumnName("N
            //modelBuilder.Entity<ApplicationUser>().Property(r => r.RegisterDate).IsRequired();

        }

        private static void TableNames(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityUser>(entity => { entity.ToTable(name: "Users"); });
            modelBuilder.Entity<IdentityRole>(entity => { entity.ToTable(name: "Roles"); });
            modelBuilder.Entity<IdentityUserRole<string>>(entity => { entity.ToTable("UserRoles"); });
            modelBuilder.Entity<IdentityUserClaim<string>>(entity => { entity.ToTable("UserClaims"); });
            modelBuilder.Entity<IdentityUserLogin<string>>(entity => { entity.ToTable("UserLogins"); });
            modelBuilder.Entity<IdentityRoleClaim<string>>(entity => { entity.ToTable("RoleClaims"); });
            modelBuilder.Entity<IdentityUserToken<string>>(entity => { entity.ToTable("UserTokens"); });
        }
    }
}
