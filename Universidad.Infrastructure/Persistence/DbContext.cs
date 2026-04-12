using Microsoft.EntityFrameworkCore;
using Universidad.Domain.Entities;

namespace Universidad.Infrastructure.Persistence;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Department> Departments { get; set; }
    public DbSet<UserDepartment> UserDepartments { get; set; }
    public DbSet<Content> Contents { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasKey(u => u.Id);
        modelBuilder.Entity<Department>().HasKey(d => d.Id);
        modelBuilder.Entity<Content>().HasKey(c => c.Id);

        modelBuilder.Entity<UserDepartment>()
            .HasKey(ud => new { ud.UserId, ud.DepartmentId });

        modelBuilder.Entity<UserDepartment>()
            .HasOne(ud => ud.User)
            .WithMany(u => u.Department)
            .HasForeignKey(ud => ud.UserId);

        modelBuilder.Entity<UserDepartment>()
            .HasOne(ud => ud.Department)
            .WithMany(d => d.Users)
            .HasForeignKey(ud => ud.DepartmentId);

        modelBuilder.Entity<Content>()
            .HasOne(c => c.Department)
            .WithMany(d => d.Content)
            .HasForeignKey(c => c.DepartmentId);

        modelBuilder.Entity<Content>()
            .HasOne(c => c.User)
            .WithMany()
            .HasForeignKey(c => c.UserId);

        base.OnModelCreating(modelBuilder);
    }
}