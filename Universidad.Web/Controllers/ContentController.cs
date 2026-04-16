using Microsoft.AspNetCore.Mvc;

namespace Universidad.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContentController()
{
    [HttpPost]
    public async Task<IActionResult> AddContent()
    {
        return await Task.FromResult<IActionResult>(null);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateContent()
    {
        return await Task.FromResult<IActionResult>(null);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteContent()
    {
        return await Task.FromResult<IActionResult>(null);
    }
}