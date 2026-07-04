using System.ComponentModel.DataAnnotations;

namespace LaptopShop.Api.Models;

public class Customer
{
    public int Id { get; set; }

    [MaxLength(120)] public string FullName { get; set; } = string.Empty;
    
    [MaxLength(180)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(240)]
    public string PasswordHash { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
