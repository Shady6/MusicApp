using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicApp.Models
{
	public class Track
	{
		public string Title { get; set; }
		public int Duration { get; set; }
		public Artist Artist { get; set; }
		public string Preview { get; set; }
		public Album Album { get; set; }

		public override string ToString()
		{
			return $"{Title} by {Artist.Name} Duration {Duration}";
		}

		//public override bool Equals(object obj)
		//{
		//	Track other = (Track) obj;
		//	return other.Title == Title && other.Duration == Duration && other.Artist == Artist;
		//}

	}
}
