using LaptopShop.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddDbContext<LaptopShopDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactClient", policy =>
        policy.WithOrigins("http://localhost:5173", "http://127.0.0.1:5173")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<LaptopShopDbContext>();
    dbContext.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("ReactClient");
app.UseHttpsRedirection();
app.MapGet("/ok",()=>"Sadman");

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
app.MapPost("/login", async (LoginRequest request, LaptopShopDbContext dbContext) =>
{
    var customer = await dbContext.Customers
        .Where(customer => customer.Email.ToLower() == request.Email.Trim().ToLower())
        .FirstOrDefaultAsync();

    if (customer is null || customer.PasswordHash != request.Password)
    {
        return Results.NotFound(new { message = "No account found" });
    }

    return Results.Ok(new
    {
        message = "Login successful",
        customer = new
        {
            customer.Id,
            customer.FullName,
            customer.Email
        }
    });
});

app.Run();

record LoginRequest(string Email, string Password);
