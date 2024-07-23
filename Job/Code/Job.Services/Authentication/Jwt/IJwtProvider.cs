using Job.Services.Models;

namespace Job.Services.Authentication.Jwt
{
    public interface IJwtProvider
    {
        string Generate(AppUser user);
    }
}
