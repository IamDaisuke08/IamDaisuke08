using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Job.Services.Models;

public partial class AppDbContext : DbContext
{

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<JobApplication> JobApplications { get; set; }

    public virtual DbSet<JobStatus> JobStatuses { get; set; }

    public virtual DbSet<Location> Locations { get; set; }

    public virtual DbSet<Message> Messages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<JobApplication>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__JobApplication");

            entity.ToTable("JobApplication");

            entity.Property(e => e.CompanyName).HasMaxLength(150);
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getutcdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Position).HasMaxLength(150);

            entity.HasOne(d => d.Location).WithMany(p => p.JobApplications)
                .HasForeignKey(d => d.LocationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobApplication_LocationId_Location_Id");

            entity.HasOne(d => d.Status).WithMany(p => p.JobApplications)
                .HasForeignKey(d => d.StatusId)
                .HasConstraintName("FK_JobApplication_StatusId_JobStatus_Id");
        });

        modelBuilder.Entity<JobStatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__JobStatus");

            entity.ToTable("JobStatus");

            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getutcdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Location>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Location");

            entity.ToTable("Location");

            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getutcdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Messages");

            entity.HasIndex(e => new { e.CountryCode, e.StartDate }, "PK__Messages_CountryCode_StartDate").IsUnique();

            entity.Property(e => e.CountryCode).HasMaxLength(3);
            entity.Property(e => e.EndDate).HasColumnType("datetime");
            entity.Property(e => e.Message1).HasColumnName("Message");
            entity.Property(e => e.StartDate).HasColumnType("datetime");
            entity.Property(e => e.Title).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
