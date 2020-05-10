using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MusicApp.Data.Dto.Models;
using MusicApp.Data.Models;
using MusicApp.Repository.IRepository;

namespace MusicApp.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrackController : ControllerBase
    {
	    private readonly ITrackUserRepository _trackUserRepo;
	    private readonly IMapper _mapper;
	    private readonly UserManager<User> _userManager;

	    public TrackController(IMapper mapper, ITrackUserRepository trackUserRepo)
	    {
		    _mapper = mapper;
		    _trackUserRepo = trackUserRepo;
	    }

	    [HttpPost]
	    public async Task<int> AddTrack([FromForm] TrackDto trackDto)
	    {
		    Track track = _mapper.Map<Track>(trackDto);
		    User currentUser = await _userManager.GetUserAsync(User);

		    return await _trackUserRepo.CreateAsync(track, currentUser);
	    }
    }
}