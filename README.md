# Chemistry Faculty CMS - Mock Project

A **mock/educational project** demonstrating what a Content Management System for the Universidad de la Republica (UDELAR) Chemistry Faculty homepage could look like, built with ASP.NET, Clean Architecture, Entity Framework, and SQLite.

**Important**: This is NOT a real production system. It's a learning exercise/mockup to explore how to combine ASP.NET with React for a faculty website redesign.

## Overview

This project is a conceptual redesign of what the Chemistry Faculty website could look like with a full-featured CMS backend. It allows administrators to manage content such as news, announcements, events, and departmental information through a web-based admin panel.

The goal is to explore modern web development techniques and provide a foundation for learning Clean Architecture with .NET.

## Architecture

The solution follows **Clean Architecture** principles with four distinct layers:

```
Universidad.sln
├── Universidad.Domain/          # Core business entities and interfaces
├── Universidad.Application/    # (Reserved for application services)
├── Universidad.Infrastructure/    # Data access and repository implementations
└── Universidad.Web/             # ASP.NET Core Web API + React Frontend
```

### Technology Stack

- **Backend**: ASP.NET Core 8.0
- **ORM**: Entity Framework Core
- **Database**: SQLite
- **Authentication**: Cookie-based authentication
- **Frontend**: React (integrated as a SPA within ASP.NET Core)

## Domain Entities

The core domain model includes:

- **Content**: Web content with title, rich HTML body, optional image, creation date, and content type
- **User**: System users with name, last name, email, and password hash
- **Group**: Organizational groups (departments, committees, etc.) that can contain users and content
- **UserGroup**: Many-to-many relationship between users and groups

## Getting Started

### Prerequisites

- .NET 8.0 SDK
- Node.js (for frontend development)
- A modern web browser

### Running the Project

```bash
# Restore dependencies
dotnet restore

# Run the application
dotnet run --project Universidad.Web
```

The application will be available at `http://localhost:5000`

### Database

The SQLite database is automatically created on first run at `Universidad.Web/university.db`.

## Purpose

This is an educational/mock project to learn:

- Clean Architecture patterns in .NET
- Entity Framework with SQLite
- Building a CMS from scratch
- Integrating React with ASP.NET Core

It is NOT intended for production use and has not been security-audited or tested for real-world deployment.

## License

MIT