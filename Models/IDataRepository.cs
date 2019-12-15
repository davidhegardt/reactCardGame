using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCrudApp.Models
{
    public interface IDataRepository<TEntity>
    {
        IEnumerable<TEntity> GetAll();
        TEntity Get(long id);
        int AddEmployee(TEntity entity);
        int AddCity(City entity);
        int Update(TEntity entity);
        int Delete(int entity);
        List<City> GetCities();
        City GetCity(long id);
        int UpdateCity(City entity);
    }
}
