﻿using Job.Services.Authentication.Command;
using Job.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Security.Authentication;

namespace Job.Services.Controllers
{
    [Route("api/User")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly ILoginHandler _loginHandler;
        public UserController(ILoginHandler loginHandler) 
        { 
            _loginHandler = loginHandler;
        }

        [HttpPost("Login")]
        public async Task<ActionResult<AppUserDTO>> Login(LoginRequest request, CancellationToken cancellationToken)
        {
            AppUserDTO user;
            try
            {
                user = await _loginHandler.Login(request, cancellationToken);
            }
            catch (InvalidCredentialException)
            {
                return Unauthorized("Invalid Credentials");
            }

            return user;
        }
    }
}
