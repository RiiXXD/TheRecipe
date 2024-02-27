const RecipeModel=require("../models/Recipe.model");
const {Router}=require("express");
const CommentModel=require("../models/Comment.model");
const authorization=require("../middlewares/auth.middleware") 
const mongoose=require('mongoose');

const RecipeController=Router();

RecipeController.post("/postRecipe",authorization,async(req,res)=>{
  const authorId=req.body.userId;
    const {title,ingredients,instructions,comments,prep_time,cook_time,total_time,servings,url,cuisine,rating,difficulty,caloriesPerServing,tags,mealType,}=req.body;
     try{
        const recipe = new RecipeModel({
            title,
            authorId,
            ingredients,
            instructions,
            comments,
            prep_time,
            cook_time,
            total_time,
            servings,
            url,
            cuisine,
            rating,
            difficulty,
            caloriesPerServing,
            tags,
            mealType,
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
         const { page = 1, limit = 8 } = req.query;
         const pageNumber = parseInt(page);
         const limitNumber = parseInt(limit);
        const recipe = await RecipeModel.find({}).populate('authorId').skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);
  
            res.json({recipe});
        }
        

        
        
      
     catch(e){console.log("error",e);
     res.json({message:e});}
 })
 
 RecipeController.get("/getRecipe/:id", async (req, res) => {
    try {
      const recipeId = req.params.id;
     console.log(recipeId);
      const recipe= await RecipeModel.findById(recipeId).populate('authorId');
      RecipeComments=[...recipe.comments];
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
     res.status(200).json(recipe);
     console.log(RecipeComments)
  }
  catch (error) {
      console.error('Error fetching recipe with comments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  RecipeController.get("/search", async (req, res) => {
    try {
      const { q } = req.query; // Corrected from const {q} = req.query;
      const recipes = await RecipeModel.find({
        $or: [
          { 
            title: { $regex: q, $options: 'i' } 
          }, // Case-insensitive search by title
          { mealType: { $in: [q]  } }, // Search for exact match in mealType array
          { tags: { $in: [q]   } } // Search for exact match in tags array
        ]
      }).populate('authorId');
      if(recipes.length>0){
        res.json({ recipes ,msg:"Found!"});
      }
      else{
        res.json({ recipes,msg:"Not-found!" });
        }
    } catch (error) {
      console.error('Error searching recipes:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
 module.exports=RecipeController;