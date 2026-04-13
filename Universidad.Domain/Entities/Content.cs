using System.Net.Mime;

namespace Universidad.Domain.Entities;

using Universidad.Domain.Enums;

public class Content
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }        // rich HTML
    public string? ImageUrl { get; set; } = null;  // URL of image container (optional)
    public DateTime CreationDate { get; set; }
    public int UserId { get; set; }         // who created the content
    public User User { get; set; }
    public int GroupId { get; set; }
    public Group Group { get; set; }

    public ContentType? Type { get; set; } = null;


    public Content(string title, string body, string? imageUrl, int userId, int groupId, ContentType? type)
    {
        Title = title;
        Body = body;
        ImageUrl = imageUrl;
        CreationDate = DateTime.UtcNow;
        UserId = userId;
        GroupId = groupId;
        Type = type ?? ContentType.Default; // default value, can be set later
    }

    public Content() { }

}