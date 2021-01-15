using FindHotel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using FindHotel.ViewModels;

namespace FindHotel.Controllers
{
    public class HomeController : Controller
    {
        FHContext db;
        public HomeController(FHContext context)
        {
            db = context;
        }
        [HttpGet]
        public IActionResult SearchHotel()
        {
            return View();
        }
        [HttpPost]
        public  IActionResult SearchHotel(SearchModel model)
        {
            foreach (var hotel in db.Hotels)
            {
                if (hotel.City == "Night-City")
                {
                    model.SearchHotels.Add(hotel);

                }
            }

            return View(model.SearchHotels);
        }
        public IActionResult Index(SearchModel model)
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
