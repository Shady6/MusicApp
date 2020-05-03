using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MusicApp.Data.Models;

namespace MusicApp.Data
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<UserRegister, User>()
				.ForMember(u => u.UserName, options => options.MapFrom(x => x.Email));
		}
	}
}
