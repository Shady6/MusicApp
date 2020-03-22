using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicApp.Logic;
using MusicApp.Models;
using Newtonsoft.Json;

namespace MusicApp.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class MusicController : ControllerBase
    {
	    // GET: api/Music
        [HttpGet("{tracksToLoadAtOneTime:int}")]
        [Produces("application/json")]
        public async Task<IEnumerable<Track>> Get(int tracksToLoadAtOneTime)
        {
	        Track[] tracks = await Deezer.GetRandomTracksWrapperAsync(tracksToLoadAtOneTime);
	        return tracks;
        }
    }
}
