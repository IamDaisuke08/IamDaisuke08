﻿namespace Job.Services.Contracts
{
    public class AppUserDTO
    {
        public long Id { get; set; }

        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Token { get; set; } = null!;
    }
}
