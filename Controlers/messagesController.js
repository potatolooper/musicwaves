
const connection = require('../Database/db')



exports.addMessage = async(req,res)=>{

       try {
           var user_name;
           var message;
           var id_song;
           var point_pov;
           var point_neg;

       } catch (error) {
           console.log(error)
       }

}

exports.addResponse = async(req,res)=>{

    try {
         
     
    } catch (error) {
        console.log(error)
    }

}

exports.getMessages = async(id,req,res)=>{

    try {
       connection.query('SELECT * FROM message WHERE Id_Song = ?',[id],async(error,result)=>{
            if (result==undefined){
                console.log("No hay mensajes de esa cancion : " + error)
            }
          return result  
       })    

    } catch (error) {
        console.log(error)
    }


}
exports.addPositive = async(req,res)=>{
    try {
        var points = 0;
        connection.query('SELECT Positive FROM message WHERE Id = ?',[id],async(error,result)=>{
                if (result!= undefined) {
                    points = result
         connection.query('REPLACE INTO message (Positive) VALUES (?)',points,async(error,result)=>{

         })           
                }
        })
        
        
    } catch (error) {
        console.log(error)
    }
}
exports.addNegative = async(req,res)=>{
    try {

        var points = 0;
        connection.query('SELECT Negative FROM message WHERE Id = ?',[id],async(error,result)=>{
                if (result!= undefined) {
                    points = result
         connection.query('REPLACE INTO message (Negative) VALUES (?)',points,async(error,result)=>{

         })           
                }
        })
        
        
    } catch (error) {
        console.log(error)
    }
}



exports.message = async(prueba,req,res)=>{
      return(prueba+"1")
}