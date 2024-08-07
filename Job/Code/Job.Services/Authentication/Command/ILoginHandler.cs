﻿using Job.Services.Contracts;

namespace Job.Services.Authentication.Command
{
    public interface ILoginHandler
    {
        Task<AppUserDTO> Login(LoginRequest request, CancellationToken cancellationToken);
    }
}
