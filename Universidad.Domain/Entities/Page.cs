namespace Universidad.Domain.Entities;

/// <summary>
/// A standalone, routable public page (e.g. "Institución", "Bedelía") — distinct from
/// Content, which models feed items (News/Events/Academic) rather than static documents.
/// </summary>
public class Page
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Slug { get; set; }        // unique, used as the public URL: /{Slug}
    public string Body { get; set; }
    public string? ImageUrl { get; set; } = null;
    public DateTime CreationDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public int UserId { get; set; }         // who last edited the page
    public User User { get; set; }
    public int GroupId { get; set; }
    public Group Group { get; set; }

    public Page() { }
}
