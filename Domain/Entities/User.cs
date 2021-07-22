using System;
using System.ComponentModel.DataAnnotations;

namespace UserTrackingSystem.Domain.Entities
{
    public class User
    {
        public long Id { get; set; }
        [Required]
        public DateTimeOffset RegistrationDate { get; set; }
        [Required]
        public DateTimeOffset LastActivity { get; set; }
    }
}
