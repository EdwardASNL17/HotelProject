using FindHotel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace FindHotel.Controllers
{
    public class HomeController : Controller
    {
        FHContext db;
        public HomeController(FHContext context)
        {
            db = context;
        }
        public IActionResult Index()
        {
            return View(db.Hotels.ToList());
        }
        public IActionResult AddHotel()
        {
            return View();
        }
        [HttpPost]
        public IActionResult AddHotel(Hotel hotel)
        {
            db.Hotels.Add(hotel);
            // сохраняем в бд все изменения
            db.SaveChanges();
            return RedirectToAction("Index");

        }

    }
}
