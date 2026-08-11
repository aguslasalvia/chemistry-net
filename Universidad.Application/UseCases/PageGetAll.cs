namespace Universidad.Application.UseCases;

using Universidad.Application.Interfaces;
using Universidad.Application.Dto;
using Universidad.Domain.Interfaces;

public class PageGetAll(IPageRepository repository, IUserRepository userRepository) : IPageGetAll
{
    private readonly IPageRepository _repository = repository;
    private readonly IUserRepository _userRepository = userRepository;

    public async Task<IEnumerable<PageDto>> ExecuteAsync(int? currentUserId)
    {
        var pages = await _repository.GetAllAsync();

        if (currentUserId is int userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user != null && !user.IsAdmin)
            {
                var groupIds = user.Groups.Select(g => g.GroupId).ToHashSet();
                pages = pages.Where(p => groupIds.Contains(p.GroupId)).ToList();
            }
        }

        return pages.Select(p => new PageDto(
            Id: p.Id,
            Title: p.Title,
            Slug: p.Slug,
            Body: p.Body,
            ImageUrl: p.ImageUrl,
            CreationDate: p.CreationDate,
            UpdatedDate: p.UpdatedDate,
            UserId: p.UserId,
            UserName: $"{p.User.Name} {p.User.LastName}",
            GroupId: p.GroupId,
            GroupName: p.Group.Name
        ));
    }
}
