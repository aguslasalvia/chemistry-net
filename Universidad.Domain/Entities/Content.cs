namespace Universidad.Domain.Entities;

public class Content
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }        // rich HTML
    public string? ImageUrl { get; set; }    // URL of image container (optional)
    public DateTime CreationDate { get; set; }
    public int UserId { get; set; }     // who created the content
    public User User { get; set; }
    public int DepartmentId { get; set; }
    public Department Department { get; set; }


    public Content(string title, string body, string? imageUrl, int userId, int departmentId)
    {
        Title = title;
        Body = body;
        ImageUrl = imageUrl;
        CreationDate = DateTime.UtcNow;
        UserId = userId;
        DepartmentId = departmentId;
    }

    public Content() { }

}