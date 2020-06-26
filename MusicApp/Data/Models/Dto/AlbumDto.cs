using Newtonsoft.Json;

namespace MusicApp.Data.Dto.Models
{
	public class AlbumDto
	{
		[JsonProperty("Title")]
		public string Title { get; set; }
		[JsonProperty("Cover_Big")]
		public string Cover_Big { get; set; }
	}
}