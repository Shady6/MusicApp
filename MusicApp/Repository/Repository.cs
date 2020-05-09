using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicApp.Repository
{
	public class Repository<T> : IRepository.IRepository<T> where T : class
	{
		public bool CreateAsync(T objToCreate)
		{
			throw new NotImplementedException();
		}
	}
}
