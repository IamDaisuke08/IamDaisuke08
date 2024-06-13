using Job.Services.Models;

namespace Job.Services.Contracts
{
    public class JobStatusDTO
    {
        public long Id { get; set; }

        public string Name { get; set; } = null!;

        public DateTime CreatedDate { get; set; }
    }
}
