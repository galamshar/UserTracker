using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserTrackingSystem.Domain.Entities;
using UserTrackingSystem.Domain.Repositories;
using UserTrackingSystem.Domain.Services;
using UserTrackingSystem.Infrastructure.Data;

namespace UserTrackingSystem.Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public void Add(User user)
        {
            _userRepository.AddUser(user);
        }

        public IEnumerable<User> GetAll()
        {
            var userList = _userRepository.GetAll();
            return userList;
        }
    }
}
