namespace Universidad.Application.Dto;

using Universidad.Domain.Enums;

public record ContentDto(
    int Id,
    string Title,
    string Body,
    string? ImageUrl,
    DateTime CreationDate,
    int UserId,
    int GroupId,
    ContentType? Type
);

public record CreateContentDto(
    string Title,
    string Body,
    string? ImageUrl,
    int UserId,
    int GroupId,
    ContentType? Type
);

