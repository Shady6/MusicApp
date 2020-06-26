using System.Reflection;
using Newtonsoft.Json;

namespace MusicApp.Data.Dto.Models
{

	public class TrackDto
	{
		[JsonProperty("Title")]
		public string Title { get; set; }
		[JsonProperty("Duration")]
		public int Duration { get; set; }
		[JsonProperty("Artist")]
		public ArtistDto Artist { get; set; }
		[JsonProperty("Preview")]
		public string Preview { get; set; }
		[JsonProperty("Album")]
		public AlbumDto Album { get; set; }
		[JsonProperty("Release_date")]
		public string ReleaseDate { get; set; }
		[JsonProperty("Rank")]
		public long DeezerRank { get; set; }
		[JsonProperty("Link")]
		public string DeezerLink { get; set; }
		[JsonProperty("Bpm")]
		public float Bpm { get; set; }
	}
}
