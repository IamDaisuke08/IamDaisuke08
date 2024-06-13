namespace Job.Services.Contracts
{
    public class JobApplicationDTO
    {
        public long Id { get; set; }

        public string CompanyName { get; set; } = null!;

        public string Position { get; set; } = null!;

        public long LocationId { get; set; }

        public long? StatusId { get; set; }

        public string? Comment { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
