const mongoose=require("mongoose");

const AuthorSchema= new mongoose.Schema({
    name:String,
    age:Number,
    authorId:String
},{timestamps:true});

module.exports=mongoose.model("Author",AuthorSchema);
