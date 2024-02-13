const RecipeModel=require("../models/Recipe.model");
const {Router}=require("express");


const RecipeController=Router();

RecipeController.post("/postRecipe",async(req,res)=>{
    const {title,authorId,ingredients,comments,prep_time,cook_time,total_time,servings}=req.body;
     try{
        const recipe = new RecipeModel({
            title,url,authorId,ingredients,comments,prep_time,cook_time,total_time,servings,
            createdAt:Date.now(),
        })
        await recipe.save();
        res.json({message:"added"});
        }
      
     catch(e){console.log("error",e);
     res.json({message:e});}
 })
 RecipeController.get("/getRecipe",async(req,res)=>{
     try{
        const recipe = await RecipeModel.find({}).populate('authorId') 
            res.json({recipe});
        }
        

        
        
      
     catch(e){console.log("error",e);
     res.json({message:e});}
 })
 
 module.exports=RecipeController;