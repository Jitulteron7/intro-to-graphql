const graphql=require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const Books =require("../models/Books")
const Author =require("../models/Author")
const BookType =new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id:{type:graphql.GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        authorId:{
            type:AuthorType,
            resolve(parents,args){
                // return Author.findById(parents.authorId)
            }
        }
    })
});

const AuthorType=new GraphQLObjectType({
    name:"Author",
    fields:()=>({
        id:{type:graphql.GraphQLID},
        name:{type:GraphQLString},
        age:{type:graphql.GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parents,args){
                return Books.find({authorId:parents.id})
            }
        }
    })
});

// initial query start
const RootQuery=new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        book:{
            // 5fa7ffc5a326a43bc8225226
            type:BookType,
            args:{authorId:{type:GraphQLID}},
            resolve(parent,args){
                // return Books.findOne(JOSN.);
                return Books.findById(args.authorId)
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
                return Author.findById(args.id);
            }   
        },
        books:{
            type:new graphql.GraphQLList(BookType),
            resolve(parents,args){
                return Books.find({});
            }
        },
        authors:{
            type:new graphql.GraphQLList(AuthorType),
            resolve(parents,args){
                return Author.find({});
            }
        }
    }
});

const Mutation=new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                age:{type:GraphQLNonNull(graphql.GraphQLInt)}
            },
            resolve(parents,args){
                let authors=new Author({
                    name:args.name,
                    age:args.age
                });
              return  authors.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new graphql.GraphQLNonNull(GraphQLString) },
                genre: { type: new graphql.GraphQLNonNull(GraphQLString) },
                authorId: { type: new graphql.GraphQLNonNull(graphql.GraphQLID) }
            },
            resolve(parent, args){
                let book = new Books({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
})



module.exports=new graphql.GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})