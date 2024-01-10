const mongoose=require('mongoose');
const UserSchema=mongoose.Schema({
    name:{type:String, required:true}, 
    email:{type:String, required:true,unique:true,trim:true},
    password:{type:String, required:true,},
    profileImg:{type:String,},
},{timeStamps:true});
const UserModel=mongoose.model("userBook",UserSchema);

module.exports=UserModel;