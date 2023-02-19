const express=require("express")
const cors=require("cors");
const { Connection } = require("./configuration/db.js");
const { UserRoute } = require("./Routes/User.js");
const { authenticate } = require("./middlewares/authentication.js");
const { NoteRoute } = require("./Routes/Notes.js");
require("dotenv").config();

const app=express()

app.use(cors());
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome To Home Page Of Full Stack App")
})

// userRouter for register and login //

app.use("/user",UserRoute)

app.use(authenticate)
app.use("/note",NoteRoute)

app.listen(process.env.PORT,async()=>{
    try{
    await Connection
    console.log("Connected To Database")
    }
    catch(err){
        console.log(err)
    }
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})