const {UserModel}=require("./User.model")

const mongoose=require('mongoose');
const CommentSchema=mongoose.Schema({
    text: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel" // If you have a User model
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const CommentModel=mongoose.model("comments",CommentSchema);

module.exports=CommentModel;