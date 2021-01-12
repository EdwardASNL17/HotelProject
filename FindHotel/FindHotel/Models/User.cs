using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FindHotel.Models
{
    public class User
    {
       public int Id { get; set; }
       public string Username { get; set; }
       public string Password { get; set; }
       public string Email { get; set; }
       public bool IsAdmin { get; set; }
       public string Name { get; set; }
       public string Surname { get; set; }
       public DateTime BirthDate { get; set; }
       public DateTime RegDate { get; set; }
    }
}
