using EmployeeApi.Models;
using EmployeeApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService _service;

        public EmployeeController(EmployeeService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<List<Employee>> Get()
        {
            return _service.GetAll();
        }

        [HttpPost]
        public IActionResult Create(Employee employee)
        {
            _service.Create(employee);
            return Ok(employee);
        }
        [HttpPut("{id}")]
        public IActionResult Update(string id, Employee employee)
        {
            var existingEmployee = _service.GetById(id);
            if (existingEmployee == null)            {
                return NotFound();
            }   
            _service.Update(id, employee);
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var employee = _service.GetById(id);
            if (employee == null)            {
                return NotFound();
            }   
            _service.Delete(id);
            return Ok();
        }
        [HttpGet("{id}")]
        public ActionResult<Employee> GetById(string id)
        {
            var employee = _service.GetById(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }
    }
}