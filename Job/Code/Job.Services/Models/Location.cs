using Job.Services.Contracts;

namespace Job.Services.Models;

public partial class Location : LocationDTO
{
    public virtual ICollection<JobApplication> JobApplications { get; set; } = new List<JobApplication>();
}
