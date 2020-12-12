using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FindHotel.Data
{
    public class Hotel
    {
        public int id { get; set; }
        public string name { get; set; }
        public string city { get; set; }
        public double rating { get; set; }
        public int numRooms { get; set; }
    }
}
