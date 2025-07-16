const express=require('express');
const routes=express.Router();
const mongoose = require('mongoose');
///verifying token////
const jwt = require("jsonwebtoken");
const JWT_SECRETKEY = process.env.JWT_SECRET || "your_secret_key";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(403).json({ error: "Token required" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRETKEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token. Please provide a valid token." });
        }
        req.user = decoded;
        next();
    });
};


const User=require('../models/user');

routes.post('/adddoctor',verifyToken,async(req,res)=>{
    console.log(req.body);
const {docname,docspec,email,aboutdoc}=req.body;
if(!docname||!docspec){
   return res.status(400).json({error:'doctor name and doctor specification is required'});
}
const user=new User({docname,docspec,email,aboutdoc});
await user.save();

res.status(200).json({message:'doctor is added successfully',user})
});

routes.get('/getdoctor',async(req,res)=>{
try{
    const doctordata=await User.find();
    res.status(200).json({message:'data has been extracted successfully',data:doctordata})
}catch (error) {
    console.error("Error fetching data:", error.message);
}
})

routes.delete('/deletedoctor',async(req,res)=>{
    console.log(req.query);
try{
      const {id}=req.query;
        if (!id) {
                  return res.status(400).json({ error: 'ID is required to cancel an appointment' });
              }
      
              if (!mongoose.Types.ObjectId.isValid(id)) {
                  return res.status(400).json({ error: 'Invalid ID format' });
              }
              const ObjId= new mongoose.Types.ObjectId(id);
              const result = await User.findByIdAndDelete(ObjId);
              if (!result) {
                  return res.status(404).json({ error: 'Doctor ID not found in the database' });
              }
              return res.status(200).json({ message: 'The Doctor has been Deleted',result });
              
          } catch (error) {
              console.error("Error deleting data:", error);
              res.status(500).json({ error: "Failed to cancel appointment", details: error.message });
          }
})


routes.put('/updatedoctor',async(req,res)=>{
    console.log(req.body);
    const {id,docname,docspec,email,aboutdoc}=req.body;
    try{
        const updatefields={};
        if(docname) updatefields.docname=docname;
        if(docspec) updatefields.docspec=docspec;
        if(email) updatefields.email=email;
        if(aboutdoc) updatefields.aboutdoc=aboutdoc;
    const result=await User.findByIdAndUpdate(
id,
{$set:updatefields},
{new:true}
    )
    if (!result) {
        return res.status(404).json({ error: 'Doctor not found!' });
    }
    res.status(200).json({ message: "The data has been edited", changeperson: result });
}catch (error) {
    console.error("Error updating data:", error.stack);
    res.status(500).json({ error: "Failed to updating data", details: error.message });
}

    }
)
module.exports=routes;
