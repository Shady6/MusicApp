using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicApp.Data.Models;

namespace MusicApp.Controllers
{
    public class AccountController : Controller
	{
		private readonly IMapper _mapper;
		private readonly UserManager<User> _userManager;

		public AccountController(IMapper mapper, UserManager<User> userManager)
		{
			_mapper = mapper;
			_userManager = userManager;
		}

		[HttpGet]
	    public IActionResult Register()
	    {
		    return View();
	    }

	    [HttpPost]
	    [ValidateAntiForgeryToken]
	    public async Task<IActionResult> Register(UserRegister userModel)
	    {
		    if (!ModelState.IsValid)
			    return View(userModel);

		    var user = _mapper.Map<User>(userModel);

		    var result = await _userManager.CreateAsync(user, userModel.Password);
		    if (!result.Succeeded)
		    {
			    foreach (var error in result.Errors)
					if (error.Code != "DuplicateUserName")
						ModelState.TryAddModelError(error.Code, error.Description);

			    return View(userModel);
		    }

		    await _userManager.AddToRoleAsync(user, "application_user");

		    await SignInTheUserAsync(user);

		    return RedirectToAction("Index", "Home");
	    }

        [HttpGet]
	    public IActionResult Login()
	    {
		    return View();
	    }

	    [HttpPost]
	    [ValidateAntiForgeryToken]
	    public async Task<IActionResult> Login(UserLogin userModel)
	    {
		    if (!ModelState.IsValid)
			    return View(userModel);

		    var user = await _userManager.FindByEmailAsync(userModel.Email);
		    if (user != null &&
		        await _userManager.CheckPasswordAsync(user, userModel.Password))
		    {
				await SignInTheUserAsync(user);
				return RedirectToAction("Index", "Home");
			}
		    else
		    {
			    ModelState.AddModelError("", "Invalid Email or password.");
			    return View();
		    }
	    }

	    private async Task SignInTheUserAsync(User user)
	    {
		    var identity = new ClaimsIdentity(IdentityConstants.ApplicationScheme);
		    identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id));
		    identity.AddClaim(new Claim(ClaimTypes.Email, user.Email));

		    await HttpContext.SignInAsync(IdentityConstants.ApplicationScheme, new ClaimsPrincipal(identity));
	    }
    }
}