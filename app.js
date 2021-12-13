const SpotifyWebApi = require("spotify-web-api-node");
const express = require("express");
const cookieParser = require("cookie-parser");
var LocalStorage = require('node-localstorage').LocalStorage
localStorage = new LocalStorage('./scratch');
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

//Get Images of Playlist
async function getPlaylistImg(userName){
  const data = await spotifyApi.getUserPlaylists(userName);

  let arrayTotal = [];
  for (let playlist of data.body.items) {
    //console.log(playlist.images[0].url);
    arrayTotal.push(playlist.images[0].url);
  }
  
  return arrayTotal;
}





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

app.post("/envmsg",messagescontroller.addMessage)

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
        
        getPlaylistImg(u.body.id)
        .then((i)=>{

       
        res.type("text/html");  
        res.render("LogIN.hbs",
          {
            Total: v,
            User: user,
            ImageUser:image,
            ImgsPly:i
          },
          function (err, html) {
            if (err) throw err;
            res.send(html);
          });

      }); 
    })  
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
      debugger;
     
      let artists = [];
      let durations = [];
      let songs_ids = [];
      let songs_images = []
for (const ar of songs) {
    artists.push(ar.artists[0].name);
};
for (const durar of songs) {
      durations.push(durar.duration_ms)
}
for (const ids of songs) {
  songs_ids.push(ids.id)
}
for (const img of songs) {
    songs_images.push(img.album.images[2].url)
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
            Durations:durations,
            Img_song:songs_images
          },
          function (err, html) {
            if (err) throw err;
            res.send(html);
          });
        })

        })
})



app.get("/msg",(req,res)=>{

    var id = req.query.song_id

connection.query('SELECT * FROM message WHERE Id_Song = ?',[id],(error,result)=>{
     var normales = []
      var respuestas = []
    if (result.length==0){
        console.log("No hay mensajes de esa cancion : " + error)

    }else{
   
    for (let i = 0; i < result.length; i++) {
           
  
            if(result[i].Id_Menssages){ 
              x=0    
              respuestas[x]=[]
              respuestas[x]["Id"]=(result[i].Id)
              respuestas[x]["Message_user"]=(result[i].Message_user)
              respuestas[x]["Menssage"]=(result[i].Menssage)
              respuestas[x]["Positive"]=(result[i].Positive)
              respuestas[x]["Negative"]=(result[i].Negative)
              respuestas[x]["Id_Menssages"]=(result[i].Id_Menssages)
            x++;
    }else{ 
            normales[i]=[]
            normales[i]["Id"]=(result[i].Id)
            normales[i]["Message_user"]=(result[i].Message_user)
            normales[i]["Menssage"]=(result[i].Menssage)
            normales[i]["Positive"]=(result[i].Positive)
            normales[i]["Negative"]=(result[i].Negative)
            normales[i]["Id_Menssages"]=(result[i].Id_Menssages)
      
          }
    }
    console.log(normales)
    console.log(respuestas)

 }
 spotifyApi.getTrack(req.query.song_id)
 .then((track)=>{
 spotifyApi.getMe()
 .then((u) => {
  var user = u.body.display_name;
   var image = " "
   if(!(u.body.images.length===0)){
      image = u.body.images[0].url
   } 

 res.type("text/html");  
  res.render("Messages.hbs",{
            Idong:id,
            Song:track.body.name,
            Name:user,
            User:user,
            ImageUser:image,
            Messages:normales,
            Replys:respuestas
  },
  function (err, html) {
    if (err) throw err;
    res.send(html);
  });
 })
})

}) 

})


app.get("/edit",(req,res)=>{
  var user  = req.query.Usuario
  connection.query('SELECT Email,User FROM profiles WHERE User = ?',[user],(error,result)=>{
      connection.query('SELECT COUNT(Id) FROM message WHERE Message_user = ?',[user],(error,resul)=>{
        
     
  res.type("text/html");  
  res.render("Profile.hbs",{
            User:result[0].User,
            Email:result[0].Email,
            Post:resul[0][0]
          })
 })
})
  })


app.get("/posi",messagescontroller.addPositive)

app.get("/neg",messagescontroller.addNegative)




app.listen(8888, () =>
  console.log( 
    "HTTP Server up. Now go to http://localhost:8888/login in your browser."
  )
);

