using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FindHotel.Models
{
    public static class AddDB
    {
        public static void AddData(FHContext context)
        {
            context.Hotels.AddRange(
                new Hotel
                {
                    Name = "Studio № 4 near Taganskaya",
                    City = "Москва",
                    Rating = 8,
                    ServiceLevel = 7,
                    NumRooms = 21

                }

                );
            context.SaveChanges();
        }
    }
}
