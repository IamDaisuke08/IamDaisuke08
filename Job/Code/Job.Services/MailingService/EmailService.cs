
using System.Net;
using System.Net.Mail;

namespace Job.Services.MailingService
{
    public class EmailService : IMailingService
    {
        public void SendEmailAsync(string from, string pwd, string to, string subject, string body)
        {
            var client = new SmtpClient("smtp.mail.yahoo.com", 587)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(from, pwd)
            };

            client.Send(new MailMessage(from, to, subject, body));
        }
    }
}
