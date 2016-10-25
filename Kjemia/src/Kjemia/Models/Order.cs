using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kjemia.Models
{
    public class Order
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Highschool { get; set; }
        public string[] Topics { get; set; }
        public string Product { get; set; }
        public string Hours { get; set; }
    }
}
