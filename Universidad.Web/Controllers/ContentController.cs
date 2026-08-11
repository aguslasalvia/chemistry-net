using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Universidad.Application.Interfaces;
using Universidad.Application.Dto;

namespace Universidad.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ContentController(
    IContentGetAll contentGetAll,
    IContentCreate contentCreate,
    IContentUpdate contentUpdate,
    IContentDelete contentDelete
) : ControllerBase
{
    private readonly IContentGetAll _contentGetAll = contentGetAll;
    private readonly IContentCreate _contentCreate = contentCreate;
    private readonly IContentUpdate _contentUpdate = contentUpdate;
    private readonly IContentDelete _contentDelete = contentDelete;

    // Public: the landing page reads content (Novedades/Agenda/Carreras) without a session — unfiltered.
    // The admin Content panel calls this same endpoint while authenticated, in which case it's scoped
    // to the caller's groups (unless they're an admin).
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        int? userId = null;
        if (User.Identity?.IsAuthenticated == true)
        {
            var idClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (int.TryParse(idClaim, out var id)) userId = id;
        }

        var contents = await _contentGetAll.ExecuteAsync(userId);
        return Ok(new { Contents = contents });
    }

    [HttpPost]
    public async Task<IActionResult> AddContent([FromBody] CreateContentDto createDto)
    {
        try
        {
            var created = await _contentCreate.ExecuteAsync(createDto, GetUserId());
            return Ok(new { Content = created });
        }
        catch (UnauthorizedAccessException ex)
        {
            return StatusCode(403, ex.Message);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{contentId}")]
    public async Task<IActionResult> UpdateContent(int contentId, [FromBody] ContentUpdateDto updateDto)
    {
        try
        {
            await _contentUpdate.ExecuteAsync(contentId, updateDto, GetUserId());
            return Ok();
        }
        catch (UnauthorizedAccessException ex)
        {
            return StatusCode(403, ex.Message);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{contentId}")]
    public async Task<IActionResult> DeleteContent(int contentId)
    {
        try
        {
            await _contentDelete.ExecuteAsync(contentId, GetUserId());
            return Ok();
        }
        catch (UnauthorizedAccessException ex)
        {
            return StatusCode(403, ex.Message);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
}
