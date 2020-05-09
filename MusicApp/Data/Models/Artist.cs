using System.ComponentModel.DataAnnotations;

namespace MusicApp.Data.Models
{
	public class Artist
	{
		[Key]
		public int Id { get; set; }
		public string Name { get; set; }
	}
}
