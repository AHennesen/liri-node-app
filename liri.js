require("dotenv").config();
var keys = require("./keys.js");
// used to call the api keys
var spotify = new Spotify(keys.spotify);
