namespace Job.Services.Models
{
    public class AppUser
    {
        public long Id { get; set; }

        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public DateTime CreatedDate { get; set; }
    }
}
