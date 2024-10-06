using System.Text.Json;
using backend;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddHttpClient();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());


_ = Task.Run(() => PrepareDatabase(app));

app.MapGet("/clubs", async (AppDbContext db) => await db.Clubs.ToListAsync());

app.MapGet("/clubs/{id}", async (int id, AppDbContext db) =>
    await db.Clubs.FindAsync(id));

app.MapGet("/clubs/{id}/players", async (int id, AppDbContext db) =>
    await db.Players.Where(p => p.ClubId == id).ToListAsync());



await app.RunAsync();


async Task PrepareDatabase(WebApplication app)
{
    using var scope = app.Services.CreateScope();
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AppDbContext>();
    var httpClientFactory = services.GetRequiredService<IHttpClientFactory>();

    try
    {
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();
        await SeedDataAsync(context, httpClientFactory);
        Console.WriteLine("Seeding completed successfully.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"An error occurred during seeding: {ex.Message}");
    }
}



async Task SeedDataAsync(AppDbContext context, IHttpClientFactory httpClientFactory)
{
        using var client = httpClientFactory.CreateClient();

        var apiKey = Environment.GetEnvironmentVariable("FOOTBALL_API_KEY");
        if (string.IsNullOrEmpty(apiKey))
        {
            throw new Exception("FOOTBALL_API_KEY environment variable is not set");
        }

        client.DefaultRequestHeaders.Add("x-rapidapi-key", apiKey);
        client.DefaultRequestHeaders.Add("x-rapidapi-host", "v3.football.api-sports.io");

        int leagueId = 39; // Premier League
        int season = 2024;


        var teamsResponse =
            await client.GetAsync($"https://v3.football.api-sports.io/teams?league={leagueId}&season={season}");
        var teamsJson =
            await JsonSerializer.DeserializeAsync<JsonElement>(await teamsResponse.Content.ReadAsStreamAsync());

        foreach (var teamData in teamsJson.GetProperty("response").EnumerateArray())
        {
            var team = new Club
            {
                Name = teamData.GetProperty("team").GetProperty("name").GetString(),
                LogoUrl = teamData.GetProperty("team").GetProperty("logo").GetString()
            };
            context.Clubs.Add(team);
        }

        await context.SaveChangesAsync();
        
        // Fetch players
        var page = 1;
        int totalPages = 10;

        do
        {
            var playersResponse =
                await client.GetAsync(
                    $"https://v3.football.api-sports.io/players?league={leagueId}&season={season}&page={page}");
            var playersJson =
                await JsonSerializer.DeserializeAsync<JsonElement>(await playersResponse.Content.ReadAsStreamAsync());

            //totalPages = playersJson.GetProperty("paging").GetProperty("total").GetInt32();

            foreach (var playerData in playersJson.GetProperty("response").EnumerateArray())
            {
                var player = new Player
                {
                    FirstName = playerData.GetProperty("player").GetProperty("firstname").GetString() ?? "N/A",
                    LastName = playerData.GetProperty("player").GetProperty("lastname").GetString() ?? "N/A",
                    ApiId = playerData.GetProperty("player").GetProperty("id").GetInt64(),
                    Position = playerData.GetProperty("statistics")[0].GetProperty("games").GetProperty("position")
                        .GetString() ?? "N/A",
                    PhotoUrl = playerData.GetProperty("player").GetProperty("photo").GetString() ?? "N/A",
                    BirthDate = DateTime.TryParse(
                        playerData.GetProperty("player").GetProperty("birth").GetProperty("date").GetString(),
                        out var birthDate)
                        ? birthDate
                        : DateTime.MinValue,
                    ClubId = context.Clubs.FirstOrDefault(c =>
                        c.Name == playerData.GetProperty("statistics")[0].GetProperty("team").GetProperty("name")
                            .GetString())?.Id ?? 1
                };
                
                context.Players.Add(player);
            }

            await context.SaveChangesAsync();
            page++;

        } while (page <= totalPages);
    
}