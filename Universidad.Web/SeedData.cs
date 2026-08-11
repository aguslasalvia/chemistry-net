using Universidad.Domain.Entities;
using Universidad.Domain.Enums;
using Universidad.Infrastructure.Persistence;

namespace Universidad.Web;

/// <summary>
/// Seeds a freshly-created (empty) database with an admin user, content groups, and
/// sample content — so the public site isn't empty and there's a known way to log in.
/// Only runs once, gated on the Users table being empty (see Program.cs).
/// </summary>
internal static class SeedData
{
    public static void Seed(AppDbContext db)
    {
        var admin = new User
        {
            Name = "Admin",
            LastName = "FQ",
            Email = "admin@fq.edu.uy",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
        };
        var agustin = new User
        {
            Name = "Agustín",
            LastName = "Lasalvia",
            Email = "agustin@fq.edu.uy",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("agustin"),
        };
        db.Users.AddRange(admin, agustin);

        var noticiasGroup = new Group { Name = "Noticias", Description = "Novedades y comunicados de la facultad" };
        var eventosGroup = new Group { Name = "Eventos", Description = "Agenda de actividades de la facultad" };
        var academicoGroup = new Group { Name = "Académico", Description = "Oferta de carreras y programas" };
        db.Groups.AddRange(noticiasGroup, eventosGroup, academicoGroup);

        db.SaveChanges(); // flush so admin/group Ids are assigned before Content references them

        Content NewsItem(string subtitle, string title, string body) => new()
        {
            Title = title,
            Body = body,
            Subtitle = subtitle,
            UserId = admin.Id,
            GroupId = noticiasGroup.Id,
            Type = ContentType.News,
            CreationDate = DateTime.UtcNow,
        };

        Content EventItem(DateTime date, string title, string location) => new()
        {
            Title = title,
            Body = $"Actividad organizada por la Facultad de Química. Más información próximamente.",
            Subtitle = location,
            UserId = admin.Id,
            GroupId = eventosGroup.Id,
            Type = ContentType.Events,
            CreationDate = date,
        };

        Content CareerItem(string duration, string name, string desc) => new()
        {
            Title = name,
            Body = desc,
            Subtitle = duration,
            UserId = admin.Id,
            GroupId = academicoGroup.Id,
            Type = ContentType.Academic,
            CreationDate = DateTime.UtcNow,
        };

        db.Contents.AddRange(
            NewsItem("Investigación", "Kombuchas bajo la lupa",
                "Un estudio caracterizó las marcas de kombucha del mercado uruguayo, encontrando niveles de alcohol no siempre declarados."),
            NewsItem("Investigación", "Microplásticos en leche humana",
                "Un equipo interdisciplinario avanza en la primera investigación nacional sobre microplásticos en leche humana."),
            NewsItem("Internacional", "Rumbo a la Olimpiada de Química",
                "Estudiantes y docentes representarán a Uruguay en la Olimpiada Internacional de Química 2026, en Tashkent."),
            NewsItem("Enseñanza", "Glosario accesible de Química",
                "Una nueva herramienta digital busca facilitar el acceso al aprendizaje de la química para todas las personas."),

            EventItem(new DateTime(2026, 3, 15), "Jornada de puertas abiertas", "Edificio central"),
            EventItem(new DateTime(2026, 3, 22), "Charla: Química verde y sostenibilidad", "Aula Magna"),
            EventItem(new DateTime(2026, 3, 28), "Defensa de tesis de maestría", "Sala de posgrados"),
            EventItem(new DateTime(2026, 4, 5), "Feria de carreras UDELAR", "Explanada"),

            CareerItem("Grado · 5 años", "Química",
                "Formación científica de base para investigación y desarrollo en la industria química."),
            CareerItem("Grado · 5 años", "Ingeniería Química",
                "Diseño y operación de procesos industriales a escala."),
            CareerItem("Grado · 5 años", "Ingeniería de Alimentos",
                "Tecnología, calidad y seguridad en la producción de alimentos."),
            CareerItem("Grado · 5 años", "Farmacia",
                "Formación en medicamentos, análisis y atención farmacéutica."),
            CareerItem("Grado · 4 años", "Enología",
                "Ciencia y tecnología aplicadas a la elaboración de vinos."),
            CareerItem("Corta · 3 años", "Tecnólogo Químico",
                "Carrera corta orientada a la práctica en laboratorio e industria.")
        );

        db.SaveChanges();
    }
}
