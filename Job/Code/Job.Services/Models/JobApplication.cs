using Job.Services.Contracts;

namespace Job.Services.Models;

public partial class JobApplication : JobApplicationDTO
{ 
    public virtual Location Location { get; set; } = null!;

    public virtual JobStatus? Status { get; set; }
}
