using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MusicApp.Data;
using MusicApp.Data.Dto.Models;
using MusicApp.Data.Models;

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

	    [HttpPost]
	    public async Task<int> AddTrack([FromBody] TrackDto trackDto)
	    {
		    Track track = _mapper.Map<Track>(trackDto);
		    track.User = await _userManager.GetUserAsync(User);
		    _db.Tracks.Add(track);
		    return await _db.SaveChangesAsync();
	    }
    }
}