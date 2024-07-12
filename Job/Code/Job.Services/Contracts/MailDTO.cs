namespace Job.Services.Contracts
{
    public class MailDTO
    {
        public string Sender { get; set; } = null!;

        public string Subject { get; set; } = null!;

        public string Message { get; set; } = null!;
    }
}
