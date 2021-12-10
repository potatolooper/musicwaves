var links = document.getElementsByClassName("env_messages")

    for (const elem of links) {
        var song_id=  elem.parentElement
        console.log(song_id.getAttribute("id"))
        elem.addEventListener("click",(e)=>{
            window.location.replace("/msg?song_id="+song_id);
        })

    }