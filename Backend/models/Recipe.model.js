const {UserModel}=require("./User.model")
const mongoose=require('mongoose');
const RecipeSchema=mongoose.Schema(
    {
    title: String,
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
    },
    ingredients: [String],
    instructions: String,
    prep_time: String,
    cook_time: String,
    total_time: String,
    servings: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommentModel"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}
);
const RecipeModel=mongoose.model("RecipeBook",RecipeSchema);

module.exports=RecipeModel;