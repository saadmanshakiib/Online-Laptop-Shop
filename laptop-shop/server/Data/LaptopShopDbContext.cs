using LaptopShop.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace LaptopShop.Api.Data;

public class LaptopShopDbContext(DbContextOptions<LaptopShopDbContext> options) : DbContext(options)
{
    public DbSet<Customer> Customers => Set<Customer>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>()
            .HasIndex(customer => customer.Email)
            .IsUnique();

        modelBuilder.Entity<Customer>().HasData(
            new Customer
            {
                Id = 1,
                FullName = "Demo Customer",
                Email = "customer@example.com",
                PasswordHash = "demo-password-placeholder",
                CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            });
    }
}
