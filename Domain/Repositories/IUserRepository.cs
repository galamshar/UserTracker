using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserTrackingSystem.Domain.Entities;

namespace UserTrackingSystem.Domain.Repositories
{
    public interface IUserRepository
    {
        public IEnumerable<User> GetAll();
        public Task AddUser(User user);
    }
}
