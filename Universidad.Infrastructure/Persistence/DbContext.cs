namespace Universidad.Infrastructure.Persistence;

using Microsoft.EntityFrameworkCore;
using Universidad.Domain.Entities;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Group> Groups { get; set; }
    public DbSet<UserGroup> UserGroups { get; set; }
    public DbSet<Content> Contents { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasKey(u => u.Id);
        modelBuilder.Entity<Group>().HasKey(d => d.Id);
        modelBuilder.Entity<Content>().HasKey(c => c.Id);

        modelBuilder.Entity<UserGroup>().HasKey(ud => new { ud.UserId, ud.GroupId });

        modelBuilder
            .Entity<UserGroup>()
            .HasOne(ud => ud.User)
            .WithMany(u => u.Groups)
            .HasForeignKey(ud => ud.UserId);

        modelBuilder
            .Entity<UserGroup>()
            .HasOne(ud => ud.Group)
            .WithMany(d => d.Users)
            .HasForeignKey(ud => ud.GroupId);

        modelBuilder
            .Entity<Content>()
            .HasOne(c => c.Group)
            .WithMany(d => d.Content)
            .HasForeignKey(c => c.GroupId);

        modelBuilder.Entity<Content>().HasOne(c => c.User).WithMany().HasForeignKey(c => c.UserId);

        base.OnModelCreating(modelBuilder);
    }
}

