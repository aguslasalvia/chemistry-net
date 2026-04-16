using Microsoft.AspNetCore.Mvc;
using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
namespace Universidad.Web.Controllers;


[ApiController]
[Route("api/[controller]")]
public class UserController(
      IUserLogin login,
      IUserRegister register
        ) : ControllerBase
{
    private readonly IUserLogin _userLogin = login;
    private readonly IUserRegister _userRegister = register;

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


    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterDto registerDto)
    {
        if (registerDto == null)
            return BadRequest();
        try
        {
            UserDto user = await _userRegister.ExecuteAsync(registerDto);
            return Ok(new { User = user });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}

