var links = document.getElementsByClassName("env_messages")

    for (const elem of links) {
        elem.addEventListener("click",(e)=>{
            var song_id = "" 
           
            song_id = $(e.target).parent().attr("id")
             console.log(song_id)
           window.location.replace("/msg?song_id="+song_id);
        })
        
    }
    

    var edit = $("#edit")
   edit.on("click",()=>{
      window.location.href = "/edit";
   })