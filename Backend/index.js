const express=require('express');
const cors=require('cors');
const UserController=require('./controller/User.controller')
const connection = require('./configs/db')
require('dotenv').config()
const app = express();
const session=require('express-session');
const {passport} = require('./utils/google.auth')

app.use(cors());
app.use(express.json());
app.use(session({
  secret:process.env.EncryptionKey,
  resave:false,
  saveUninitialized:true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());
app.use("/user",UserController)
app.get("/",(req,res)=>{
  res.json(200);
  console.log("hey /")
})
app.get('/auth/google/callback', 
  passport.authenticate('google', {   successRedirect:"http://localhost:3000/",failureRedirect: '/login'}),
  // function(req, res) {
  //   // Successful authentication, redirect home.
  //   res.send(req.user);
  // }
  );
  app.get("/login/sucess",async(req,res)=>{

    if(req.user){
        res.status(200).json({message:"user SignedUp",user:{ id: req.user._id, name: req.user.name, email: req.user.email, profileImg:req.user.profileImg }})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})

// app.get("/logout",(req,res,next)=>{
//     req.logout(function(err){
//         if(err){return next(err)}
//         res.redirect("http://localhost:3001");
//     })
// })


app.listen(process.env.Port,async()=>{
  try{
     connection;
     console.log("Connection Established With DB");
  }
  catch(e){console.log("Error While Connecting To Database",e);
  }
  console.log('listening on',process.env.Port);  
})