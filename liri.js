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
const search = process.argv[3];

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
  .then(function(response, err){
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

  spotify.search({type: 'track', query: search}, function (data, err){
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

// intialize runApp func
runApp(what, search);
// let input = '';
// let song = '';
// let movie = '';
// let band = '';

// function selectChoice() {
//   inquirer.prompt([
//     {
//       type: 'list',
//       name: 'start',
//       message: 'What can I help you with today?',
//       choices: ['concert-this','spotify-this-song', 'movie-this', 'do-what-it-says']
//     },
//   ]).then(function(answer){
//     if (answer.start === 'do-what-it-says'){
//       getRandom();
//       return;
//     } else {
//       start = answer.start;
//       inquirer.prompt([
//        {
//          name: userimput,
//          message: 'What would you like for me to look up?'
//        }
//       ]).then(function (response){
//         input = response.userimput;
//         choiceSelect(start);
//       })
//     }
//   });
// }

// function userImput(){
//   if (input){
//     song = input;
//     movie = input;
//     band = input;
//   } else {
//     song = 'The Sign';
//     movie = 'Mr. Nodbody';
//     band = 'Boy';
//   }
// };

// function choiceSelect(){
//   userImput();
//   switch(start) {
//     case 'concert-this':
//       bandsInTown();
//       break;
//     case 'spotify-this-song':
//       spotify();
//       break;
//     case 'movie-this':
//       omdb();
//       break;
//   }
// };


// function spotifyAPI() {
//   timestap();
//   spotify.search({
//     type: 'track',
//     query: song,
//     limit: 1
//   }).then(function(response, err){
//     if (err) console.log(err);
//     var songArray = response.track.items[0];
//   })  
// }

// the rest of the code here is going to be going through the choices.
// current my spotify keys don't appear to be working and I am to tired to think straight. Will continue work tommrow.
// selectChoice();


