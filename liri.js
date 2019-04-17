require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const moment = require('moment');
const fs = require('fs');
const inquirer = require('inquirer');

// what do you want to do?
const what = process.argv[2];
// what do you want to search for
const search = process.argv.slice(3).join(" ");

// get the user imputs
function runApp(what, search){
  if (what === 'concert-this'){
    bandsInTown(search)
  } else if (what  === 'spotify-this-song') {
    spotifySearch(search);
  } else if (what === 'movie-this'){
    omdb(search)
  } else if (what === 'do-what-it-says'){
    doThis();
  } else {
    console.log('Please enter a valid cmd: concert-this, spotify-this-song, movie-this, do-what-it-says');
  }
};

// create bandsInTown func
function bandsInTown(search){
  // this refuses to work for litterly no reason
  // var queryUrl = "https://rest.bandsintown.com/artists" + search + "/events?app_id=codingbootcamp";
  
  axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp")
  .then(function(response, err){
    // console.log(response);
    console.log('Venue: ' + response.data[0].venue.name);
    console.log('Location: ' + response.data[0].venue.city);
    console.log('Date: ' + response.data[0].datetime);
    if (err){
        console.log(err);
      };
    });
  };

// create spotifySearch function  
function spotifySearch(search){
  if (!search){
    search = 'The Sign Ace of Base'
  }

  spotify.search({type: 'track', query: search}, function (err, data){
    console.log('Artist Name: ' + data.tracks.items[0].album.artists[0].name);
    console.log('Song Title: ' + data.tracks.items[0].name);
    console.log('Song Prieview: ' + data.tracks.items[0].href);
    console.log('Album: ' + data.tracks.items[0].album.name);
    if (err){
      console.log(err)
        return;
    }
  });
};
// create omdb function
function omdb(search){

  if(!search){
    search = 'Mr. Nobody';
  }
  // this also refueses to work for litterly no reason
  // var queryUrl = "http://www.omdbapi.com?/t=' + search + '&y=&plot=short&apikey=trilogy";

  axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy")
  .then(function(response, err){
    // console.log(response);
    console.log('Title: ' + response.data.Title);
    console.log('Released: ' + response.data.Year);
    console.log('IMDB Rating: ' + response.data.imdbRating);
    console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].value);
    console.log('Country: ' + response.data.Country);
    console.log('Language: ' + response.data.Language);
    console.log('Plot: ' + response.data.Plot);
    console.log('Actors: ' + response.data.Actors);
    if (err){
      console.log(err)
        return;
    };
  });
};

// crates the do this fnc
function doThis(){
  fs.readFile('random.txt', 'utf 8', function (err, data){
    if (err) {
      return console.log(err);
    } else {
      console.log(data)
    }
  })
}


// intialize runApp func
runApp(what, search);