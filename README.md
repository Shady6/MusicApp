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
![alt text](https://drive.google.com/file/d/1b7e-bb9Tp-vGXL7WBRnil7-YVOl8gwCb/preview "Home page")
![alt text](https://drive.google.com/file/d/1MSwDFjEAN3GUWGM2icG7Of2r_d9yJ12B/preview "Track list page")

### On mobile
![alt text](https://drive.google.com/file/d/1jTMktYimyxyy_UPLWwZ6iTnkqZJyk7-n/preview "Home page, overlay on track")
![alt text](https://drive.google.com/file/d/1W-wA9vzrihHKK3ciTB5MZ2s1wKN6QgSW/preview "Home page, like indicator")
![alt text](https://drive.google.com/file/d/1KBjPpP0Agu2dR82HMaG8QH7y4XWzkNwf/preview "Track list page")

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
type update-database and hit enter.
5. Run the project (F5)
