namespace MusicApp.Data.Dto.Models
{
	public class TrackDto
	{
		public string Title { get; set; }
		public int Duration { get; set; }
		public ArtistDto Artist { get; set; }
		public string Preview { get; set; }
		public AlbumDto Album { get; set; }
	}
}
