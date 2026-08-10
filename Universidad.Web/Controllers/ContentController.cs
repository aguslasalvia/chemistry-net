using Microsoft.AspNetCore.Mvc;
using Universidad.Application.Interfaces;
using Universidad.Application.Dto;

namespace Universidad.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
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

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var contents = await _contentGetAll.ExecuteAsync();
        return Ok(new { Contents = contents });
    }

    [HttpPost]
    public async Task<IActionResult> AddContent([FromBody] CreateContentDto createDto)
    {
        try
        {
            var created = await _contentCreate.ExecuteAsync(createDto);
            return Ok(new { Content = created });
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
            await _contentUpdate.ExecuteAsync(contentId, updateDto);
            return Ok();
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
            await _contentDelete.ExecuteAsync(contentId);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
