# Hey-Liri

Objective:
LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

Slogan:
Who needs a SIRI when you have LIRI!

Resources Used:
- JS
- Node.JS
- OMBD NPM
- Spotify NPM
- Request NPM
- Bands in Town NPM

LIRI Commands:
* concert-this
* spotify-this-song
* movie-this
* do-what-it-says

Getting Set-up:
1) Clone repo
2) Run command 'npm install' in Terminal/GitBash
3) Run command 'node liri.js' followed by any command listed above  

How to Run a Command & Command Results:
1) Spotify
  Spotify command: node liri.js spotify-this-song <song name here>
  Spotify command will show the following information about the song in your terminal/bash window
    - Artist(s)
    - The song's name
    - A preview link of the song from Spotify
    - The album that the song is from
   
  ** If no song title is entered, then default will display ("The Sign", by Ace of Base)
  
2) Band in Town
  Band in Town Command: node liri.js concert-this <artist/band name here>
  Bands in Town command will show the following information about the artist/band in your terminal/bash window
    - Name of the Venue
    - Venue location
    - Date of the Event
    
3) OMBD
  OMBD Command: node liri.js movie-this <movie name here>
  OMBD command will show the following information about the movie in your in your bash/terminal
   - Title of the movie.
   - Year the movie came out.
   - IMDB Rating of the movie.
   - Rotten Tomatoes Rating of the movie.
   - Country where the movie was produced.
   - Language of the movie.
   - Plot of the movie.
   - Actors in the movie.
   
   ** If no movie title is entered, then default will display the data for "Mr. Nobody"
   
4) Do What It Says
  DWIS Command: node liri.js do-what-it-says
  LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

