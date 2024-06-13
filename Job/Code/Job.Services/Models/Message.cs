using System;
using System.Collections.Generic;

namespace Job.Services.Models;

public partial class Message
{
    public long Id { get; set; }

    public string CountryCode { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string Message1 { get; set; } = null!;

    public DateTime StartDate { get; set; }

    public DateTime? EndDate { get; set; }
}
