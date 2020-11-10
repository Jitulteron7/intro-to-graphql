const mongoose=require("mongoose");

const BookSchema= new mongoose.Schema({
    name:String,
    genere:String,
    authorId:String
},{timestamps:true});

module.exports=mongoose.model("Books",BookSchema);
