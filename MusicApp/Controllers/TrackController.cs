using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicApp.Data;
using MusicApp.Data.Models;

namespace MusicApp.Controllers
{
    public class TrackController : Controller
    {
	    private readonly ApplicationDbContext _db;
	    private readonly UserManager<User> _userManager;

	    public TrackController(ApplicationDbContext db, UserManager<User> userManager)
	    {
		    _db = db;
		    _userManager = userManager;
	    }

	    public async Task<IActionResult> Index()
	    {
		    User currentUser = await _userManager.GetUserAsync(User);
		    List<Track> favoriteTracks = _db.Tracks.Include(t => t.Album)
			    .Include(t => t.Artist)
			    .Where(t => t.User == currentUser).ToList();
		    ViewBag.FavoriteTracks = favoriteTracks;

            return View();
        }
    }
}