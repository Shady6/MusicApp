using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Threading.Tasks;
using MusicApp.Data.Dto.Models;
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
		public static async Task<TrackDto[]> GetRandomTracksWrapperAsync(int tracksCount)
		{
			TrackDto[] tracksDto = await GetRandomTracksAsync(tracksCount);

			for (int i = 0; i < tracksDto.Length; i++)
			{
				while (String.IsNullOrEmpty(tracksDto[i].Preview))
					tracksDto[i] = await HttpGetter.GetAsync<TrackDto>(trackUri + "/" + rnd.Next(minVal, maxVal));
			}

			return tracksDto;
		}
		public static async Task<TrackDto[]> GetRandomTracksAsync(int tracksCount)
		{
			
			List<Task<TrackDto>> tracks = new List<Task<TrackDto>>();

			for (int i = 0; i < tracksCount; i++)
				tracks.Add(HttpGetter.GetAsync<TrackDto>(trackUri + "/" + rnd.Next(minVal, maxVal)));
			
			return await Task.WhenAll(tracks);
		}
	}
}
