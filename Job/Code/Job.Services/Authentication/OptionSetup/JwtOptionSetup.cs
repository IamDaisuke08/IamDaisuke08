using Job.Services.Authentication.Jwt;
using Microsoft.Extensions.Options;

namespace Job.Services.Authentication.OptionSetup
{
    public class JwtOptionSetup : IConfigureOptions<JwtOption>
    {
        private readonly string SectionName = "Jwt";
        private readonly IConfiguration _configuration;

        public JwtOptionSetup(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public void Configure(JwtOption options)
        {
            _configuration.GetSection(SectionName).Bind(options);
        }
    }
}
