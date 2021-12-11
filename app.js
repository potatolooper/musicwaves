const SpotifyWebApi = require("spotify-web-api-node");
const express = require("express");
const cookieParser = require("cookie-parser");
const connection = require('./Database/db')
const authcontroller = require('./Controlers/authController')
const songscontroller = require('./Controlers/songsController')
const messagescontroller = require('./Controlers/messagesController')
const Usuario = require("./scripts/Usuario")
const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "app-remote-control",
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify-private",
  "user-library-modify",
  "user-library-read",
  "user-top-read",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-follow-read",
  "user-follow-modify",
];

var spotifyApi = new SpotifyWebApi({
  clientId: "3956a3a604d64260b490d7c899cbf939",
  clientSecret: "a60d6a1a376c4c17939d1bbd96ce2d85",
  redirectUri: "http://localhost:8888/callback",
});

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// For you can use static path

app.use(express.static(__dirname + '/css'));

app.use(express.static(__dirname + '/img'));

app.use(express.static(__dirname + '/scripts'));



app.get("/log", (req, res) => {
 // songscontroller.message();
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

//Spotify Functions ______________  
//Potatolooper@gmail.com
//proyectofinal

//Get Profile Data from User
function getData(token) {
  spotifyApi.setAccessToken(token);
  var playlist = async () => {
    const me = await spotifyApi.getMe();
    // console.log(me.body);

    var internal = getUserPlaylists(me.body.id).then(function (e) {
      return e;
    });
    return internal;
  };
  return playlist;
}

//Get the User Playlist
async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName);

  let arrayTotal = [[],[]];
  for (let playlist of data.body.items) {
    arrayTotal[0].push(playlist.id);
    arrayTotal[1].push(playlist.name);
  }
  //console.log(arrayTotal[1]);
  return arrayTotal;
}

//Get Songs From Playlist

 /**
  * @param string playlistId ID of the user playlist
  * 
  * @return Array Array of songs from the playlist
  */
async function getPlaylistTracks(playlistId) {
  let tracks = [];
  
  var i =0;
   let total = await  spotifyApi.getPlaylistTracks(playlistId)
    
   let data = await spotifyApi.getPlaylistTracks(playlistId, {
      offset: 0,
      limit: 100,
      fields: "items",
    });
   

    for (let track_obj of data.body.items) {
      let track = track_obj.track;
       tracks.push(track) 
        
      // console.log(" this Is the Endaaaa ____"+i+"__________________________"); 
       i++;  
    }
    if (total.body.total >100){
      let data = await spotifyApi.getPlaylistTracks(playlistId, {
        offset: 100,
        limit: 100,
        fields: "items",
      });

      for (let track_obj of data.body.items) {
        let track = track_obj.track;
         tracks.push(track) 
         //console.log(" this Is the Endaaaa ____"+i+"__________________________"); 
         i++;  
      }
    }

  return tracks;
}

//Funcion Callback _________________________

app.get("/callback", (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error("Callback Error:", error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      const access_token = data.body["access_token"];
      const refresh_token = data.body["refresh_token"];
      const expires_in = data.body["expires_in"];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      //console.log("Piri : " + spotifyApi.getAccessToken());

      //console.log('refresh_token:', refresh_token);
      console.log(`Fin de los Token. Expires in ${expires_in} s.`);

      //getMyData(access_token);

      res.redirect("/LogIN");
      
      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body["access_token"];

        console.log("The access token has been refreshed!");
        console.log("access_token:", access_token);
        spotifyApi.setAccessToken(access_token);
      }, (expires_in / 2) * 1000);
    })
    .catch((error) => {
      console.error("Error getting Tokens:", error);
      res.send(`Error getting Tokens: ${error}`);
    });
});


//Redirecciones __________________________________

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Public/Index.html");
});

// app.post("/auth",(req, res) => {
//   console.log(req.body.User)
//   console.log(req.body.Password)
// });

app.get("/register", authcontroller.register)

app.post("/auth",authcontroller.login)



app.get("/LogIN", (req, res) => {
  var data = getData(spotifyApi.getAccessToken());
  data("playlist").then(v => {      
      spotifyApi.getMe()
      .then((u) => {
        
        var user = u.body.display_name;
        var image = " "
        if(!(u.body.images.length===0)){
           image = u.body.images[0].url
        }  
        res.type("text/html");  
        res.render("LogIN.hbs",
          {
            Total: v,
            User: user,
            ImageUser:image
          },
          function (err, html) {
            if (err) throw err;
            res.send(html);
          } 
        
        );
      }); 
  });
});


/*
Creacion de la pagina con las canciones

**/

app.get("/songs",(req,res)=>{

   let playid = req.query.id
    getPlaylistTracks(playid)
    .then(songs =>{  
    
    spotifyApi.getMe()
      .then((u) => {
        var user = u.body.display_name;
        var image = " "
        if(!(u.body.images.length===0)){
           image = u.body.images[0].url
        } 

      let artists = [];
      let durations = [];
      let songs_ids = [];
for (const ar of songs) {
    artists.push(ar.artists[0].name);
};
for (const durar of songs) {
      durations.push(durar.duration_ms)
}
for (const ids of songs) {
  songs_ids.push(ids.id)
}
songscontroller.addSongs(songs_ids)
  res.type("text/html");  
  res.render("Songs.hbs",
          {
            Ids:songs_ids,
            Name:req.query.name,
            User:user,
            ImageUser:image,
            Songs:songs, 
            Artists:artists,
            Durations:durations
          },
          function (err, html) {
            if (err) throw err;
            res.send(html);
          });
        })

        })
})



app.get("/msg",(req,res)=>{

 var message = messagescontroller.getMessages(req.query.song_id)
 message.then(m =>{
    console.log(m);
  
 }) 
 spotifyApi.getTrack(req.query.song_id)
 .then((track)=>{
   console.log(track.body.name)
 spotifyApi.getMe()
 .then((u) => {
  var user = u.body.display_name;
   var image = " "
   if(!(u.body.images.length===0)){
      image = u.body.images[0].url
   } 

 res.type("text/html");  
  res.render("Messages.hbs",{
            Song:track.body.name,
            Name:user,
            User:user,
            ImageUser:image
  },
  function (err, html) {
    if (err) throw err;
    res.send(html);
  });
 })
})
})

app.post("/envmsg",messagescontroller.addMessage)




app.listen(8888, () =>
  console.log( 
    "HTTP Server up. Now go to http://localhost:8888/login in your browser."
  )
);

