using LaptopShop.Api.Models;

namespace LaptopShop.Api.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Laptop
{
    [Key]
    public int LaptopId { get; set; }

    [Required]
    public int BrandId { get; set; }

    [Required]
    public int CategoryId { get; set; }

    [Required]
    [MaxLength(50)]
    public string SKU { get; set; } = string.Empty;

    [Required]
    [MaxLength(150)]
    public string ModelName { get; set; } = string.Empty;

    public string? Description { get; set; }

    [Column(TypeName = "decimal(10,2)")]
    public decimal Price { get; set; }

    [Column(TypeName = "decimal(10,2)")]
    public decimal? DiscountPrice { get; set; }

    public int StockQuantity { get; set; } = 0;

    public int? ReleaseYear { get; set; }

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [ForeignKey(nameof(BrandId))]
    public Brand? Brand { get; set; }

    [ForeignKey(nameof(CategoryId))]
    public Category? Category { get; set; }
}