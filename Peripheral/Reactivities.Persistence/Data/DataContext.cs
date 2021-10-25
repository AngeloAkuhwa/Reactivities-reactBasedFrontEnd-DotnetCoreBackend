using Microsoft.EntityFrameworkCore;
using Reactivities.Domain;

namespace Reactivities.Persistence.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) :base(options)
        {

        }

        public DbSet<Activity> Activities { get; set; }
    }
}
