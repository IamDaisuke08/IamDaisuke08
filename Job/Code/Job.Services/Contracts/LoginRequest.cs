namespace Job.Services.Contracts
{
    public class LoginRequest
    {
        public string username { get; set; } = null!;
        public string password { get; set; } = null!;
    }
}
