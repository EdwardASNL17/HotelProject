using FindHotel.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FindHotel.ViewModels
{
    public class SearchModel
    {
        [Required]
        [Display(Name = "Город")]
        public string City { get; set; }

        public List<Hotel> SearchHotels = new List<Hotel>();
    }
}
