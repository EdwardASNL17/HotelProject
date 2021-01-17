using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FindHotel.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public int HotelId { get; set; }
        public int RoomId { get; set; }
        public DateTime DateTimeIn { get; set; }
        public DateTime DateTimeOut{ get; set; }


    }
}
