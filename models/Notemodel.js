const mongoose=require("mongoose")

const noteschema=mongoose.Schema({
    title:String,
    note:String,
    category:String,
    user:String
})

const Notemodel=mongoose.model("notes",noteschema)

module.exports={Notemodel}