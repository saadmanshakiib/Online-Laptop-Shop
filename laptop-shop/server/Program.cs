using LaptopShop.Api.Data;
using LaptopShop.Api.Service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Register Controllers
builder.Services.AddControllers();

// Register Services
builder.Services.AddScoped<iLaptopService, LaptopService>();

// OpenAPI
builder.Services.AddOpenApi();

// Database
builder.Services.AddDbContext<LaptopShopDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactClient", policy =>
        policy.WithOrigins(
                "http://localhost:5173",
                "http://127.0.0.1:5173")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

// Create Database
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<LaptopShopDbContext>();
    dbContext.Database.EnsureCreated();
}

// OpenAPI
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Middleware
app.UseCors("ReactClient");

app.UseHttpsRedirection();

// Map Controllers
app.MapControllers();

// Test Endpoint
app.MapGet("/ok", () => "Sadman");

// Customers Endpoint
app.MapGet("/customers", async (LaptopShopDbContext dbContext) =>
    await dbContext.Customers
        .Select(customer => new
        {
            customer.Id,
            customer.FullName,
            customer.Email,
            customer.CreatedAt
        })
        .ToListAsync());

// Login Endpoint


app.Run();

//record LoginRequest(string Email, string Password);