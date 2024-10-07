namespace backend;

public class Club
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string LogoUrl { get; set; }
    public required string Code { get; set; }
    public ICollection<Player> Players { get; set; }
}