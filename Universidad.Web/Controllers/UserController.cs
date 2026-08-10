using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
namespace Universidad.Web.Controllers;


[ApiController]
[Route("api/[controller]")]
public class UserController(
      IUserLogin login,
      IUserRegister register,
      IUserGetAll getAll,
      IUserUpdate update,
      IUserDelete delete,
      IUserChangePassword changePassword
        ) : ControllerBase
{
    private readonly IUserLogin _userLogin = login;
    private readonly IUserRegister _userRegister = register;
    private readonly IUserGetAll _userGetAll = getAll;
    private readonly IUserUpdate _userUpdate = update;
    private readonly IUserDelete _userDelete = delete;
    private readonly IUserChangePassword _userChangePassword = changePassword;

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto credentials)
    {
        if (credentials == null)
            return BadRequest();

        try
        {
            UserDto user = await _userLogin.ExecuteAsync(credentials);

            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Email, user.Email),
                new(ClaimTypes.Name, $"{user.Name} {user.LastName}"),
            };
            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));

            return Ok(new { User = user });
        }
        catch (UnauthorizedAccessException e)
        {
            return Unauthorized(e.Message);
        }
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Ok();
    }


    [HttpPost("users")]
    public async Task<IActionResult> Register([FromBody] UserRegisterDto registerDto)
    {
        Console.WriteLine("Received registration request for: " + registerDto?.Email);
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

    [HttpGet("users")]
    public async Task<IActionResult> GetUsers()
    {
        try
        {
            var users = await _userGetAll.ExecuteAsync();
            return Ok(new { Users = users });

        }
        catch (Exception e)
        {
            Console.WriteLine("Error fetching users: " + e.Message);
            return BadRequest(e.Message);
        }
    }

    [HttpPut("users/{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UserUpdateDto updateDto)
    {
        try
        {
            var user = await _userUpdate.ExecuteAsync(id, updateDto);
            return Ok(new { User = user });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("users/{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        try
        {
            await _userDelete.ExecuteAsync(id);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPatch("users/{id}/password")]
    public async Task<IActionResult> ChangePassword(int id, [FromBody] UserChangePasswordDto passwordDto)
    {
        try
        {
            await _userChangePassword.ExecuteAsync(id, passwordDto);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}

