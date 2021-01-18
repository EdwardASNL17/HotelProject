using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FindHotel.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public string UserId { get; set; }
        public int HotelId { get; set; }
        public int RoomId { get; set; }
        public string DateTimeIn { get; set; }
        public string DateTimeOut{ get; set; }


    }
}
