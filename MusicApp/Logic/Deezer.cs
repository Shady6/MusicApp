using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Threading.Tasks;
using MusicApp.Data.Models;

namespace MusicApp.Logic
{
	public static class Deezer
	{
		private static readonly string uri = "https://api.deezer.com";
		private static readonly string trackUri = uri + "/track";
		private static readonly Random rnd = new Random();
		private static readonly int minVal = 999999;
		private static readonly int maxVal = 99999999;

		// this wrappers is needed because with GetRandomTracksAsync you dont always get full list of tracks, some may be null
		public static async Task<Track[]> GetRandomTracksWrapperAsync(int tracksCount)
		{
			Track[] tracks = await GetRandomTracksAsync(tracksCount);

			for (int i = 0; i < tracks.Length; i++)
			{
				while (tracks[i].Preview == null || tracks[i].Preview == "")
					tracks[i] = await HttpGetter.GetAsync<Track>(trackUri + "/" + rnd.Next(minVal, maxVal));
			}

			return tracks;
		}
		public static async Task<Track[]> GetRandomTracksAsync(int tracksCount)
		{
			
			List<Task<Track>> tracks = new List<Task<Track>>();

			for (int i = 0; i < tracksCount; i++)
				tracks.Add(HttpGetter.GetAsync<Track>(trackUri + "/" + rnd.Next(minVal, maxVal)));
			
			return await Task.WhenAll(tracks);
		}
	}
}
