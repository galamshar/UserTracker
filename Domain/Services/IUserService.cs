using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserTrackingSystem.Domain.Entities;

namespace UserTrackingSystem.Domain.Services
{
    public interface IUserService
    {
        public IEnumerable<User> GetAll();
        public void Add(User user);
    }
}
