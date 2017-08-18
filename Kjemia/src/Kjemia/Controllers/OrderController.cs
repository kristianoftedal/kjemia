using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Kjemia.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using Kjemia.db;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Kjemia.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {

        private KjemiaContext _dbcontext;

        public OrderController(KjemiaContext dbContext)
        {
            _dbcontext = dbContext;
        }
        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Order value)
        {
            try
            {
                value.Created = DateTime.Now;
                value.Status = "Mottatt";

                var emailMessage = new MimeMessage();
                emailMessage.From.Add(new MailboxAddress("Kjemia", "ko@ptaken.no"));
                emailMessage.To.Add(new MailboxAddress("Kjemia", "havardryan@hotmail.com"));
                emailMessage.Cc.Add(new MailboxAddress("Kjemia", "ko@ptaken.no"));
                emailMessage.Subject = "Ny bestilling - " + value.Product;
                var body = new TextPart("plain")
                {
                    Text = FormatBody(value)

                };
                emailMessage.Body = body;
                using (var client = new SmtpClient())
                {
                    try
                    {
                        client.Connect("smtp.office365.com", 587, SecureSocketOptions.Auto);
                        client.Authenticate("ko@ptaken.no", @"ma?=)5v2");
                        await client.SendAsync(emailMessage).ConfigureAwait(false);
                        await client.DisconnectAsync(true).ConfigureAwait(false);
                    } catch (Exception e)
                    {
                        var test = e;
                    }
                }
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.StackTrace);
                throw;
            }
        }

        private string FormatBody(Order value)
        {
            var body = "";

            body += value.Product + Environment.NewLine;
            body += "Kunde: " + Environment.NewLine;
            body += "Navn: " + value.Name + Environment.NewLine;
            if (!string.IsNullOrEmpty(value.Address))
                body += "Adresse: " + value.Address + Environment.NewLine;
            if (!string.IsNullOrEmpty(value.Poststed))
                body += "Poststed: " + value.Poststed + Environment.NewLine;
            if (!string.IsNullOrEmpty(value.Postnummer))
                body += "Postnummer: " + value.Postnummer + Environment.NewLine;
            if (!string.IsNullOrEmpty(value.Email))
                body += "Email: " + value.Email + Environment.NewLine;
            if (!string.IsNullOrEmpty(value.Phone))
                body += "Tlf: " + value.Phone + Environment.NewLine;
            if (!string.IsNullOrEmpty(value.Highschool))
                body += "Videregående: " + value.Highschool;
            if (value.Topics != null && value.Topics.Count > 0)
                body += "Trenger hjelp med: " + String.Join(", ", value.Topics) + Environment.NewLine;
            
            return body;
        }
    }
}
