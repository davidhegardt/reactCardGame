using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactCrudApp.Models;
using GameCard;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactCrudApp.Controllers
{
    //[Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private readonly IDataRepository<Employee> _dataRepository;

        public EmployeeController(IDataRepository<Employee> dataRepository)
        {
            _dataRepository = dataRepository;
        }

        [HttpGet]
        [Route("api/Employee/Index")]
        public IEnumerable<Employee> Index()
        {
            return _dataRepository.GetAll();
        }

        [HttpPost]
        [Route("api/Employee/Create")]
        public int Create(Employee employee)
        {
            return _dataRepository.AddEmployee(employee);
        }

        [HttpPost]
        [Route("api/Employee/CreateCity")]
        public int Create(City city)
        {
            return _dataRepository.AddCity(city);
        }

        [HttpGet]
        [Route("api/Employee/Details/{id}")]
        public Employee Details(int id)
        {
            return _dataRepository.Get(id);
        }

        [HttpGet]
        [Route("api/Employee/City/Details/{id}")]
        public City CityDetails(int id)
        {
            return _dataRepository.GetCity(id);
        }

        [HttpPut]
        [Route("api/Employee/Edit")]
        public int Edit(Employee employee)
        {
            return _dataRepository.Update(employee);
        }

        [HttpPut]
        [Route("api/Employee/City/Edit")]
        public int EditCity(City city)
        {
            return _dataRepository.UpdateCity(city);
        }

        [HttpDelete]
        [Route("api/Employee/Delete/{id}")]
        public int Delete(int id)
        {
            return _dataRepository.Delete(id);
        }


        [HttpGet]
        [Route("api/Employee/GetCityList")]
        public IEnumerable<City> Details()
        {
            return _dataRepository.GetCities();
        }

        [HttpGet]
        [Route("api/Cards/GetCard")]
        public IEnumerable<CardModel> GetCard()
        {
            List<CardModel> cardList = new List<CardModel>();

            var deck = new Deck();
            deck.FillDeck();
            var cards = deck.Cards;
            List<int> idList = new List<int>();           
            
            var CardsList  = cards.Select(x => new CardModel()
            {                
                ImageURL = "https://raw.githubusercontent.com/davidhegardt/CardImages/master/Images/" + x.SuiteImage,
                Name = x.ToString(),
                Value = x.Value,                

            }).ToList();

            for(int i = 0; i < CardsList.Count; i++)
            {
                CardsList[i].CardID = i;
            }

            return CardsList;
        }
    }
}
