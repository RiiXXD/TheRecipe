const {UserModel}=require("./User.model")
const mongoose=require('mongoose');
const RecipeSchema=mongoose.Schema(
    {
    title: String,
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userbooks",
    },
    ingredients: [String],
    url:{type:String,},
    instructions: String,
    prep_time: String,
    cook_time: String,
    total_time: String,
    servings: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}
);
const RecipeModel=mongoose.model("RecipeBook",RecipeSchema);

module.exports=RecipeModel;