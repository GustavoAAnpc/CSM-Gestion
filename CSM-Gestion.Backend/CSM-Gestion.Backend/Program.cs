using CSM_Gestion.Backend.Data;
using CSM_Gestion.Backend.Data.Interface;
using CSM_Gestion.Backend.Data.Repository;
using CSM_Gestion.Backend.Data.UnitOfWork;
using CSM_Gestion.Backend.Service.Interface;
using CSM_Gestion.Backend.Services.Impl;
using CSM_Gestion.Backend.Services.Interface;
using CSM_Gestion.Backend.Validators;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Configurar conexión a PostgreSQL
var connectionString = builder.Configuration.GetConnectionString("DataBase");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// Repositorios
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IAsociadoRepository, AsociadoRepository>();
builder.Services.AddScoped<IHijoRepository, HijoRepository>();
builder.Services.AddScoped<IConyugeRepository, ConyugeRepository>();
builder.Services.AddScoped<IAdministradorRepository, AdministradorRepository>();

// Servicios
builder.Services.AddScoped<IDateTimeProvider, DateTimeProvider>();
builder.Services.AddScoped<IAsociadoService, AsociadoService>();
builder.Services.AddScoped<ILoginService, LoginService>();

// Fluent Validation
builder.Services.AddControllers()
    .AddFluentValidation(config =>
    {
        config.RegisterValidatorsFromAssemblyContaining<FormularioAsociadoRequestValidator>();
    });

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();

//CORS para permitir llamadas desde React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

builder.Services.AddAuthorization();
var app = builder.Build();

//Configuracion CORS
app.UseCors("AllowAll");

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
