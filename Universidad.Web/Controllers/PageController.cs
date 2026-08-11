using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Universidad.Application.Interfaces;
using Universidad.Application.Dto;

namespace Universidad.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PageController(
    IPageGetAll pageGetAll,
    IPageGetBySlug pageGetBySlug,
    IPageCreate pageCreate,
    IPageUpdate pageUpdate,
    IPageDelete pageDelete
) : ControllerBase
{
    private readonly IPageGetAll _pageGetAll = pageGetAll;
    private readonly IPageGetBySlug _pageGetBySlug = pageGetBySlug;
    private readonly IPageCreate _pageCreate = pageCreate;
    private readonly IPageUpdate _pageUpdate = pageUpdate;
    private readonly IPageDelete _pageDelete = pageDelete;

    // Admin listing — used by the Pages panel. Scoped to the caller's groups unless they're an admin.
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var idClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        int? userId = int.TryParse(idClaim, out var id) ? id : null;

        var pages = await _pageGetAll.ExecuteAsync(userId);
        return Ok(new { Pages = pages });
    }

    // Public: any visitor loads a page by its URL slug without a session.
    [HttpGet("by-slug/{slug}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        try
        {
            var page = await _pageGetBySlug.ExecuteAsync(slug);
            return Ok(new { Page = page });
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PageCreateDto createDto)
    {
        try
        {
            var created = await _pageCreate.ExecuteAsync(createDto, GetUserId());
            return Ok(new { Page = created });
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

    [HttpPut("{pageId}")]
    public async Task<IActionResult> Update(int pageId, [FromBody] PageUpdateDto updateDto)
    {
        try
        {
            await _pageUpdate.ExecuteAsync(pageId, updateDto, GetUserId());
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

    [HttpDelete("{pageId}")]
    public async Task<IActionResult> Delete(int pageId)
    {
        try
        {
            await _pageDelete.ExecuteAsync(pageId, GetUserId());
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
