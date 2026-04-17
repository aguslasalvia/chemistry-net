namespace Universidad.Application.Dto;

public record GroupDto(int Id, string Name, string Description);

public record GroupCreateDto(string Name, string Description);

public record GroupUpdateDto(string Name, string Description);