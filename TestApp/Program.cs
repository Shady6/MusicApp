using System;
using System.Dynamic;
using System.IO;
using System.Net;
using Newtonsoft.Json;

namespace TestApp
{
	class Program
	{
		static void Main(string[] args)
		{
			//Get();
		}



		public static string Get()
		{
			HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://api.deezer.com/track/3135556");

			HttpWebResponse response = (HttpWebResponse)request.GetResponse();

			Console.WriteLine(response.StatusCode);

			using (Stream dataStream = response.GetResponseStream())
			{
				StreamReader str = new StreamReader(dataStream);

				Track track = JsonConvert.DeserializeObject<Track>(str.ReadToEnd());

				Console.WriteLine(track);
			}

			response.Close();

			return "hello";
		}
	}

	public class Track
	{
		public string title { get; set; }
		public int duration { get; set; }
		public Artist artist { get; set; }

		public override string ToString()
		{
			return $"{title} by {artist.name} duration {duration}";
		}
	}

	public class Artist
	{
		public string name { get; set; }
	}
}
