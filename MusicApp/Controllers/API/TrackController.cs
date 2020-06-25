using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicApp.Data;
using MusicApp.Data.Dto.Models;
using MusicApp.Data.Models;
using Newtonsoft.Json;

namespace MusicApp.Controllers.API
{
	[Route("api/[controller]")]
	[ApiController]
	public class TrackController : ControllerBase
	{
		private readonly IMapper _mapper;
		private readonly UserManager<User> _userManager;
		private readonly ApplicationDbContext _db;

		public TrackController(IMapper mapper, UserManager<User> userManager, ApplicationDbContext db)
		{
			_mapper = mapper;
			_userManager = userManager;
			_db = db;
		}

		[HttpGet]
		public async Task<string> GetAllTracks()
		{
			List<Track> userTracks = _db.Tracks.Where(t => t.User.UserName == User.Identity.Name)
				.Include(t => t.Album)
				.Include(t => t.Artist)
				.ToList();

			return JsonConvert.SerializeObject(userTracks);
		}

		[HttpPost]
		public async Task<int> AddTrack([FromBody] TrackDto trackDto)
		{
			Track track = _mapper.Map<Track>(trackDto);
			track.User = await _userManager.GetUserAsync(User);

			if (_db.Tracks.SingleOrDefault(t => t.Title == track.Title && t.User == track.User) == null)
			{
				_db.Tracks.Add(track);
				return await _db.SaveChangesAsync();
			}
			return -1;
		}

		[HttpDelete]
		public async Task<int> DeleteTrack([FromBody]TrackDto track)
		{
			Track trackToRemove = _db.Tracks.Single(t =>
				t.Title == track.Title && t.User.UserName == User.Identity.Name);

			_db.Tracks.Remove(trackToRemove);
			return await _db.SaveChangesAsync();
		}
	}
}