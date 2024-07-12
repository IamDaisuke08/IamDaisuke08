using Job.Services.Contracts;
using Job.Services.MailingService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Job.Services.Controllers
{
    [Route("api/Mail")]
    [ApiController]
    public class MailController : Controller
    {
        private readonly IMailingService _mailingService;
        private readonly IConfiguration _config;
        private readonly string _fromEmail;
        private readonly string _toEmail;
        private readonly string _emailPwd;

        public MailController(IMailingService mailingService, IConfiguration configuration)
        {
            _mailingService = mailingService;
            _config = configuration;

            _fromEmail = _config.GetValue<string>("MailUser") ?? string.Empty;
            _toEmail = _config.GetValue<string>("MailRecipient") ?? string.Empty;
            _emailPwd = _config.GetValue<string>("MailPassword") ?? string.Empty;
        }

        // POST: api/Mail
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public ActionResult<MailDTO> PostLocation(MailDTO mailMessage)
        {
            var messageBody = string.Format("Message From: {0}\r\nMessage:\r\n{1}", mailMessage.Sender, mailMessage.Message);
            _mailingService.SendEmailAsync(_fromEmail, _emailPwd, _toEmail, mailMessage.Subject, messageBody);
            return mailMessage;
        }
    }
}
