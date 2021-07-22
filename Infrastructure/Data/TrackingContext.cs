using Microsoft.EntityFrameworkCore;
using UserTrackingSystem.Domain.Entities;

namespace UserTrackingSystem.Infrastructure.Data
{
    public class TrackingContext : DbContext
    {
        public TrackingContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
