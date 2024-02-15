const {Router}=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const UserModel=require("../models/User.model");
const authorization=require("../middlewares/auth.middleware");
const {passport} = require('../utils/google.auth');
const { redirect } = require("react-router-dom");
const { authenticate } = require("passport");

require('dotenv').config()
const UserController=Router();
UserController.get("/test",(req,res)=>{
    res.json("working")
})

UserController.post("/sign",async(req,res)=>{
   const{name, email, password, profileImg}=req.body;
    try{
      const existingUser=await UserModel.findOne({email});
       if(existingUser){
        res.json("Already an user!")
       }
       else{ console.log(name, email, password, profileImg);
        bcrypt.hash(password, 5, async function(err, hash) {
            if(hash){
                const user=new UserModel({
                name, 
                email,
                password:hash,
                profileImg
            })
            await user.save();
            const token=jwt.sign({userId:user._id},process.env.EncryptionKey);
         
            res.json({message:"user SignedUp",user:{ id:user._id,name, email, profileImg,token}})}
            else if(err){
                res.json("Something went wrong try again")
                console.log(err);
            }
            else{
                res.json("Invalid Credentials");
               
            }
            
        });}
       
    }
    catch(e){console.log("error",e);}
})

UserController.post("/login",async (req,res)=>{
   const{ email, password}=req.body;
    // try{
    //     console.log( email, password);
    // }
    const existingUser=await UserModel.findOne({email});
    if(existingUser){
    const cipher=existingUser.password;
    console.log(existingUser);
    bcrypt.compare(password,cipher,(err,result)=>{
      if(err){
        res.json({msg:"Something went wrong try again",error:err});
      }
      else if(result){
        const token=jwt.sign({userId:existingUser._id},process.env.EncryptionKey);
             res.json({msg:"Succesfully login ",token})
      }
      else{
        res.json("invalid creds");
      }
    })}
        
    else{
      res.json("Login First!")
    }
            
        
})
UserController.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] })
  
  );

  UserController.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login',session:false }),
    function(req, res) {
      // const accessToken = req.user.tokens.access_token;
      console.log('Successfully signed in');
      console.log('Token:', req.user.token);
      console.log('User:', req.user.name);
      res.json({ user, token });
      console.log('Successfully signed in') 
      res.json(token);
      });
UserController.get("/edit",authorization,async (req,res)=>{
res.json("login aftermath")

})
app.get("/getUserDetails",async(req,res)=>{
  jwt.verify(token,process.env.EncryptionKey,function(err,decoded){
  if(decoded){
    userId=decoded.req.userId;
    const existingUser= UserModel.findOne({userId});
    if(existingUser){
    res.json({message:"authenticated!",user:{ id: req.user._id, name: req.user.name, email: req.user.email, profileImg:req.user.profileImg}})
    }
    }
  else{
     
      console.log("error occured while login",err)
  }})}
)

module.exports=UserController;