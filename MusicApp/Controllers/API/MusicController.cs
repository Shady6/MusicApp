using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicApp.Data.Dto.Models;
using MusicApp.Data.Models;
using MusicApp.Logic;
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
        public async Task<IEnumerable<TrackDto>> Get(int tracksToLoadAtOneTime)
        {
	        TrackDto[] tracksDto = await Deezer.GetRandomTracksWrapperAsync(tracksToLoadAtOneTime);
	        return tracksDto;
        }
    }
}
