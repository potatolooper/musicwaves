var email = $("#email")
var register = $("#res")
var user = $("#user")
var pass = $("#pass")
var login = $("#login")

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const regis = urlParams.get('register')
if (regis) {
    window.alert("El registro a sido Existoso")
}
if ( window.localStorage.getItem("Usuario")) {
    user.val(window.localStorage.getItem("Usuario"))
    pass.val(window.localStorage.getItem("Password"))
}else{
    login.on("click",(e)=>{
        window.localStorage.setItem("Usuario",user.val())
        window.localStorage.setItem("Password",pass.val())
})
}


register.on("click", function () {
        if (email.val() === "") {
            email.css("display","block");   
        }else if (user.val() === "") {
             user.attr("placeholder","Tienes que introducir un Usuario")
        }else if (pass.val() === "") {
            pass.attr("placeholder","Tienes que introducir una Contraseña")
        }else if(email.val() != "" || user.val() != ""||pass.val() != "" ) { 
        
              window.location.href = "/register"+"?email="+email.val()+"&user="+user.val()+"&pass="+pass.val();          
        } 
            

});