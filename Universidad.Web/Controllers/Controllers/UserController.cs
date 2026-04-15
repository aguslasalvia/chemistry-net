using Microsoft.AspNetCore.Mvc;
using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
namespace Universidad.Web.Controllers;


[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserLogin _userLogin;

    public UserController(
          IUserLogin login
        )
    {
        this._userLogin = login;
    }



    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto credentials)
    {
        if (credentials == null)
            return BadRequest();

        try
        {
            UserDto user = await _userLogin.ExecuteAsync(credentials);
            return Ok(new { User = user });
        }
        catch (UnauthorizedAccessException e)
        {
            return Unauthorized(e.Message);
        }
    }
}

