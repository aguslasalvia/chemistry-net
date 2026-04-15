using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class GroupController()
{

    [HttpPost]
    [Route("/group")]
    public async Task<IActionResult> AddGroup()
    {
        return null;
    }

    [HttpPut]
    [Route("/group")]
    public async Task<IActionResult> UpdateGroup()
    {
        return null;
    }


    [HttpPost]
    [Route("/add-user")]
    public async Task<IActionResult> AddUserToGroup()
    {
        return null;
    }

    [HttpDelete]
    [Route("/delete-user")]
    public async Task<IActionResult> DeleteUserFromGroup()
    {
        return null;
    }
}
