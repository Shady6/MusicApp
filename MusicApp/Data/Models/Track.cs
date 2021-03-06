﻿using System;
using System.ComponentModel.DataAnnotations;

namespace MusicApp.Data.Models
{
	public class Track
	{
		[Key]
		public int Id { get; set; }
		public string Title { get; set; }
		public int Duration { get; set; }
		public Artist Artist { get; set; }
		public string Preview { get; set; }
		public Album Album { get; set; }
		public User User { get; set; }
		public string ReleaseDate { get; set; }
		public long DeezerRank { get; set; }
		public string DeezerLink { get; set; }
		public float Bpm { get; set; }
	}
}
