using Microsoft.EntityFrameworkCore;

namespace backend;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<Club> Clubs => Set<Club>();
    public DbSet<Player> Players => Set<Player>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Player>()
            .HasOne(p => p.Club).WithMany().HasForeignKey(o => o.ClubId);
        modelBuilder.Entity<Player>().HasIndex(p => p.ApiId).IsUnique();
    }
}
