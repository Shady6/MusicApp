using System.Reflection;
using Newtonsoft.Json;

namespace MusicApp.Data.Dto.Models
{

	public class TrackDto
	{
		public string Title { get; set; }
		public int Duration { get; set; }
		public ArtistDto Artist { get; set; }
		public string Preview { get; set; }
		public AlbumDto Album { get; set; }
		[JsonProperty("release_date")]
		public string ReleaseDate { get; set; }
		[JsonProperty("rank")]
		public long DeezerRank { get; set; }
		[JsonProperty("link")]
		public string DeezerLink { get; set; }
		public float Bpm { get; set; }
	}
}
