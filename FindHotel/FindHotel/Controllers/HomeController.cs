using FindHotel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using FindHotel.ViewModels;
using System.IO;
using System.Text.Json;

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
            
            Hotel[] test = new Hotel[10];
            int i = 0;
            foreach (var hotel in db.Hotels)
            {
                if (hotel.City == model.City)
                {
                    test[i] = hotel;
                    i++;
                    model.SearchHotels.Add(hotel);
                }
            }
            Hotel[] search = new Hotel[i];
            for(var j = 0; j < i; j++)
            {
                search[j] = test[j];
            }
            return Json(search);
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
            
            var hotel = db.Hotels.FirstOrDefault(x => x.HotelId.Equals(id));
            var room = db.Rooms.FirstOrDefault(x => x.HotelId.Equals(hotel.HotelId));
            if (hotel != null)
            {
                ViewBag.HotelId = hotel.HotelId;
                ViewBag.HotelName = hotel.Name;
                ViewBag.HotelRating = hotel.Rating;
                ViewBag.HotelServiceLevel = hotel.ServiceLevel;
                ViewBag.HotelNumRooms = hotel.NumRooms;
            }
            else
            {
                return RedirectToAction("Index");
            }
            return View(db.Rooms.ToList());
            //return Json(hotel);

        }

        [HttpPost]
        public JsonResult AddHotel()
        {
            using (var reader = new StreamReader(Request.Body))
            {
                var body = reader.ReadToEndAsync();
                Hotel hotel = JsonSerializer.Deserialize<Hotel>(body.Result);
                db.Hotels.Add(hotel);
                // сохраняем в бд все изменения
                db.SaveChanges();
                return Json(hotel);
            }
        }

        public IActionResult AddRoom()
        {
            return View();
        }
        [HttpGet]
        public IActionResult AddRoom(int? id)
        {
            if (id == null) return RedirectToAction("Index");
            ViewBag.HotelId = id;
            return View();
        }
        [HttpPost]
        public JsonResult AddRoom(Room room)
        {
            db.Rooms.Add(room);
            // сохраняем в бд все изменения
            db.SaveChanges();
            return Json(room);

        }
        public IActionResult AddOrder()
        {
            return View();
        }
        [HttpGet]
        public IActionResult AddOrder(int? id, int? sid)
        {
            if (id == null && sid == null) return RedirectToAction("Index");
            ViewBag.HotelId = id;
            ViewBag.RoomId = sid;
            return View();
        }
        [HttpPost]
        public IActionResult AddOrder(Order order)
        {
            var user = db.Users.FirstOrDefault(x => x.NormalizedUserName.Equals(User.Identity.Name));
            order.UserId = user.Id;
            db.Orders.Add(order);
            // сохраняем в бд все изменения
            db.SaveChanges();
            return Json(order);

        }
    }
}
