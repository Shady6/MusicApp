using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MusicApp.Data.Models;

namespace MusicApp.Repository.IRepository
{
	public interface ITrackUserRepository
	{
		IEnumerable<TrackUser> GetTracksOfUser(string email);

		Task<int> CreateAsync(Track track, User user);
	}
}
