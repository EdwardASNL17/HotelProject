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
        public IActionResult Index()
        {
             return View(db.Hotels.ToList());
        }
        public IActionResult Hotels()
        {
            return View(db.Hotels.ToList());
        }
        [HttpGet]
        public IActionResult Hotels(int? id)
        {
            if (id == null) return RedirectToAction("Index");
            /*foreach(var hot in db.Hotels)
            {
                if(hot.Id == id)
                {
                    ViewBag.HotelName = hot.Id;
                    ViewBag.HotelRating = hot.Name;
                    ViewBag.HotelServiceLevel = hot.Rating;
                    ViewBag.HotelNumRooms = hot.ServiceLevel;
                    break;
                }
            }
            */
            var hotel = db.Hotels.FirstOrDefault(x => x.Id.Equals(id));
            if (hotel != null)
            {
                ViewBag.HotelName = hotel.Name;
                ViewBag.HotelRating = hotel.Rating;
                ViewBag.HotelServiceLevel = hotel.ServiceLevel;
                ViewBag.HotelNumRooms = hotel.NumRooms;
               
            }
            else
            {
                return RedirectToAction("Index");
            }
            return View();

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
