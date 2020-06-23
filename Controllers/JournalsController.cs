using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using L9.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using L9;

namespace L9.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JournalsController : ControllerBase
    {
        private readonly examContext _context;

        public JournalsController(examContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Journals> GetJournals()
        {
            return _context.Journals.ToList();
        }
    }
}