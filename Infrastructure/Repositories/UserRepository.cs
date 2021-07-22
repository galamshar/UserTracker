using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserTrackingSystem.Domain.Entities;
using UserTrackingSystem.Domain.Repositories;
using UserTrackingSystem.Infrastructure.Data;

namespace UserTrackingSystem.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly TrackingContext _db;

        public UserRepository(TrackingContext db)
        {
            _db = db;
        }

        public IEnumerable<User> GetAll()
        {
            return _db.Users.AsEnumerable();
        }

        public async Task AddUser(User user)
        {
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
        }
    }
}
