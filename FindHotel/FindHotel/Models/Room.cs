using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FindHotel.Models
{
    public class Room
    {
        public int Id { get; set; }

        public string Hotel { get; set; }
        public string NumClass { get; set; }
        public int Capacity { get; set; }
        public int Price { get; set; }
        
    }
}
