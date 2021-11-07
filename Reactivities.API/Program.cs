using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Reactivities.Domain;
using Reactivities.Persistence.Data;
using Reactivities.Persistence.Data.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reactivities.API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
           var host = CreateHostBuilder(args).Build();
            var scope = host.Services.CreateScope();
            var services = scope.ServiceProvider;
            var logger = services.GetRequiredService<ILogger<Program>>();
            var userManager = services.GetRequiredService<UserManager<AppUser>>();

            try
            {
                logger.LogInformation($"About creating database in  class - {nameof(Program)}, Time - {DateTime.Now}"); 
                var context = services.GetRequiredService<DataContext>();
                await context.Database.MigrateAsync();
                logger.LogInformation($"successfully created database in class - {nameof(Program)}, Time - {DateTime.Now}");

                logger.LogInformation($"About seeding database in class - {nameof(Program)}, Time - {DateTime.Now}");
                await Seed.SeedData(context, userManager);
                logger.LogInformation($"Database seeding successful in class - {nameof(Program)}, Time - {DateTime.Now}");
            }
            catch (Exception exception)
            {
                logger.LogError(exception,$"an error occured while creating database in class - {nameof(Program)}, Time - {DateTime.Now}");
            }
            finally
            {
                await host.RunAsync();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
