const connection = require('../Database/db')



exports.addSongs = async(ids,req,res)=>{

        try {
            for (const id of ids) {
            connection.query('SELECT * FROM songs WHERE Code_Song = ?', [id],async(error,result)=>{   
                     if (result.length== 0 ) {
                            
             connection.query('INSERT INTO songs SET ?',{Code_Song:id},(error,result)=>{
                if (error) {
                console.log("Se a producido un error al meter los ids en la base de datos: "+error)
            }

             })        
                        }
            })
           
            } 
        } catch (error) {
            console.log("No se ha podido cargar los ids de las canciones : "+error)
        }

}

exports.message = async(prueba,req,res)=>{
        console.log(prueba)
}