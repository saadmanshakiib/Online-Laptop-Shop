//namespace DefaultNamespace;

using LaptopShop.Api.Models;

namespace LaptopShop.Api.Service;

public interface iLaptopService
{
    Task<List<LaptopDTO>> getAllLaptopsAsync();
    Task<Customer> Login(LoginRequest request);
}