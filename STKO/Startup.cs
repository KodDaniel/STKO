using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using STKO.Interfaces;
using STKO.Models.Database;
using STKO.Models.DomainModels;
using STKO.Models.Repositories;
using STKO.Validation;

namespace STKO
{
    public class Startup
    {
        public Startup(IConfiguration configuration) => Configuration = configuration;

        public IConfiguration Configuration { get; }
            
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(opts =>
            {
                opts.UseSqlServer(Configuration["ConnectionStrings:STKOConnection"]);
                //Inaktivera vid produktion
                opts.EnableSensitiveDataLogging();
            });

            services.AddIdentity<ApplicationUser, IdentityRole>(opts =>
                {
                    // Modifierar Identity avseende vilka användarnamn vi tillåter
                    opts.User.RequireUniqueEmail = true;
                    // Modifierar Identity avseende vilka lösenord vi tillåter
                    opts.Password.RequiredLength = 6;
                    //Sätt till False om du vill hantera Å,Ä Ö
                    opts.Password.RequireNonAlphanumeric = false;
                    opts.Password.RequireLowercase = true;
                    opts.Password.RequireUppercase = false;
                    opts.Password.RequireDigit = false;
                }).AddDefaultTokenProviders().AddEntityFrameworkStores<DataContext>()
                .AddErrorDescriber<CustomIdentityErrorDescriber>();


            //Undviker circular reference 
            services.AddControllersWithViews().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            services.AddRazorPages().AddRazorRuntimeCompilation();
            //Se avsnitt Enabling HTTP Strict Transport Security
            services.AddHsts(opts =>
            {
                opts.MaxAge = TimeSpan.FromDays(1);
                opts.IncludeSubDomains = true;
            });


            //services.AddScoped(typeof(IAsyncRepository<>), typeof(EfRepository<>));
            services.AddScoped<IExamRepository, ExamRepository>();

            services.AddSwaggerGen(options => {
                options.SwaggerDoc("v1",
                    new OpenApiInfo { Title = "STKO", Version = "v1" });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataContext dbContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            if (env.IsProduction())
            {
                app.UseHsts();
                app.UseHttpsRedirection();
                app.UseExceptionHandler("/error.html");
            }

            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                //app.UseMiddleware<CookieMiddleware>();
                endpoints.MapRazorPages();
                endpoints.MapControllers();
                endpoints.MapDefaultControllerRoute();

                app.UseSwagger();
                app.UseSwaggerUI(options => {
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", "STKO");
                });

                endpoints.MapFallback(async context =>
                {
                    context.Response.Redirect("/urlNotFound.html");  
                     await Task.CompletedTask;
                });
                //endpoints.MapFallback(DetermineFallbackRoute.Endpoint);
            });

            SeedData.EnsurePopulated(dbContext);
            SeedData.CreateAdminAccount(app.ApplicationServices, Configuration);
        }

    }

}
