using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using UserTrackingSystem.Domain.Entities;
using UserTrackingSystem.Domain.Services;
using UserTrackingSystem.WebApi.DTOs;

namespace UserTrackingSystem.WebApi.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        public async Task<IActionResult> AddUser([FromBody] UserDTO userDTO)
        {
            if (userDTO.RegisterDate > userDTO.LastActivity)
            {
                return BadRequest("Invalid Dates");
            }
            var user = new User()
            {
                RegistrationDate = userDTO.RegisterDate,
                LastActivity = userDTO.LastActivity
            };
            _userService.Add(user);
            return NoContent();
        }

        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetUsers()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }
    }
}
