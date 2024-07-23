using Job.Services.Contracts;

namespace Job.Services.Authentication.Command
{
    public interface ILoginHandler
    {
        Task<string> Login(LoginRequest request, CancellationToken cancellationToken);
    }
}
