namespace Universidad.Application.Dto;

public record GroupDto(int Id, string Name, string Description);

public record GroupCreateDto(string Nam, string Description);