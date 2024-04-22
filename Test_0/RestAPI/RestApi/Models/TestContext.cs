using Microsoft.EntityFrameworkCore;

namespace RestApi.Models;

public class TestContext : DbContext
{
    public TestContext(DbContextOptions<TestContext> options)
        : base(options)
    {
    }

    public DbSet<TestItem> TodoItems { get; set; } = null!;
}