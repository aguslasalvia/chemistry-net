using Microsoft.AspNetCore.Mvc;

namespace Universidad.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GroupController()
{

    [HttpPost]
    public async Task<IActionResult> AddGroup()
    {
        return await Task.FromResult<IActionResult>(null);
    }

    [HttpPut("{groupId}")]
    public async Task<IActionResult> UpdateGroup(string groupId)
    {
        return await Task.FromResult<IActionResult>(null);
    }


    [HttpPost("{groupId}/user")]
    public async Task<IActionResult> AddUserToGroup(string groupId)
    {
        return await Task.FromResult<IActionResult>(null);
    }

    [HttpDelete("{groupId}/user/{userId}")]
    public async Task<IActionResult> DeleteUserFromGroup(string groupId, string userId)
    {
        return await Task.FromResult<IActionResult>(null);
    }
}
