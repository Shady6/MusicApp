using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MusicApp.Data.Models
{
	public class TrackUser
	{
		[Key]
		public int Id { get; set; }
		public Track Track { get; set; }
		public User User { get; set; }
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public DateTime DateAdded { get; set; }
	}
}
