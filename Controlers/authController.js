const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const connection = require('../Database/db')



exports.register = async (req,res)=>{

        try {
        const email = req.query.email
        const user = req.query.user
        const pass = req.query.pass
        let passHash = await bcryptjs.hash(pass,8)
        console.log(passHash)
        connection.query('INSERT INTO profiles SET ?',{Email:email,Usuario:user,Password:passHash},(error,result)=>{
            if (error) {console.log(error)}
           res.redirect('/?register=yes') 
           
            
        })
        } catch (error) {
                console.log(error)
        }

}

exports.login = async(req,res)=>{

        try {
        const user = req.body.User
        const pass = req.body.Password

        if (!user||!pass) {
            res.send("Tienes que rellenar los dos campos "+ 
            "<a href='/'> Volver</a>")
        }else{
            connection.query('SELECT * FROM profiles WHERE Usuario = ?', [user],async(error,result)=>{
                if (result.lenght ==0 || ! (await  bcryptjs.compare(pass,result[0].Password))) {
                    res.send("La contraseña es Incorrecta")
                }else{
                    console.log("Todo bien")
                    const id = result[0].id
                    const token = jwt.sign({id:id},process.env.JWT_SECRETO,{
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    console.log("TOKEN GENERADO")

                    const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                   }
                   res.cookie('jwt', token, cookiesOptions)
                   res.redirect("/log")
                }
            })
        }

        } catch (error) {
                console.log(error)
        }
       
}