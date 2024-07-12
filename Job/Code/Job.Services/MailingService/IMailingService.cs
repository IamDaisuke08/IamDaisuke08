namespace Job.Services.MailingService
{
    public interface IMailingService
    {
        void SendEmailAsync(string from, string pwd, string to, string subject, string body);
    }
}
