const RecipeModel=require("../models/Recipe.model");
const {Router}=require("express");
const {CommentModel}=require("../models/Comment.model");

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
 
 RecipeController.get("/getRecipe/:id", async (req, res) => {
    try {
      const recipeId = req.params.id;
  
      // Retrieve the recipe
    //   const recipe = await RecipeModel.findById(recipeId).populate('authorId') ;
    const recipe = await RecipeModel.findById(recipeId).populate({
        path: 'comments', // the field you want to populate
        model: 'Comments', // the model to use for population
        // You can also specify additional options, such as select, match, etc.
      }) 

      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
  
      // Retrieve comments associated with the recipe
      // Combine recipe and comments into a single object
    //   const recipeWithComments = {
    //     recipe: recipe,
    //     comments: comments
    //   };
  
      res.status(200).json(recipe);
    } catch (error) {
      console.error('Error fetching recipe with comments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
 module.exports=RecipeController;