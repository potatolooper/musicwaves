var links = document.getElementsByClassName("env_messages")


    for (const elem of links) {
        elem.addEventListener("click",(e)=>{
            var song_id = "" 
            var id = ""
            song_id = $(e.target)

            if (song_id.prop("tagName") == "IMG") {
               
                id=song_id.parent().parent().attr("id")
            }else{
                id=song_id.parent().attr("id")
            }
             
           window.location.replace("/msg?song_id="+id);
        })
        
     
    }

    