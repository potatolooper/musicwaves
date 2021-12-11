var email = $("#email")
var register = $("#res")
var user = $("#user")
var pass = $("#pass")


const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const regis = urlParams.get('register')
if (regis) {
    window.alert("El registro a sido Existoso")
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