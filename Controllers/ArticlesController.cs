using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using L9.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace L9.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticlesController : ControllerBase
    {
        private readonly examContext _context;

        public ArticlesController(examContext context)
        {
            _context = context;
        }

        [HttpGet("{journalName}")]
        public Task<List<Articles>> GetArticles(string journalName)
        {
            return _context.Articles
                .Include(ri=>ri.Journal)
                .Where(recipeIngredient => recipeIngredient.Journal.Name == journalName)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> PostArticle() {
            try{
                var body = Request.Body;
                string bodyStr;
                using (StreamReader reader
                    = new StreamReader(body, Encoding.UTF8, true, 1024, true))
                {
                    bodyStr = await reader.ReadToEndAsync();
                }

                var jsonData = Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, object>>(bodyStr);
                
                var newarticle = new Articles();
                Journals journal;

                try{
                    journal = _context.Journals.First(x=>x.Name==jsonData["journal"].ToString());

                }
                catch (Exception e) {
                    journal = new Journals();
                    journal.Name = jsonData["journal"].ToString();
                    _context.Add(journal);
                }

                newarticle.Journal = journal;
                newarticle.Summary = jsonData["summary"].ToString();
                newarticle.User = jsonData["user"].ToString();
                newarticle.Date = DateTime.Now.Year;
                _context.Add(newarticle);

                _context.SaveChanges();

                return Ok();
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
                return BadRequest();
            }
        }
    }
}