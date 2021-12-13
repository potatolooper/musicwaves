var edit = $("#edit")
var Usuario = window.localStorage.getItem("Usuario")
edit.on("click",(e)=>
{
    console.log(Usuario)
    window.location.replace("/edit?Usuario="+Usuario)  
})
var volver = $("#volver")

volver.on("click",(e)=>{
    window.location.replace("/LogIN")
})

