using Job.Services.Contracts;

namespace Job.Services.Models;

public partial class JobStatus : JobStatusDTO
{
    public virtual ICollection<JobApplication> JobApplications { get; set; } = new List<JobApplication>();
}
