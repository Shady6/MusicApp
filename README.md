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
![alt text](https://lh5.googleusercontent.com/mBrHXVdwpsj6VFkF0cXnM4cFzREzAI8_SapmhXlRPdNiAQk_sscyi7rkb190GPLmSjixp2QDBmTLRplUuQDY=w1960-h3478-rw "Home page")
![alt text](https://lh6.googleusercontent.com/hl_afqyg78Alc4v0Zl9UI1KS-Y2a4RJMclisCNSRgZyUWKEvUF9UMnEHIe2EYJS8WZNyxGzWEMFgSyyCL-7I=w1920-h969-rw "Track list page")

### On mobile
![alt text](https://lh5.googleusercontent.com/mf7CPPFiuMtRICH0IDIk40juwT8JALsrE0ynWlD-LCfX4aUzSBCfcHRqcalAMau3KpR10ydH_aUI2xn9rlSc=w1259-h969 "Home page, overlay on track")
![alt text](https://lh3.googleusercontent.com/gqkt9F9p7oLy0SWEfv1qBmmxHXgBHIqGFuHNDnj9CZYG-KWkmL67uhfY0WdnkOo_YZ-225a2leTs8hVfIr7t=w1920-h969 "Home page, like indicator")
![alt text](https://lh3.googleusercontent.com/kQ2kTe5MvZgBeHxL0I_DUyzkD0dmUGAQIQ5jTrH6hBMvTXOMrblgM9SV9Qd9jJOEkgXvZf5RAJ3VN2XjqbQv=w1259-h969 "Track list page")

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
