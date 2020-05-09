using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MusicApp.Data.Dto.Models;
using MusicApp.Data.Models;

namespace MusicApp.Mappings
{
	public class MusicAppMappings : Profile
	{
		public MusicAppMappings()
		{
			CreateMap<Artist, ArtistDto>().ReverseMap();
			CreateMap<Album, AlbumDto>().ReverseMap();
			CreateMap<Track, TrackDto>().ReverseMap();
		}
	}
}
