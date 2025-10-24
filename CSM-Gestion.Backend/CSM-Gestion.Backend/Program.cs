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

builder.Services.AddControllers();

//DbContext PostGresSql
var connectionString = builder.Configuration.GetConnectionString("DataBase");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));
//Repositorios
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IAsociadoRepository, AsociadoRepository>();

//Services
builder.Services.AddScoped<IDateTimeProvider, DateTimeProvider>();
builder.Services.AddScoped<IAsociadoService, AsociadoService>();

builder.Services.AddControllers()
    .AddFluentValidation(config =>
    {
        config.RegisterValidatorsFromAssemblyContaining<FormularioAsociadoRequestValidator>();
    });

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
