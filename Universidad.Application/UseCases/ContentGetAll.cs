namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Interfaces;

public class ContentGetAll(IContentRepository repository, IUserRepository userRepository) : IContentGetAll
{
    private readonly IContentRepository _repository = repository;
    private readonly IUserRepository _userRepository = userRepository;

    public async Task<IEnumerable<ContentDto>> ExecuteAsync(int? currentUserId)
    {
        var contents = await _repository.GetAllAsync();

        if (currentUserId is int userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user != null && !user.IsAdmin)
            {
                var groupIds = user.Groups.Select(g => g.GroupId).ToHashSet();
                contents = contents.Where(c => groupIds.Contains(c.GroupId)).ToList();
            }
        }

        return contents.Select(c => new ContentDto(
            Id: c.Id,
            Title: c.Title,
            Body: c.Body,
            ImageUrl: c.ImageUrl,
            Subtitle: c.Subtitle,
            CreationDate: c.CreationDate,
            UserId: c.UserId,
            UserName: $"{c.User.Name} {c.User.LastName}",
            GroupId: c.GroupId,
            GroupName: c.Group.Name,
            Type: c.Type
        ));
    }
}
