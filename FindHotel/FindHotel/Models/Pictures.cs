using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FindHotel.Models
{
    public class Picture
    {
       public int PictureId { get; set; }
       public int HotelId { get; set; }
       public int RoomId { get; set; }
       public string PictureLink { get; set; }

    }
}
