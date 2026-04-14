using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Universidad.Infrastructure.Persistence;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

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
            builder.WebHost.UseUrls("http://localhost:5000");
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

