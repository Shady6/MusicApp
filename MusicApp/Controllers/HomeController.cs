using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MusicApp.Data;
using MusicApp.Data.Models;
using MusicApp.Logic;
using Newtonsoft.Json;

namespace MusicApp.Controllers
{
	public class HomeController : Controller
	{
		private readonly IHttpContextAccessor _httpContextAccessor;
		private readonly UserManager<User> _userManager;
		private readonly SignInManager<User> _signInManager;
		private readonly ApplicationDbContext _db;

		public HomeController(ILogger<HomeController> logger, IHttpContextAccessor httpContextAccessor,
			UserManager<User> userManager, SignInManager<User> signInManager, ApplicationDbContext db)
		{
			_httpContextAccessor = httpContextAccessor;
			_userManager = userManager;
			_signInManager = signInManager;
			_db = db;
		}

		public async Task<IActionResult> Index()
		{
			string GuestId = _httpContextAccessor.HttpContext.Request.Cookies["GuestId"];
			if (!String.IsNullOrEmpty(GuestId) && !_httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
			{
				User guestToSignIn = _db.Users.Single(u => u.Id == GuestId);
				await _signInManager.SignInAsync(guestToSignIn, true);
			}
			else if (!_httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
			{
				User guestUser = new User();
				guestUser.Email = guestUser.Id + "@guest.com";
				guestUser.UserName = guestUser.Id + "_UserName";

				IdentityResult userResult = await _userManager.CreateAsync(guestUser, "abc!@#123MkO77");
				await _userManager.AddToRoleAsync(guestUser, "guest");
				await _signInManager.SignInAsync(guestUser, true);

				Response.Cookies.Append("GuestId", guestUser.Id);
			}
			return View();
		}
	}
}
