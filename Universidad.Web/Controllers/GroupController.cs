using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
namespace Universidad.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class GroupController(
    IGroupGetAll groupGetAll,
    IGroupGetById groupGetById,
    IGroupCreate groupCreate,
    IGroupUpdate groupUpdate,
    IGroupDelete groupDelete,
    IGroupAddUser groupAddUser,
    IGroupRemoveUser groupRemoveUser,
    IGroupUpdateUserRole groupUpdateUserRole
) : ControllerBase
{
    private readonly IGroupGetAll _groupGetAll = groupGetAll;
    private readonly IGroupGetById _groupGetById = groupGetById;
    private readonly IGroupCreate _groupCreate = groupCreate;
    private readonly IGroupUpdate _groupUpdate = groupUpdate;
    private readonly IGroupDelete _groupDelete = groupDelete;
    private readonly IGroupAddUser _groupAddUser = groupAddUser;
    private readonly IGroupRemoveUser _groupRemoveUser = groupRemoveUser;
    private readonly IGroupUpdateUserRole _groupUpdateUserRole = groupUpdateUserRole;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var groups = await _groupGetAll.ExecuteAsync();
        return Ok(new { Groups = groups });
    }


    [HttpGet("{groupId}")]
    public async Task<IActionResult> GetById(int groupId)
    {
        try
        {
            var group = await _groupGetById.ExecuteAsync(groupId);
            return Ok(new { Group = group });
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
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

    [HttpDelete("{groupId}")]
    public async Task<IActionResult> Delete(int groupId)
    {
        try
        {
            await _groupDelete.ExecuteAsync(groupId);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("{groupId}/users")]
    public async Task<IActionResult> AddUser(int groupId, [FromBody] GroupAddUserDto addUserDto)
    {
        try
        {
            await _groupAddUser.ExecuteAsync(groupId, addUserDto);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{groupId}/users/{userId}")]
    public async Task<IActionResult> RemoveUser(int groupId, int userId)
    {
        try
        {
            await _groupRemoveUser.ExecuteAsync(groupId, userId);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPatch("{groupId}/users/{userId}/role")]
    public async Task<IActionResult> UpdateUserRole(int groupId, int userId, [FromBody] GroupUpdateUserRoleDto roleDto)
    {
        try
        {
            await _groupUpdateUserRole.ExecuteAsync(groupId, userId, roleDto);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
