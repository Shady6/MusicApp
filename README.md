# Video Showcase
 [https://www.youtube.com/watch?v=lp6_trzQn78](https://www.youtube.com/watch?v=lp6_trzQn78)
# MusicApp - what is it about?
MusicApp is a web application which purpose is
to let you to listen and discover new music. It is similar to Tinder
but you're matching with songs! You can like or dislike
randomly picked music tracks and if liked, they'll be
displayed in a subpage. There is no algorithm which would
show you songs based on what you've already liked so you can
freely explore the world of music.

# Features of the application
* Listen to 30 seconds preview of every song or go to one of 5 links which in most cases will provide full length audio
* Tracks you've liked are stored in the database
* No need to register and login - your favorite tracks won't be lost unless you'll clear the cookie 
* Being logged in allows you to view your liked songs no matter which browser you use
* Pagination controls and filtering methods to allow you to quickly find your way in all of the songs you've liked
* Full mobile and touch controls support

# Where is the music taken from?
All the songs which you'll encounter on the website are fetched from [Deezer API](https://developers.deezer.com/api).  

# Screenshots
### On desktop
![Home page](/Screenshots%20Showcase/pc_home.png?raw=true "Home page")
![Track list page](/Screenshots%20Showcase/pc_tracklist.png?raw=true "Track list page")

### On mobile
![Home page, overlay on track](/Screenshots%20Showcase/mobile_home1.png?raw=true "Mobile home page with overlay on track")
![Home page, like indicator](/Screenshots%20Showcase/mobile_home2.png?raw=true "Mobile home page while swiping track")
![Track list page](/Screenshots%20Showcase/mobile_tracklist.png?raw=true "Mobile track list page")

# How to run it?

### Prerequisites
In order to run the application you'll need to have the following installed
* .NET Core 3.1
* Microsoft SQL Server
* Visual Studio

### Starting the project
1. Clone this repository to desired location ```git@github.com:Shady6/MusicApp.git```
2. Open the project in Visual Studio
3. In appsettings.json change value of DefaultConnection to your connection string
4. In Visual Studio open Package Manager Console (Tools -> NuGet Package Manager -> Package Manager Console)  
type ```update-database``` and hit enter.
5. Run the project (F5)
