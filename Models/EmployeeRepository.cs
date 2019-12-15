using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCrudApp.Models
{
    public class EmployeeRepository : IDataRepository<Employee>
    {
        readonly DatabaseEntitities _databaseEntitities;

        public EmployeeRepository(DatabaseEntitities context)
        {
            _databaseEntitities = context;
        }

        public IEnumerable<Employee> GetAll()
        {
            try
            {
                var empList = _databaseEntitities.Employees.ToList();
                return empList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public int AddEmployee(Employee employee)
        {
            try
            {
                _databaseEntitities.Employees.Add(employee);
                _databaseEntitities.SaveChanges();
                return 1;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public int AddCity(City entity)
        {
            try
            {
                _databaseEntitities.Cities.Add(entity);
                _databaseEntitities.SaveChanges();
                return 1;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public int Update(Employee employee)
        {
            try
            {
                if (_databaseEntitities.Employees.Any(e => e.EmployeeID == employee.EmployeeID))
                {
                    _databaseEntitities.Employees.Update(employee);
                    _databaseEntitities.SaveChanges();
                    return 1;
                } else return 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public Employee GetEmployeeData(int id)
        {
            try
            {
                return _databaseEntitities.Employees.Where(e => e.EmployeeID == id).FirstOrDefault();
            }
            catch
            {
                throw;
            }
        }

        public int Delete(int entity)
        {
            try
            {
                Employee remove = _databaseEntitities.Employees.Where(e => e.EmployeeID == entity).FirstOrDefault();
                _databaseEntitities.Employees.Remove(remove);
                _databaseEntitities.SaveChanges();
                return 1;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public List<City> GetCities()
        {
            List<City> cityList = new List<City>();
            cityList = _databaseEntitities.Cities.ToList();

            return cityList;
        }

        public Employee Get(long id)
        {
            try
            {
                return _databaseEntitities.Employees.Where(e => e.EmployeeID == id).FirstOrDefault();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public int UpdateCity(City entity)
        {
            try
            {
                if (_databaseEntitities.Cities.Any(c => c.CityID == entity.CityID))
                {
                    _databaseEntitities.Cities.Update(entity);
                    _databaseEntitities.SaveChanges();
                    return 1;
                }
                else return 0;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public City GetCity(long id)
        {
            try
            {
                return _databaseEntitities.Cities.Where(c => c.CityID == id).FirstOrDefault();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }


    }
}
