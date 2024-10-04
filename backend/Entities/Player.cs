namespace backend;
public class Player
{
    public int Id { get; set; }
    public long ApiId { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Position { get; set; }
    public required string PhotoUrl { get; set; }
    public required DateTime BirthDate { get; set; }
    public int ClubId { get; set; }
    public Club Club { get; set; }
}