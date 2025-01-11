using MongoDB.Driver;
using RealTimeChat.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Read MongoDB connection string from appsettings.json
var mongoDbConnectionString = builder.Configuration.GetConnectionString("MongoDB");

// Configure MongoDB client with the connection string
builder.Services.AddSingleton<IMongoClient>(new MongoClient(mongoDbConnectionString));

// Add SignalR services
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:6501")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});
var app = builder.Build();

app.MapHub<ChatHub>("/chat");

app.UseCors();

app.Run();
