const express=require('express');
const cors=require('cors');
const UserController=require('./controller/User.controller')
const connection = require('./configs/db')

require('dotenv').config()
const app = express();

app.use(cors());
app.use(express.json());

app.use("/user",UserController)
app.listen(process.env.Port,async()=>{
  try{
     connection;
     console.log("Connection Established With DB");
  }
  catch(e){console.log("Error While Connecting To Database",e);
  }
  console.log('listening on',process.env.Port);  
})