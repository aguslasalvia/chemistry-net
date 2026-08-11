namespace Universidad.Application.Interfaces;

using Universidad.Application.Dto;

public interface IPageUpdate
{
    Task ExecuteAsync(int id, PageUpdateDto dto, int actingUserId);
}
