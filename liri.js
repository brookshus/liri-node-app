require("dotenv").config();

//per instructions
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
//added to format table 
//var cTable = require('console.table');
var request = require('request');
var moment = require('moment');


//add spotify api information
var spotify = new Spotify(keys.spotify);


//take user command using process.argv

if (process.argv[2] == 'concert-this' ) {
   
    var artist = process.argv.slice(3).join(" ")
    console.log(artist);

   //access bandintown for searching with variable created from user input

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=0fc0d0357bf95720a380692e21e65342";

    request(queryURL, function (error, response, body) {
        if (error) console.log(error);
        var result  =  JSON.parse(body)[0];
        console.log("Venue name " + result.venue.name);
        console.log("Venue location " + result.venue.city);
        console.log("Date of Event " +  moment(result.datetime).format("MM/DD/YYYY"));
       


    });


    // Name of the venue
    // Venue location
    // Date of the Event (use moment to format this as "MM/DD/YYYY")   
} else if ( process.argv[2] == 'spotify-this-song') {

    var songName = process.argv.slice(3).join(" ");

    if (songName == undefined) {
        songName = "Kill Somebody";
    }; 
   
    function MusicSearch(songName){
        
     spotify.search({ type: 'track', query: songName, limit: 10  }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }

            //var tableArray = [];

            for (var i = 0; i < data.tracks.items.length; i++ ) {
                var result = {
                    artist : data.tracks.items[i].album.artists[0].name,
                    album_name : data.tracks.items[i].album.name,
                    song_name : data.tracks.items[i].name,
                    preview_url : data.tracks.items[i].preview_url 
                }
                //tableArray.push(result);
            }
      
            
           // var table = cTable.getTable(tableArray);
    
           console.log("Artist:" + result.artist);
           console.log("Album name:"+result.album_name);
           console.log("Song Name:"+ result.song_name);
           console.log("URL:"+ result.preview_url);
           

       
    });
};
} else if ( process.argv[2] == 'movie-this') {
    var movieName = process.argv.slice(3).join(" ");

    if (movieName == undefined) {
        movieName = "The Notebook";
    } 

    request('http://www.omdbapi.com/?i=tt3896198&apikey=55e8eecb&t=' + process.argv[3], function (error, response, body) {
        
        var result  =  JSON.parse(body);
        console.log("Title :" + result.Title);
        console.log("Year :" + result.Released);
        console.log("IMDB Rating :" + result.imdbRating );
        //console.log("Rotten Tomatoes :" + result.Ratings[1].Value);
        console.log("Country :" +  result.Country);
        console.log("Language :" + result.Language);
        
        console.log("Movie Plot :" + result.Plot);
        console.log("Actors :" +  result.Actors);

    });

} else if ( process.argv[2] == 'do-what-it-says') {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        songName = dataArr[1];
        MusicSearch(songName);
        
       
      });
        
      };

