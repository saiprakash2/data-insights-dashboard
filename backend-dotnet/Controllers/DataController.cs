using System;
using Microsoft.AspNetCore.Mvc;
using backend_dotnet.Data;
using backend_dotnet.Models;

namespace backend_dotnet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DataController : ControllerBase
    {
        private readonly AppDbContext _context;
        public DataController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.DataRecords.ToList());
        }

        [HttpPost]
        public IActionResult Create(DataRecord record)
        {
            _context.DataRecords.Add(record);
            _context.SaveChanges();
            return Ok(record);
        }
    }
}
