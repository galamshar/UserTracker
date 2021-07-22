using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserTrackingSystem.WebApi.DTOs
{
    public class UserDTO
    {
        public DateTimeOffset RegisterDate { get; set; }
        public DateTimeOffset LastActivity { get; set; }
    }
}
