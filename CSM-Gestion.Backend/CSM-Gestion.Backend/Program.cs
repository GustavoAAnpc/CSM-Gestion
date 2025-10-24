using CSM_Gestion.Backend.Data;
using CSM_Gestion.Backend.Data.Interface;
using CSM_Gestion.Backend.Data.Repository;
using CSM_Gestion.Backend.Service.Interface;
using CSM_Gestion.Backend.Services.Impl;
using CSM_Gestion.Backend.Services.Interface;
using CSM_Gestion.Backend.Validators;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Agregar controladores
builder.Services.AddControllers();

// Configurar conexión a PostgreSQL
var connectionString = builder.Configuration.GetConnectionString("DataBase");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// Repositorios
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IAsociadoRepository, AsociadoRepository>();

// Servicios
builder.Services.AddScoped<IDateTimeProvider, DateTimeProvider>();
builder.Services.AddScoped<IAsociadoService, AsociadoService>();


builder.Services.AddControllers()
    .AddFluentValidation(config =>
    {
        config.RegisterValidatorsFromAssemblyContaining<FormularioAsociadoRequestValidator>();
    });

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();

var app = builder.Build();


app.UseHttpsRedirection();
app.UseAuthorization();


app.MapControllers();

app.Run();
