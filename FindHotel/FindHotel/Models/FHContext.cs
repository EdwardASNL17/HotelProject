using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace FindHotel.Models
{
    public class FHContext:DbContext
    {
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<User> Users { get; set; }

        public FHContext(DbContextOptions<FHContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
        
    }
}
