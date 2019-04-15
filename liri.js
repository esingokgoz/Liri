var dotenv = require("dotenv").config();

var keys = require("./keys.js");

//fs
var fs = require("fs");

//Spotify
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

//request
var request = require("request");
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");

//user command one of the following options: concert-this, spotify-this-song, movie-this, do-what-it-says
var liriCommand = process.argv[2]

//user request is the process.argv 3 that is entered by the user. song name, movie name, band name etc
var userRequest = process.argv.splice(3, process.argv.length + 1).toString().replace(/,/g / '');



//switch cases for user commands
switch (liriCommand) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        DoIt();
        break;
}

//bands in town function
function concertThis() {
    var artist = userRequest;
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log(response.data[0].venue);
            // for (let i = 0; i <= 3; i++) {
            //     console.log(response.data[i]);
            // }
        });
}


//spotify function
function spotifyThisSong() {

    //spotify url
    // var spotfyURL = "https://api.spotify.com/v1/search";

    // spotify.search({type: "track", query: process.argv[3], limit: 2 }, function(err, data) {
    //     if(err) {
    //         return console.log("Error occured! " + err)
    //     }

    //     var source = data.tracks.items;
    //     for (var i = 0; i < source.length; i++){
    //         console.log("Artist(s): " + source[i].album.artists[i].name); //prints the artist name
    //         console.log("The song's name: " + source[i].name); //prints the song name
    //         console.log("The album that the sing is from: " + source[i].album.name); //prints the album name
    //         console.log("A preview link of the song from Spotify: " + source[i].album.artists[i].external_urls.spotify); //prints the url of the song
    //     }

    // });


    //if the user input is null, then play the default song "The Sign"
    if (!userRequest) {
        userRequest: "The Sign";

    };
    //search spotify based on track
    //reassign process.argv[3]
    songRequest = userRequest;
    spotify.search({
        type: "track",
        query: songRequest,
    },
        function (err, data) {
            if (err) {
                console.log(err);
            } else {
                //if no error, display the results
                var trackInfo = data.tracks.items;
                //display 5 results related to the user input
                for (var i = 0; i < 5; i++) {
                    if (trackInfo[i] != undefined) {
                        var spotifyResults =
                            "Artist: " + trackInfo[i].artists[0].name + "\n" +
                            "The song's name: " + trackInfo[i].name + "\n" +
                            "A preview link of the song from Spotify: " + trackInfo[i].preview_url + "\n" +
                            "The albul that the song is from: " + trackInfo[i].album.name;

                        console.log("___________________________");
                        console.log(spotifyResults);
                        console.log("___________________________");
                    };
                };
            }
        }
    )
}

//movie-this function
function movieThis() {

    //if no user input, display default
    if (!userRequest) {
        userRequest = "mr nobody";
        console.log("If you haven't watched 'Mr. Nobody,' then you should: ")
        console.log("It's on Netflix!")
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + userRequest + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (err, response, body) {
        //if no error
        if (!err && response.statusCode === 200) {
            var movieData = JSON.parse(body);

            //get object data
            var queryUrlResults =
                "Title: " + movieData.Title + "\n" +
                "Year: " + movieData.Year + "\n" +
                "IMDB Rating: " + movieData.Ratings[0].Value + "\n" +
                "Rotten Tomatoes Rating: " + movieData.Ratings[1].Value + "\n" +
                "Country: " + movieData.Country + "\n" +
                "Language: " + movieData.Language + "\n" +
                "Plot: " + movieData.Plot + "\n" +
                "Actors: " + movieData.Actors;

            console.log("______________________");
            console.log(queryUrlResults);
            console.log("______________________");

        } 
        else {
            console.log(err);
        }

    });
}

//do what it says function
function DoIt() {
    //read random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {

        //split it into two, option and parameter
        var dataArray = data.split(",");
        var option = (dataArray[0]);
        var parameter = (dataArray[1]);
        // console.log(option, parameter)

        if (error) {
            console.log(error);
        }
        else if (option == "movie-this") {
            userRequest = parameter;
            movieThis()
        }
        else if (option = "spotify-this-song") {
            userRequest = parameter;
            spotifyThisSong()
        }
        else {
            concertThis()
        }
    });
}