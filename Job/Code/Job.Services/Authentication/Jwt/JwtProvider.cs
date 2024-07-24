using Job.Services.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Job.Services.Authentication.Jwt
{
    internal sealed class JwtProvider : IJwtProvider
    {
        private readonly JwtOption _option;

        public JwtProvider(IOptions<JwtOption> option)
        {
            _option = option.Value;
        }

        public string Generate(AppUser user)
        {
            var claims = new Claim[] 
            { 
                new (JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new (JwtRegisteredClaimNames.Name, user.Name),
                new (JwtRegisteredClaimNames.Email, user.Email),
            };

            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_option.SecretKey)),
                SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _option.Issuer,
                _option.Audience,
                claims,
                null,
                DateTime.UtcNow.AddMinutes(30),
                signingCredentials);

            var tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenValue;
        }
    }
}
