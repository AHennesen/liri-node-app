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
  } else if (what === 'do-what-is-says'){
    itSays();
  } else {
    console.log('Please enter a valid cmd: concert-this, spotify-this-song, movie-this, do-what-it-says');
  }
};

// create bandsInTown func
function bandsInTown(search){
  var queryUrl = "https://rest.bandsintown.com/artists" + search + "/events?app_id=codingbootcamp";
  
  axios.get(queryUrl)
  .then(function(err, response){
    console.log(response);
    console.log('Venue: ' + response.data[0].venue.name);
    console.log('Location: ' + response.data[0].venue.city);
    console.log('Date: ' + response.data[0].datetime).format('MM-DD-YYYY');
    if (err){
        console.log(err);
      };
    });
  };


function spotifySearch(search){
  if (!search){
    search = 'The Sign Ace of Base'
  }

  spotify.search({type: 'track', query: search}, function (err, data){
    console.log('Artist Name: ' + data.tracks.items[0].album.artists[0].name);
    console.log('Song Title: ' + data.tracks.items[0].name);
    console.log('Song Prieview: ' + data.tracks.items[0].href);
    console.log('Album: ' + data.tracks.items[0].album.name);
    // console.log(data);
    if (err){
      console.log(err)
        return;
    }
  });
};

// intialize runApp func
runApp(what, search);