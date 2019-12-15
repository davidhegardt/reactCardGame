using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCrudApp.Models
{
    public class DatabaseEntitities : DbContext
    {
        public DatabaseEntitities(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().HasData(new Employee
            {
                Name = "Hasse P",
                Department = "Foreign Affairs",
                City = "Miami",
                EmployeeID = 1,
                Gender = "male"
            });

            modelBuilder.Entity<City>().HasData(new City
            {
                CityID = 1,
                CityName = "Miami"
            });
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<City> Cities { get; set; }
        
    }
}
