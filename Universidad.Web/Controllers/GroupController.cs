using Microsoft.AspNetCore.Mvc;
using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
namespace Universidad.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GroupController(
    IGroupCreate groupCreate,
    IGroupUpdate groupUpdate
) : ControllerBase
{
    private readonly IGroupCreate _groupCreate = groupCreate;
    private readonly IGroupUpdate _groupUpdate = groupUpdate;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return await Task.FromResult<IActionResult>(null);
    }


    [HttpGet("{groupId}")]
    public async Task<IActionResult> GetById(string groupId)
    {
        return await Task.FromResult<IActionResult>(null);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] GroupCreateDto createDto)
    {
        try
        {
            var createdGroup = await _groupCreate.ExecuteAsync(createDto);
            return Ok(new { Group = createdGroup });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{groupId}")]
    public async Task<IActionResult> Update(int groupId, [FromBody] GroupUpdateDto updateDto)
    {
        try
        {
            await _groupUpdate.ExecuteAsync(groupId, updateDto);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }


    [HttpPost("{groupId}/users")]
    public async Task<IActionResult> AddUser(string groupId)
    {
        return await Task.FromResult<IActionResult>(null);
    }

    [HttpDelete("{groupId}/users/{userId}")]
    public async Task<IActionResult> RemoveUser(string groupId, string userId)
    {
        return await Task.FromResult<IActionResult>(null);
    }

    [HttpPatch("{groupId}/users/{userId}/role")]
    public async Task<IActionResult> UpdateUserRole(string groupId, string userId)
    {
        return await Task.FromResult<IActionResult>(null);
    }
}
