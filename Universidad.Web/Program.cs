using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Universidad.Application.Interfaces;
using Universidad.Application.UseCases;
using Universidad.Domain.Interfaces;
using Universidad.Infrastructure.Persistence;
using Universidad.Infrastructure.Repositories;
using Universidad.Web;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Repositories Injection
        builder.Services.AddScoped(typeof(IUserRepository), typeof(UserRepository));
        builder.Services.AddScoped(typeof(IContentRepository), typeof(ContentRepository));
        builder.Services.AddScoped(typeof(IGroupRepository), typeof(GroupRepository));
        builder.Services.AddScoped(typeof(IPageRepository), typeof(PageRepository));

        // Use Cases Injection
        // User
        builder.Services.AddScoped(typeof(IUserLogin), typeof(UserLogin));
        builder.Services.AddScoped(typeof(IUserRegister), typeof(UserRegister));
        builder.Services.AddScoped(typeof(IUserGetAll), typeof(UserGetAll));
        builder.Services.AddScoped(typeof(IUserUpdate), typeof(UserUpdate));
        builder.Services.AddScoped(typeof(IUserDelete), typeof(UserDelete));
        builder.Services.AddScoped(typeof(IUserChangePassword), typeof(UserChangePassword));
        builder.Services.AddScoped(typeof(IUserGetById), typeof(UserGetById));

        // Group
        builder.Services.AddScoped(typeof(IGroupGetAll), typeof(GroupGetAll));
        builder.Services.AddScoped(typeof(IGroupGetById), typeof(GroupGetById));
        builder.Services.AddScoped(typeof(IGroupCreate), typeof(GroupCreate));
        builder.Services.AddScoped(typeof(IGroupUpdate), typeof(GroupUpdate));
        builder.Services.AddScoped(typeof(IGroupDelete), typeof(GroupDelete));
        builder.Services.AddScoped(typeof(IGroupAddUser), typeof(GroupAddUser));
        builder.Services.AddScoped(typeof(IGroupRemoveUser), typeof(GroupRemoveUser));
        builder.Services.AddScoped(typeof(IGroupUpdateUserRole), typeof(GroupUpdateUserRole));

        // Content
        builder.Services.AddScoped(typeof(IContentGetAll), typeof(ContentGetAll));
        builder.Services.AddScoped(typeof(IContentCreate), typeof(ContentCreate));
        builder.Services.AddScoped(typeof(IContentUpdate), typeof(ContentUpdate));
        builder.Services.AddScoped(typeof(IContentDelete), typeof(ContentDelete));

        // Page
        builder.Services.AddScoped(typeof(IPageGetAll), typeof(PageGetAll));
        builder.Services.AddScoped(typeof(IPageGetBySlug), typeof(PageGetBySlug));
        builder.Services.AddScoped(typeof(IPageCreate), typeof(PageCreate));
        builder.Services.AddScoped(typeof(IPageUpdate), typeof(PageUpdate));
        builder.Services.AddScoped(typeof(IPageDelete), typeof(PageDelete));

        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlite("Data Source=university.db")
        );

        builder.Services.AddControllers()
            .AddJsonOptions(options =>
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter())
            );

        builder
            .Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(options =>
            {
                options.ExpireTimeSpan = TimeSpan.FromHours(8);
                options.SlidingExpiration = true;
                // This is an API consumed by a SPA, not a server-rendered app — on an
                // unauthenticated/forbidden request, return a bare status code instead of
                // the default 302 redirect to a login page (which doesn't exist here and
                // would otherwise get masked into a 200 by MapFallbackToFile).
                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    return Task.CompletedTask;
                };
                options.Events.OnRedirectToAccessDenied = context =>
                {
                    context.Response.StatusCode = StatusCodes.Status403Forbidden;
                    return Task.CompletedTask;
                };
            });

        builder.Services.AddAuthorization();

        var app = builder.Build();

        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.Database.EnsureCreated();

            if (!db.Users.Any())
            {
                SeedData.Seed(db);
            }
        }

        if (!app.Environment.IsDevelopment())
        {
            app.UseHsts();
            builder.WebHost.UseUrls("http://0.0.0.0:5000");
        }
        else
        {
            builder.WebHost.UseUrls("http://localhost:5050");
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        app.MapFallbackToFile("index.html");

        app.Run();
    }
}
