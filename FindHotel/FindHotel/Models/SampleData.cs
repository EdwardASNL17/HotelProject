using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Wordprocessing;
using FindHotel.Models;

namespace FindHotel.Models
{
    public static class SampleData
    {
        public static void Initialize(FHContext context)
        {
            
            if (!context.Users.Any())
            {
                context.Users.AddRange(
                    new User
                    {

                        Name = "Гриша",
                        Surname = "Маятник",
                        Username = "Treeesha",
                        Password = "123",
                        Email = "edw@gmail.com"

                    }
                    
                    );
                context.SaveChanges();
            }
        }
       
    }
}

