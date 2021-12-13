
const connection = require('../Database/db')



exports.addMessage = async(req,res)=>{

       try {
           console.log(req.body.user)
           var user_name = req.body.user;
           var message = req.body.message;
           var id_song = req.body.id_song;
           var point_pov = 0;
           var point_neg = 0;
           var id_message = req.body.id_message;
           if (id_message == undefined) {
            connection.query('INSERT INTO message SET ?',{Message_User:user_name,Menssage:message,Positive:point_pov,Negative:point_neg,Id_Song:id_song},(error,result)=>{
                if (error) {
                    console.log(error)}
                else{
                     res.redirect('/msg?song_id='+id_song)
                }
            })  
           }else{
             connection.query('INSERT INTO message SET ?',{Message_User:user_name,Menssage:message,Positive:point_pov,Negative:point_neg,Id_Song:id_song,Id_Menssages:id_message},(error,result)=>{
            if (error) {
                console.log(error)}
            else{
                 res.redirect('/msg?song_id='+id_song)
            }
        })  
           }

          
    

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
 
            
            console.log(result[0])
            
            for (let i = 0; i < result.length; i++) {
                console.log(result[i].Menssage)
                    arr.push(result[i].Menssage)
            }
          return result
       })  
       
      
  
      
    } catch (error) {
        console.log(error)
    }


}


exports.addPositive = async(req,res)=>{
    try {
        var id = req.query.song_id;
       
        var msg_id = req.query.msg_id;
        
        var points = 0;
        connection.query('SELECT Positive FROM message WHERE Id_Song = ? and Id= ?',[id,msg_id],async(error,result)=>{
              
                 points = result[0].Positive + 1
         connection.query('UPDATE message SET Positive = ? WHERE Id_Song = ? and Id= ?',[points,id,msg_id],async(error,result)=>{
           
            res.redirect('/msg?song_id='+ id)
            
         })           
                
        })
        
        
    } catch (error) {
        console.log(error)
    }
}

exports.addNegative = async(req,res)=>{
    try {

        var id = req.query.song_id;
        var msg_id = req.query.msg_id;
        debugger;
    
        var points = 0;
        connection.query('SELECT Negative FROM message WHERE Id_Song = ? and Id= ?',[id,msg_id],async(error,result)=>{
  
                    points = result[0].Negative +1
         connection.query('UPDATE message SET Negative = ? WHERE Id_Song = ? and Id= ?',[points,id,msg_id],async(error,result)=>{

            res.redirect('/msg?song_id='+ id)

         })           
            
        })
        
        
    } catch (error) {
        console.log(error)
    }
}



exports.message = async(prueba,req,res)=>{
      return(prueba+"1")
}