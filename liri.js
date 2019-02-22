//require in our packages
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
//log users command line arguments
arg1 = process.argv[2];
arg2 = process.argv[3];
//check if user inputs spotify-this-song or movie-this or cocnert-this run their respective code if true 
if(arg1 === "spotify-this-song"){
    //check if user inputs a song with more than one word
    let songName = "";
    songName += arg2;
    let i = 4;
    while(process.argv[i] !== undefined){
        songName += " ";
        songName += process.argv[i];
        i++
    }
    //====================================================
    var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
    });
    
    spotify
        .search({ type: 'track', query: songName })
    .then(function(data) {
        console.log("__________________________")
        console.log("--------Artist(s)---------")
        console.log("==========================")
        console.log(data.tracks.items[0].album.artists[0].name);
        console.log("__________________________")
        console.log("--------Song Name---------")
        console.log("==========================")
        console.log(data.tracks.items[0].name);
        console.log("__________________________")
        console.log("Preview link ((Ctrl/Command)-Click to listen)")
        console.log("==========================")
        console.log(data.tracks.items[0].preview_url);
        console.log("__________________________")
        console.log("--------Album name--------")
        console.log("==========================")
        console.log(data.tracks.items[0].album.name);
        
        
    })
    .catch(function(err) {
        console.error('Error occurred: ' + err); 
    });
}else if(arg1 === "concert-this"){
    //check if user inputs a band/artist(s) with more than one word
    let band = "";
    band += arg2;
    let i = 4;
    while(process.argv[i] !== undefined){
        band += "+";
        band += process.argv[i];
        i++
    }
    axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp").then(
        function(response) {
            let concertNum = 1;
            for(j = 0; j < response.data.length; j++){
                
                console.log(">>>>>>>CONCERT " + concertNum + "/" + response.data.length + "<<<<<<<")
                console.log("Venue Name: " + response.data[j].venue.name);
                console.log("Location: " + response.data[j].venue.city + ", " + response.data[0].venue.country);
                console.log("Date: " +  moment(response.data[j].datetime).format("MM/DD/YYYY"));
                console.log("=======================")
                concertNum++
            }
        });
}else if(arg1 === "movie-this"){
    //check if user inputs a movie with more than one word
    let movie = "";
    movie += arg2;
    let i = 4;
    while(process.argv[i] !== undefined){
        movie += "+";
        movie += process.argv[i];
        i++
    }
    axios.get("http://www.omdbapi.com/?t=" + movie + " &y=&plot=short&apikey=trilogy").then(
        function(response) {
            console.log("-------------------Title of the movie-------------------------")
            console.log("==============================================================")
            console.log(response.data.Title);
            console.log("______________________________________________________________")
            console.log("-----------------Year the movie came out----------------------")
            console.log("==============================================================")
            console.log(response.data.Year);
            console.log("______________________________________________________________")
            console.log("-----------------IMDB Rating of the movie---------------------")
            console.log("==============================================================")
            console.log(response.data.imdbRating);
            console.log("______________________________________________________________")
            console.log("-----------Rotten Tomatoes Rating of the movie----------------")
            console.log("==============================================================")
            console.log(response.data.Ratings[1].Value);
            console.log("______________________________________________________________")
            console.log("----------Country where the movie was produced----------------")
            console.log("==============================================================")
            console.log(response.data.Country);
            console.log("______________________________________________________________")
            console.log("------------------Language of the movie-----------------------")
            console.log("==============================================================")
            console.log(response.data.Language);
            console.log("______________________________________________________________")
            console.log("--------------------Plot of the movie-------------------------")
            console.log("==============================================================")
            console.log(response.data.Plot);
            console.log("______________________________________________________________")
            console.log("-------------------Actors in the movie------------------------")
            console.log("==============================================================")
            console.log(response.data.Actors);
            console.log("______________________________________________________________")
        });
}