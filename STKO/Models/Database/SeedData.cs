using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using STKO.Models.DomainModels;

namespace STKO.Models.Database
{
    /// <summary>
    /// Seeds the initial application data
    /// </summary>
    public static class SeedData
    {
        public static void CreateAdminAccount(IServiceProvider serviceProvider, IConfiguration configuration) =>
            CreateAdminAccountAsync(serviceProvider, configuration).Wait();

        // För att seeda admin till databasen
        public static async Task CreateAdminAccountAsync(IServiceProvider serviceProvider, IConfiguration configuration)
        {
            //Läs mer om detta i avsnittet "Creating the Seed Data" i kapitel 39 
            serviceProvider = serviceProvider.CreateScope().ServiceProvider;
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            //Notera att vi vi använder User Secrets. LÄS mer i avsnittet "Reading User Secrets "
            string username = configuration["Admin:Username"];
            string email = configuration["Admin:Email"];
            string password = configuration["Admin:Password"];
            string role = configuration["Admin:Role"]; 

            if (await userManager.FindByNameAsync(username) == null)
            {
                if (await roleManager.FindByNameAsync(role) == null)
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }

                var user = new ApplicationUser { UserName = username, Email = email };

                IdentityResult result = await userManager.CreateAsync(user, password);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, role);
                }
            }
        }

        //För att kunna anropa från synkron metod i startup.cs
        public static void EnsurePopulated(DataContext context) => EnsurePopulatedAsync(context).Wait();

        // Dummy-Data
        public static async Task EnsurePopulatedAsync(DataContext context) 
        {
            if (!context.Users.Any(a => a.UserName != "FirstAdmin"))
            {
                var user = new ApplicationUser
                {
                    Email = "Daniel.ahlin@gmail.com",
                    NormalizedEmail = "DANIEL.AHLIN@GMAIL.COM",
                    UserName = "Danne93",
                    NormalizedUserName = "DANNE93",
                    PhoneNumber = "+111111111111",
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString("D"),
                    Exams = new List<Exam>
                    {
                        new()
                        {
                            ExamName = "Engelska",
                            ExamTimeMinutes = ExamTimeMinutes.None,
                            CreateDate = DateTime.Now.Subtract(new TimeSpan(1,3,3)),
                            SendReminderDate = DateTime.Now.AddMonths(1).AddDays(3).AddHours(5).AddMinutes(342),
                            Questions = new List<Question>
                            {
                                new()
                                {
                                    Query = "The first letter of the first word in a sentence should be...?",
                                    Answer = "A capital letter"
                                },

                                new()
                                {
                                    Query = "Vi springer tre olika distanser ca 12 km, ca 17 km och ca 21 km. Farten anpassas genom att de snabbare löparna vänder och hämtar upp dem som kommit på efterkälken. De första 2 km är gemensam uppvärmning!",
                                    Answer = "Vi springer tre olika distanser ca 12 km, ca 17 km och ca 21 km. Farten anpassas genom att de snabbare löparna vänder och hämtar upp dem som kommit på efterkälken. De första 2 km är gemensam uppvärmning!"
                                },
                                new()
                                {
                                    Query = "Vi springer tre olika distanser ca 12 km, ca 17 km och ca 21 km. Farten anpassas genom att de snabbare löparna vänder och hämtar upp dem som kommit på efterkälken. De första 2 km är gemensam uppvärmning!",
                                    Answer = "Vi springer tre olika distanser ca 12 km, ca 17 km och ca 21 km. Farten anpassas genom att de snabbare löparna vänder och hämtar upp dem som kommit på efterkälken. De första 2 km är gemensam uppvärmning!"
                                },
                                new()
                                {
                                    Query = "Vi springer tre olika distanser ca 12 km, ca 17 km och ca 21 km. Farten anpassas genom att de snabbare löparna vänder och hämtar upp dem som kommit på efterkälken. De första 2 km är gemensam uppvärmning!",
                                },
                                new()
                                {
                                    Query = "The order of a basic positive sentence is...?",
                                    Answer = "Siktar på en bekväm ansträngande belastningsnivå för att kunna hålla bra kvalitet under hela passet. Tänk hellre 30 min med växlande belastning istället för bara 12 min backträning"
                                }
                            }
                        },
                        new()
                        {
                            ExamName = "Matte",
                            CreateDate = DateTime.Now.Subtract(new TimeSpan(4,1333,39)),

                            ChangeDate = DateTime.Now.AddHours(3.5),
                            ExamTimeMinutes = ExamTimeMinutes.Sixty,
                            Questions = new List<Question>
                            {
                                new() {Query = "4x+2=18", Answer = "x=4"},
                                new() {Query = "5=3x-9"},
                                new()
                                {
                                    Query = "På ett bankkonto ligger exakt 500 euro. Det är tillåtet att antingen ta ut 300 euro från kontot eller sätta in 198 euro på kontot. Det finns inga andra pengar än de som ursprungligen ligger på kontot. Hur mycket pengar kan man som mest få ut från kontot med hjälp av de två operationerna?",
                                    Answer = "Bankuttag På ett bankkonto ligger exakt 500 euro. Det är tillåtet att antingen ta ut 300 euro från kontot eller sätta in 198 euro på kontot. Det finns inga andra pengar än de som ursprungligen ligger på kontot. Hur mycket pengar kan man som mest få ut från kontot med hjälp av de två operationerna? Visa lösningen Notera att båda talen 300 och 198 är delbara med 3. Det betyder att allt som någonsin kommer ut ur banken är ett tal som är delbart med 3. Det största sådana talet upp till 500 är 498. Mer än så kan man alltså inte ta ut ur banken. Men det är möjligt att ta ut 498 euro på följande sätt: Ta ut 300 (200 kvar på kontot), sätt in 198 (398 på kontot), ta ut 300 (98 på kontot), sätt in 198 (296 på kontot), sätt in 198 (494 på kontot), upprepa sedan samma steg: Ta ut 300 (194 kvar på kontot), sätt in 198 (392 på kontot), ta ut 300 (92 på kontot), sätt in 198 (290 på kontot), sätt in 198 (488 på kontot), här vara alla tal i parenteserna 6 mindre än i föregående stegen. Vi fortsätter göra samma steg om och om igen (ta ut 300, sätta in 198, ta ut 300, sätta in 198, sätta in 198) tills det inte längre går. Det första stället som det kommer ta stopp på är det mittersta (minsta) talet, det som var 98 i första gruppen, 92 i andra och när det minskar med 6 åt gången kommer det bli lika med talet 2 så småningom: ……ta ut 300 (2 på kontot). Vi det steget har man tagit ut precis 498 euro."
                                },
                                new() {Query = "10- 2x"},
                                new() {Query = "10- 2x", Answer = "x= 3"},
                                new() {Query = "10- 2x", Answer = "x= 3"},
                                new() {Query = "10- 2x", Answer = "x= 3"},
                                new() {Query = "10- 2x", Answer = "x= 3"},
                            }
                        },
                        new()
                        {
                            ExamName = "Kemi (Tenta)",
                            ChangeDate = DateTime.Now.AddDays(2),
                            ExamTimeMinutes = ExamTimeMinutes.Five,
                            RandomOrder = true,
                            SendReminderDate = DateTime.Now.AddDays(60)
                        }
                    }

                };

                var password = new PasswordHasher<ApplicationUser>();
                string hashed = password.HashPassword(user, "password");
                user.PasswordHash = hashed;
                var userStore = new UserStore<ApplicationUser>(context);
                await userStore.CreateAsync(user);

                await context.SaveChangesAsync();
            }
        }


    }
}

