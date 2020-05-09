using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MusicApp.Data.Models;

namespace MusicApp.Repository.IRepository
{
	public interface IRepository<T> where T : class
	{
		bool CreateAsync(T objToCreate);
	}
}
