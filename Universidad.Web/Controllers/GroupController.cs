using Microsoft.AspNetCore.Mvc;

namespace Universidad.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GroupController()
{

    [HttpPost]
    [Route("/group")]
    public async Task<IActionResult> AddGroup()
    {
        return await Task.FromResult<IActionResult>(null);
    }

    [HttpPut]
    [Route("/group")]
    public async Task<IActionResult> UpdateGroup()
    {
        return await Task.FromResult<IActionResult>(null);
    }


    [HttpPost]
    [Route("/add-user")]
    public async Task<IActionResult> AddUserToGroup()
    {
        return await Task.FromResult<IActionResult>(null);
    }

    [HttpDelete]
    [Route("/delete-user")]
    public async Task<IActionResult> DeleteUserFromGroup()
    {
        return await Task.FromResult<IActionResult>(null);
    }
}
