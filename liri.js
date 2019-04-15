require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');
moment().format();




// used to call the api keys
var spotify = new Spotify(keys.spotify);


axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  }
);