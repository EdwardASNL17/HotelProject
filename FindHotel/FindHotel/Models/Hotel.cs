using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FindHotel.Models
{
    public class Hotel
    {
       public int HotelId { get; set; }
       public string Name { get; set; }
       public string City { get; set; }
       public int Rating { get; set; }
       public int ServiceLevel { get; set; }
       public int NumRooms { get; set; }

    }
}
