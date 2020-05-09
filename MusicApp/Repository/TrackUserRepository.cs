using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MusicApp.Data;
using MusicApp.Data.Models;
using MusicApp.Repository.IRepository;

namespace MusicApp.Repository
{
	public class TrackUserRepository : ITrackUserRepository
	{
		private readonly ApplicationDbContext _db;

		public TrackUserRepository(ApplicationDbContext db)
		{
			_db = db;
		}

		public IEnumerable<TrackUser> GetTracksOfUser(string email)
		{
			throw new NotImplementedException();
		}

		public async Task<int> CreateAsync(Track track, User user)
		{
			_db.TrackUsers.Add(new TrackUser
			{
				Track = track,
				User = user
			});
			return await _db.SaveChangesAsync();
		}
	}
}
