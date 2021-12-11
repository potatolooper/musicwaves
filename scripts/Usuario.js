const connection = require("../Database/db") 
const bcryptjs = require('bcryptjs')

 class Usuario{

    constructor(Nombre,Email,Password){
        this.nombre = Nombre;
        this.email = Email;
        this.password = Password;
    }

    GetNombre(){
        return this.nombre
    }
    GetEmail(){
        return this.email
    }

    GetPassword(){
        return this.password
    }

    SetNombre(Nombre){
        connection.query('UPDATE profiles  SET User = ? Where User = ?',[Nombre,this.nombre],(error,res)=>{
            console.log(error)
        })
    }

    SetEmail(Email){
        connection.query('UPDATE profiles SET Email = ? Where Email = ? ',[Email,this.email],(error,res)=>{
            console.log(error)
        })
    }
   async SetPassword(Password){
        var oldpass = ""
        connection.query('SELECT Password FROM profiles Where User = ?'[this.password],(error,res)=>{
                oldpass = res
        })
       var passHash = await bcryptjs.hash(Password,8)
        connection.query('UPDATE profiles SET Password = ? Where Password = ? ',[passHash,oldpass],(error,res)=>{
            console.log(error)
        })
    }
}

module.exports.Usuario = Usuario;