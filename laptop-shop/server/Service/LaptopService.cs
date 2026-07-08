
//using DefaultNamespace;
using LaptopShop.Api.Data;
using LaptopShop.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LaptopShop.Api.Service;

public class LaptopService(LaptopShopDbContext context) : iLaptopService
{
    public async Task<List<LaptopDTO>> getAllLaptopsAsync() => await context.laptops.Select(l => new LaptopDTO()
    {
        BrandId = l.BrandId,
        CategoryId = l.CategoryId,
        SKU = l.SKU,
        ModelName = l.ModelName,
        Description = l.Description,
        Price = l.Price,
        DiscountPrice = l.DiscountPrice,
        StockQuantity = l.StockQuantity,
        ReleaseYear = l.ReleaseYear,
        IsActive = l.IsActive,
        Category = l.Category,
        CreatedAt = l.CreatedAt,
        Brand = l.Brand
    }).ToListAsync();
    
    
    public async Task<Customer> Login(LoginRequest request)
    {
        var customer = await context.Customers
            .FirstOrDefaultAsync(c =>
                c.Email.ToLower() == request.Email.Trim().ToLower());

        if (customer is null || customer.PasswordHash != request.Password)
        {
            return null;
        }
        Console.WriteLine(customer);
        return customer;
    }

}
