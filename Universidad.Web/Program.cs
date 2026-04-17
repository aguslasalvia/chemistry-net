using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Universidad.Application.Interfaces;
using Universidad.Application.UseCases;
using Universidad.Domain.Interfaces;
using Universidad.Infrastructure.Persistence;
using Universidad.Infrastructure.Repositories;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Repositories Injection
        builder.Services.AddScoped(typeof(IUserRepository), typeof(UserRepository));
        builder.Services.AddScoped(typeof(IContentRepository), typeof(ContentRepository));
        builder.Services.AddScoped(typeof(IGroupRepository), typeof(GroupRepository));

        // Use Cases Injection
        // User
        builder.Services.AddScoped(typeof(IUserLogin), typeof(UserLogin));
        builder.Services.AddScoped(typeof(IUserRegister), typeof(UserRegister));

        // Group
        builder.Services.AddScoped(typeof(IGroupCreate), typeof(GroupCreate));
        builder.Services.AddScoped(typeof(IGroupUpdate), typeof(GroupUpdate));

        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlite("Data Source=university.db")
        );

        builder.Services.AddControllers();

        builder
            .Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(options =>
            {
                options.ExpireTimeSpan = TimeSpan.FromHours(8);
                options.SlidingExpiration = true;
            });

        builder.Services.AddAuthorization();

        var app = builder.Build();

        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.Database.EnsureCreated();
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
