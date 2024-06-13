namespace Job.Services.Contracts
{
    public class LocationDTO
    {
        public long Id { get; set; }

        public string Name { get; set; } = null!;

        public DateTime CreatedDate { get; set; }
    }
}
