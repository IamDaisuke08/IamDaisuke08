using Job.Services.Authentication.Jwt;
using Job.Services.Contracts;
using Job.Services.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Authentication;

namespace Job.Services.Authentication.Command
{
    public class LoginHandler : ILoginHandler
    {
        private readonly AppDbContext _context;
        private readonly IJwtProvider _jwtProvider;
        public LoginHandler(AppDbContext context, IJwtProvider jwtProvider)
        { 
            _context = context;
            _jwtProvider = jwtProvider;
        }

        public async Task<string> Login(LoginRequest request, CancellationToken cancellationToken)
        {
            var user = await _context.AppUsers.FirstOrDefaultAsync(x => x.Name == request.username, cancellationToken);
            var valid = user != null && user.Password == request.password;
            if (!valid)
            {
                throw new InvalidCredentialException();
            }

            var token = _jwtProvider.Generate(user);
            return token;
        }
    }
}
