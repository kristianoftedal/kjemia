using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Kjemia.Models;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using Kjemia.db;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Kjemia.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {

        private KjemiaContext _dbcontext;

        public OrderController()
        {
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
        public async void Post([FromBody]Order value)
        {
            value.Created = DateTime.Now;
            value.Status = "Mottatt";
            
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Kjemia", "kristian.oftedal@pointtaken.no"));
            emailMessage.To.Add(new MailboxAddress("Kjemia", "oftedal.kristian@gmail.com"));
            emailMessage.Subject = "Ny bestilling - " + value.Product;
            var body = new TextPart("plain")
            {
                Text = FormatBody(value)

            };
            emailMessage.Body = body;
            using (var client = new SmtpClient())
            {
                client.Connect("smtp.office365.com", 587, SecureSocketOptions.Auto);
                client.Authenticate("kristian.oftedal@pointtaken.no", @"ma\+05v2");
                await client.SendAsync(emailMessage).ConfigureAwait(false);
                await client.DisconnectAsync(true).ConfigureAwait(false);
            }
        }

        private string FormatBody(Order value)
        {
            var body = "";

            body += value.Product + Environment.NewLine;
            body += "Kunde: " + Environment.NewLine;
            body += "Navn: " + value.Name + Environment.NewLine;
            body += "Adresse: " + value.Address + Environment.NewLine;
            if (!string.IsNullOrEmpty(value.Email))
                body += "Email: " + value.Email + Environment.NewLine;
            if (!string.IsNullOrEmpty(value.Phone))
                body += "Tlf: " + value.Phone + Environment.NewLine;
            if (!string.IsNullOrEmpty(value.Highschool))
                body += "Videregående: " + value.Highschool;
            if (value.Topics != null && value.Topics.Length > 0)
                body += "Trenger hjelp med: " + String.Join(", ", value.Topics) + Environment.NewLine;
            
            return body;
        }
    }
}
