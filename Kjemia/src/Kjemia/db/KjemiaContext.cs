using Kjemia.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kjemia.db
{
    public class KjemiaContext : DbContext
    {
        public KjemiaContext(DbContextOptions<DbContext> options)
            : base(options)
        { }
        

        public DbSet<Order> Orders { get; set; }
    }
}
