const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true, "please provide unique Username"],
        unique:[true, "Username Exist"]
    },
    password:{
        type:String,
        required:[true, "Please provide a Password"],
        unique:false
    },
    email:{
        type:String,
        required:[true, "please provide a email"],
        unique:true
    }
})

const Usermodel=mongoose.model("user",UserSchema)

module.exports={Usermodel}