using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCrudApp.Models
{
    public class CardModel
    {        
        public int CardID { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int Value { get; set; }

        [Required]
        public string ImageURL { get; set; }
    }
}

