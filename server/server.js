// https://github.com/thelinmichael/spotify-web-api-node

require('dotenv').config()

//require() is a function that loads modules in Node.JS
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const lyricsFinder = require("lyrics-finder")

//Import universal client library
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();

// Serve static files along with API routes
app.use(express.static('../musicproject/build'));

//For cors issues
app.use(cors());
//Middleware that only parsers JSON()
app.use(bodyParser.json());
// Parse URL params for lyrics finder cause it's a GET request
app.use(bodyParser.urlencoded({ extended: true }));
//Whenever there is a post request at '/login' run callback -- Route Definition --
app.post('/login', (req, res) => {
    //req.body object contains key value pairs
    //Get request body { code: ...} (our code after logging in)
    //This value will be passed up to req.body
    const code = req.body.code;

    //New instance of Spotify library
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI,
    });

    //Authorise that we have a code
    //It spits out access and refresh token, as well as expiry
    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            // Resolve
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiredIn: data.body.expires_in,
            })
        })
        .catch((err) => {
            //CLG logs in terminal for server
            console.log(err);
            res.sendStatus(400)
        })
})

app.post('/refresh', (req, res) => {
    //Get refresh token data
    const refreshToken = req.body.refreshToken;

    //console.log(refreshToken)

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI,
        refreshToken,
    });

    //Refreshes the token, pass down access and expiry data to useAuth
    spotifyApi.refreshAccessToken()
        .then((data) => {
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in
            })
        })
        .catch(() => res.sendStatus(400))

})

app.get('/lyrics', async (req, res) => {
    const lyrics = await lyricsFinder(req.query.artist, req.query.track) || "No Lyrics Found";

    //console.log(lyrics);

    res.json({ lyrics })
})

app.listen(process.env.PORT || 3001);