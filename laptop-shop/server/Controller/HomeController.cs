using LaptopShop.Api.Models;
using LaptopShop.Api.Service;
using Microsoft.AspNetCore.Mvc;

namespace  LaptopShop.Api.Controller;

[Route("/laptops")]
[ApiController]

public class HomeController(iLaptopService service) : ControllerBase
{
    
    [HttpGet]
    public async Task<ActionResult<List<LaptopDTO>>> getAllLaptops()
    {
       return await service.getAllLaptopsAsync();
    }

    [HttpPost("/login")]
    public async Task<Customer> userLogin(LoginRequest request)
    {
        return await service.Login(request);
    }
    
}