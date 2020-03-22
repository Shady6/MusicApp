using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Pipes;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MusicApp.Logic
{
	public static class HttpGetter
	{
		public static async Task<T> GetAsync<T>(string uri)
		{
			HttpWebRequest request = (HttpWebRequest) WebRequest.Create(uri);

			using (HttpWebResponse response = (HttpWebResponse)await request.GetResponseAsync())
			{
				T result = default(T);

				if (response.StatusCode == HttpStatusCode.OK)
				{
					using (Stream dataStream = response.GetResponseStream())
					{
						StreamReader sr = new StreamReader(dataStream);

						result = JsonConvert.DeserializeObject<T>(await sr.ReadToEndAsync());
					}

					return result;
				}

				throw new WebException($"Return code was not OK it was : ${response.StatusDescription}");
			}
		}

		public static T Get<T>(string uri)
		{
			HttpWebRequest request = (HttpWebRequest) WebRequest.Create(uri);
			HttpWebResponse response = (HttpWebResponse) request.GetResponse();

			T result = default(T);

			if (response.StatusCode == HttpStatusCode.OK)
			{
				using (Stream dataStream = response.GetResponseStream())
				{
					StreamReader sr = new StreamReader(dataStream);

					result = JsonConvert.DeserializeObject<T>(sr.ReadToEnd());
				}

				response.Close();
				return result;
			}

			response.Close();
			throw new WebException($"Return code was not OK it was : ${response.StatusDescription}");
		}
	}
}
