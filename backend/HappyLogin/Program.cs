using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using HappyLogin.Data;
using Serilog;
using HappyLogin.Configuration;

var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration()
    .WriteTo.File("logs/log-.txt", rollingInterval: RollingInterval.Day)
    .Enrich.FromLogContext()
    .CreateLogger();

builder.Host.UseSerilog();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
    throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(connectionString));

var emailSettings = builder.Configuration.GetSection("EmailSettings").Get<EmailSettings>();

builder.Services.AddSingleton(new EmailService(
    smtpServer: emailSettings.SmtpServer,
    smtpPort: emailSettings.SmtpPort,
    smtpUser: emailSettings.SmtpUser,
    smtpPass: emailSettings.SmtpPass
));

builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "HappyLogin", Version = "v1" });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "HappyLogin v1"));
}

app.UseCors(builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
});

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run();
