var links = document.getElementsByClassName("env_messages")

    for (const elem of links) {
        var song_id =  elem.parentElement.getAttribute("id")
        console.log(song_id)
        elem.addEventListener("click",(e)=>{
            window.location.replace("/msg?song_id="+song_id);
        })
        
    }
    console.log($(links))
    
    var edit = $("#edit")
   edit.on("click",()=>{
      window.location.href = "/edit";
   })