using API.Context;
using API.Models;
using API.Repositories.Data;
using API.ViewModel;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAllOrigin")]
    public class EmployeeController : ControllerBase
    {
        EmployeeRepository employeeRepository;

        public EmployeeController(EmployeeRepository employeeRepository)
        {
            this.employeeRepository = employeeRepository;
        }

        //READ
        [HttpGet]
        public IActionResult Get()
        {
            var data = employeeRepository.Get();

            if (data.Count == 0)
                return Ok(new { message = "Data yang anda ambil TIDAK ADA", statusCode = 200, data = data });
            return Ok(new { message = "Sukses mengambil data", statusCode = 200, data = data});
        }

        //READ BY ID
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var data = employeeRepository.Get(id);

            if (data == null)
                return Ok(new { message = "Data yang anda ambil TIDAK ADA", statusCode = 200, data = data });
            return Ok(new { message = "Sukses mengambil data", statusCode = 200, data = data });
        }

        //UPDATE
        [HttpPut("{id}")]
        public IActionResult Put(int id, Employee employee)
        {
            var result = employeeRepository.Put(employee);
            if (result > 0)
                return Ok(new { message = "Berhasil mengambil data", statusCode = 200 });
            return BadRequest(new { messagae = "Gagal mengambil data", statusCode = 400 });
        }

        //CREATE
        [HttpPost]
        public IActionResult Post(Employee employee)
        {
            var result = employeeRepository.Post(employee);

            if (result > 0)
                return Ok(new { message = "Berhasil menambahkan data", statusCode = 200 });
            return BadRequest(new { messagae = "Gagal menambahkan data", statusCode = 400 });
        } 

        //DELETE
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = employeeRepository.Delete(id);
            if (result > 0)
                return Ok(new { message = "Berhasiil menghapus data", statusCode = 200});
            return Ok(new { message = "Gagal menghapus data", statusCode = 200});
        }
    }
}
