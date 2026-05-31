using EmployeeApi.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddSingleton<EmployeeService>();


var app = builder.Build();



app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.MapControllers();



app.Run();