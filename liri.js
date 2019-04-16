require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const moment = require('moment');
const fs = require('fs');
const inquirer = require('inquirer');

let input = '';
let song = '';
let movie = '';
let band = '';

function selectChoice() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'start',
      message: 'What can I help you with today?',
      choices: ['concert-this','spotify-this-song', 'movie-this', 'do-what-it-says']
    },
  ]).then(function(answer){
    if (answer.start === 'do-what-it-says'){
      getRandom();
      return;
    } else {
      liri = answer.start;
      inquirer.prompt([
       { type: input,
         name: userimput,
         message: 'What would you like for me to look up?'
       }
      ]).then(function (response){
        input = response.userimput;
      })
    }
  });
}

function spotifyAPI() {
  timestap();
  spotify.search({
    type: 'track',
    query: song,
    limit: 1
  }).then(function(response, err){
    if (err) console.log(err);
    var songArray = response.track.items[0];
  })
}

// the rest of the code here is going to be going through the choices.
// current my spotify keys don't appear to be working and I am to tired to think straight. Will continue work tommrow.
selectChoice();


