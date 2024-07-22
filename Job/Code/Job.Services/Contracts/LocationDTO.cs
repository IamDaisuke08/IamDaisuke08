namespace Job.Services.Contracts
{
    public class LocationDTO
    {
        public long Id { get; set; }

        public string Name { get; set; } = null!;

        public DateTime CreatedDate { get; set; }

        public double? Lng { get; set; }

        public double? Lat { get; set; }

        public int? Zoom { get; set; }
    }
}
