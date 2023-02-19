const express=require("express")
const { Usermodel } = require("../models/Usermodel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()

const UserRoute=express.Router()

UserRoute.post("/register",async(req,res)=>{
    try{
      const {username,email,password}=req.body

      const existUsername=new Promise((resolve,reject)=>{
        Usermodel.findOne({username},(err,user)=>{
            if(err) return reject(new Error(err))
            if(user) return reject({error:"Please use unique Username"})
            resolve()

        })
      })

      const existEmail=new Promise((resolve,reject)=>{
        Usermodel.findOne({email},(err,email)=>{
            if(err) reject(new Error(err))
            if(email) reject({msg:"Please Use Unique email"})
            resolve()
        })
      })

      Promise.all([existUsername,existEmail])
      .then(()=>{
        if(password){
         bcrypt.hash(password,5,async(err,hash)=>{
           if(err){
            return res.status(500).send({err})
           } else{
            const user=new Usermodel({username,email,password:hash})
            await user.save()
            res.status(200).send({msg:"User Register Succefull...!"})
           }
         })
        }
      })
      .catch((err)=>{
        return res.status(500).send({err})
     })
    }
    catch(err){
        res.status(501).send({error:"Unable to register User"})
    }
})

UserRoute.post("/login",async(req,res)=>{
    const {username,password}=req.body
    try{
        Usermodel.findOne({username},(err,user)=>{
            if(!user) res.status(404).send({err:"Username Not Found"})
            if(user){
              //  console.log("user",user)
                bcrypt.compare(password,user.password,(err,result)=>{
                  
                   if(result){
                        const token=jwt.sign({userId:user._id},process.env.SECRET_KEY)
                        return res.status(200).send({msg:"Login Successfull !",token:token})
                    }
                    else{
                        return res.status(404).send({err:"Password Did Not Match"})
                    }
                })
            }
        })
    }
    catch(err){
      return   res.status(501).send({err})
    }
})

module.exports={UserRoute}