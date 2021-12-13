const connection = require('../Database/db')
const bcryptjs = require('bcryptjs')

exports.change = async(req,res)=>{

        try {
            var email = req.body.email
            var username = req.body.Username
            var ant_user = req.body.ant_user
            var password = req.body.password
            var ant_password = req.body.ant_password
            var passHash = await bcryptjs.hash(password,8)
            connection.query('SELECT Password FROM profiles WHERE User = ?',[ant_user],async(error,result)=>{
                console.log(result[0])
                if (await bcryptjs.compare(ant_password,result[0].Password)) {
                    if (email != undefined) {
                        connection.query('UPDATE profiles SET ? WHERE User = ?',[{Email:email},ant_user],async(error,result)=>{

                        })  
                    }
                    if (password != undefined) {
                        connection.query('UPDATE profiles SET ? WHERE User = ?',[{Password:passHash},ant_user],async(error,result)=>{

                    })
                 }
                    if (username != undefined) {
                        connection.query('UPDATE profiles SET ? WHERE User = ?',[{User:username},ant_user],async(error,result)=>{

                        })  
                    }
                   res.redirect('/log')
                    
                }else{
                    res.send("Las contraseñas no coinciden,prueba de nuevo")
                }
            })
            

        } catch (error) {
            console.log(error)
        }



}

