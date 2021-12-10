const connection = require("../Database/db") 

class Usuario{

    Usuario(Nombre,Email,Password){
        this.Nombre = Nombre;
        this.Email = Email;
        this.Password = Password;
    }

    GetNombre(){
        return this.Nombre
    }
    GetEmail(){
        return this.Email
    }

    GetPassword(){
        return this.Password
    }

    SetNombre(Nombre){
        connection.query('UPDATE profiles Where User = ')
    }

    Set
}