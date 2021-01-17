using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FindHotel.Models
{
    public class FHContext:IdentityDbContext<User>
    {
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Room> Rooms { get; set; }

        public DbSet<Order> Orders { get; set; }
        public FHContext(DbContextOptions<FHContext> options)

            : base(options)
        {
            Database.EnsureCreated();
        }

    }
}
