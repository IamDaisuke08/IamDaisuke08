using Job.Services.Authentication.Jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Job.Services.Authentication.OptionSetup
{
    public class JwtBearerOptionSetup : IConfigureOptions<JwtBearerOptions>
    {
        private readonly JwtOption _jwtOption;

        public JwtBearerOptionSetup(IOptions<JwtOption> option)
        {
            _jwtOption = option.Value;
        }

        public void Configure(JwtBearerOptions options)
        {
            options.Audience = _jwtOption.Audience;
            options.Authority = _jwtOption.Issuer;
            options.RequireHttpsMetadata = false;
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                RequireExpirationTime = false,
                ValidateIssuerSigningKey = false,
                ValidIssuer = _jwtOption.Issuer,
                ValidAudience = _jwtOption.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes("my-secret-key-is-so-awesome-and-you-cant-copy-it"))

                //ValidateIssuer = true,
                //ValidateAudience = true,
                //ValidateLifetime = true,
                //RequireExpirationTime = false,
                //ValidateIssuerSigningKey = false,
                //ValidIssuer = _jwtOption.Issuer,
                //ValidAudience = _jwtOption.Audience,
                //IssuerSigningKey = new SymmetricSecurityKey(
                //    Encoding.UTF8.GetBytes(_jwtOption.SecretKey))
            };
        }
    }
}
