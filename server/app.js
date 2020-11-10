const express =require("express");
const graphqlHTTP=require("express-graphql").graphqlHTTP;
const app=express();
const PORT=process.env.PORT||4000;
const mongoose =require("mongoose");
const schema=require("./schema/schema");

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true
}));
// 
mongoose.connect("mongodb://localhost:27017/userQrl",{useCreateIndex:true,useFindAndModify:true,useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.on("connection",()=>{
    console.log("connected");
})
mongoose.connection.on("error",()=>{
    console.log("error");
})
// 

app.listen(PORT,()=>{
    console.log("connected to",PORT);
})
