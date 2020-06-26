using Newtonsoft.Json;

namespace MusicApp.Data.Dto.Models
{
	public class ArtistDto
	{
		[JsonProperty("Name")]
		public string Name { get; set; }
	}
}
