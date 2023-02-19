const jwt=require("jsonwebtoken")
require("dotenv").config()

const authenticate=(req,res,next)=>{
  
    const token=req.headers.authorization
    if(token){
        const decode=jwt.verify(token,process.env.SECRET_KEY)
        if(decode){
            console.log(decode)
          // const userID=decode.userId
           req.body.user=decode.userId  // adding user id to note schema automatically (Relationship)
           next()
        }
    } else{
        res.status(501).send({msg:"Please Login First"})
    }
   }


module.exports={authenticate}