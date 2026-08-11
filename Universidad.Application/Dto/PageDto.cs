namespace Universidad.Application.Dto;

public record PageDto(
    int Id,
    string Title,
    string Slug,
    string Body,
    string? ImageUrl,
    DateTime CreationDate,
    DateTime UpdatedDate,
    int UserId,
    string UserName,
    int GroupId,
    string GroupName
);

public record PageCreateDto(
    string Title,
    string Slug,
    string Body,
    string? ImageUrl,
    int UserId,
    int GroupId
);

public record PageUpdateDto(
    string Title,
    string Slug,
    string Body,
    string? ImageUrl
);
