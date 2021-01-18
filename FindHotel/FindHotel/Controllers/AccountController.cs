using FindHotel.Models;
using FindHotel.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Serialization;
using System.Text.Json;
using System.IO;

namespace FindHotel.Controllers
{
    public class AccountController : Controller
    {
        FHContext db;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, FHContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            db = context;
        }
        
        public IActionResult Cabinet()
        {
            return View(db.Users.ToList());
        }
        /*[HttpGet]
        public IActionResult Register()
        {
            return View();
        }
        */
      
        [HttpPost]
        public async Task<JsonResult> Register()
        {
            using (var reader = new StreamReader(Request.Body))
            {
                var body = reader.ReadToEndAsync();
               

                // Do something
       
                    RegisterViewModel model = JsonSerializer.Deserialize<RegisterViewModel>(body.Result);
                    User user = new User { Email = model.Email, UserName = model.UserName, Surname = model.Surname, Name = model.Name, BirthDate = model.BirthDate};
 

                    // добавляем пользователя
                    var result = await _userManager.CreateAsync(user, model.Password);
                    if (result.Succeeded)
                    {
                        // установка куки
                        await _signInManager.SignInAsync(user, false);
                        var regUser = db.Users.FirstOrDefault(x => x.Id.Equals(user.Id));
                        return Json(regUser.Id);
                    //return Json("success");


                    }
                    else
                    {
                        foreach (var error in result.Errors)
                        {
                            ModelState.AddModelError(string.Empty, error.Description);
                        }
                        return Json("Error");
                    }
                    
            }
        }
       
        public IActionResult Login(string returnUrl = null)
        {
            return View(new LoginViewModel { ReturnUrl = returnUrl });
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            using (var reader = new StreamReader(Request.Body))
            {
                var body = reader.ReadToEndAsync();

                LoginViewModel jsonmodel = JsonSerializer.Deserialize<LoginViewModel>(body.Result);
                //if (ModelState.IsValid)
                //{
                    var result =
                        await _signInManager.PasswordSignInAsync(model.UserName, model.Password, false, false);
                    if (result.Succeeded)
                    {
                        return RedirectToAction("Cabinet", "Account");
                        //return Json(model.UserName);
                        // проверяем, принадлежит ли URL приложению
                        /*  if (!string.IsNullOrEmpty(model.ReturnUrl) && Url.IsLocalUrl(model.ReturnUrl))
                        {
                          return Redirect(model.ReturnUrl);
                        }
                        else
                        {
                          return RedirectToAction("Cabinet", "Account");
                        }
                        */
                }
                else
                    {   /*
                        foreach (var error in result.Errors)
                        {
                            ModelState.AddModelError(string.Empty, error.Description);
                        }
                        */
                        return Json("Error");
                    }
                //}
                //return View(model);
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            // удаляем аутентификационные куки
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }
    }
       
}
