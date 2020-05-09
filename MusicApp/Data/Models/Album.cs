using System.ComponentModel.DataAnnotations;

namespace MusicApp.Data.Models
{
	public class Album
	{
		[Key]
		public int Id { get; set; }
		public string Title { get; set; }
		public string Cover_Big { get; set; }
	}
}