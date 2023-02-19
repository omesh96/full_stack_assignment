const express=require("express")
const { Notemodel } = require("../models/Notemodel")
const jwt=require("jsonwebtoken")
const e = require("express")
require("dotenv").config()

const NoteRoute=express.Router()

// Get Notes //

NoteRoute.get("/getnotes",async(req,res)=>{
    try{
        const token=req.headers.authorization
        if(token){
        const decode=jwt.verify(token,process.env.SECRET_KEY)
        if(decode){
         const notes=  await Notemodel.find({user:decode.userId})
         res.status(201).send(notes)
        } else{
            res.status(500).send({err:"Please Login First"})
        }
        }
        else{
            res.status(500).send({err:"No Notes Available"})
        }
    }
    catch(err){
       res.status(500).send({err:"No Notes Available"})
    }
})

// Post notes //
NoteRoute.post("/addnotes",async(req,res)=>{
    try{
        const payload=req.body
const notes=new Notemodel(payload)
await notes.save()
res.status(201).send({msg:"Note Created Succefully...!"})
    }
    catch(err){
        res.status(500).send({msg:"Please Login First"})
    }
})

// Delete Note //

NoteRoute.delete("/deletenote/:id",async(req,res)=>{
    const id=req.params.id
 const userId_making_req=req.body.user  // ye authentication middleware se aayega
 try{
 const validate=await Notemodel.findById(id)
 if(validate){
     if(validate.user===userId_making_req){
        await Notemodel.findByIdAndDelete(id)
        res.status(201).send({msg:"Note Deleted Successfully...!"})
     } else{
        res.status(500).send({msg:"You are not Authorised To delete this note"})
     }
 }
 else{
    res.status(500).send({msg:"Note Not Found"})
 }
 }
 catch(err){
    res.send(err)
 }
})

// update notes //
NoteRoute.patch("/updatenote/:id",async(req,res)=>{
    const id=req.params.id
 const userId_making_req=req.body.user  // ye authentication middleware se aayega
 try{
    const payload=req.body
 const validate=await Notemodel.findById(id)
 if(validate){
     if(validate.user===userId_making_req){
        await Notemodel.findByIdAndUpdate({_id:id},payload)
        res.status(201).send({msg:"Note Updated Successfully...!"})
     } else{
        res.status(500).send({msg:"You are not Authorised To Update this note"})
     }
 }
 else{
    res.status(500).send({msg:"Note Not Found"})
 }
 }
 catch(err){
    res.send(err)
 }
})

module.exports={NoteRoute}