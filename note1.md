https://api.edamam.com/search?q=rice&app_id=295cff5b&app_key=6463db8febf24c271e1259bde92921b8

http://localhost:3001/getAllData
/getRecipe

mongodb://monadb:0000@monasalihdata-shard-00-00.pwmoz.mongodb.net:27017,monasalihdata-shard-00-01.pwmoz.mongodb.net:27017,monasalihdata-shard-00-02.pwmoz.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-e4kzqj-shard-0&authSource=admin&retryWrites=true&w=majority

'use strict'
const express=require('express');
const cors=require('cors');
require ('dotenv').config('axios');
const axios=require('axios');

const PORT=process.env.PORT
const server=express()
server.use(cors());
server.use(express.json())
const mongoose = require('mongoose');
mongoose.connect(process.env.LOCALMONGO,{ useNewUrlParser: true, useUnifiedTopology: true });



/////////////////
mongodb://localhost:27017/cookExam
/////////////////////////////dataBase
const cookSchema = new mongoose.Schema({
    image:String ,
    label:String, 
    ingredientLines:[String],
  });

  const recipeStorage = mongoose.model('recipeCol1', cookSchema);

//   function seedBookData(){
//       const bookExam01=new BookStorage({
//         image: ,
//         label:, 
//         ingredientLines:,
//       })
//       bookExam01.save();
//       bookExam02.save();
//       bookExam03.save();
//   }

//   seedBookData()

//////////////////////////////////////
// hello test
server.get('/',testHandler);
server.get('/recepies',recepieHandler)
server.post('/addrecipe',addrecipe)
function testHandler(req,res){
    res.send("hello from testHandelar funcrion ")
   console.log("we can see this function");
}
// https://api.edamam.com/search?q=${ingredient}&app_id=${process.env.FOOD_API_ID}&app_key=${process.env.FOOD_API_KEY}

function recepieHandler(req,res){
    console.log(req.query);
    let ingredient=req.query.ingredient
    let url=`
    
    `

     axios.get(url).then(result=>{
        //  console.log(result.data.hits);
         const recipeArr=result.data.hits.map(recipeApp=>{
            //  console.log(recipeApp);
             return new RecipeClass(recipeApp)
         })
         console.log(recipeArr); 
         res.send(recipeArr)
     })
}
//////////////////////////add
function addrecipe(req,res){
// console.log(req.query);
console.log("helloooooooooooooo");
// console.log(req.body);
// console.log(typeof req.body.ingrediant,"ingrediant test")
const {label,image,ingredientLines}=req.body
const newRecipe=new recipeStorage({
    image:image ,
    label:label, 
    ingredientLines:ingredientLines,
})
newRecipe.save();
console.log(newRecipe,"newRecipe resultSend");
res.send(newRecipe)
}
//////////////////////////////
class RecipeClass{
    constructor(data){
        this.label=data.recipe.label;
        this.image=data.recipe.image;
        this.ingredientLines=data.recipe.ingredientLines
    }
}


 server.listen(PORT,()=>{
    console.log(`this portWork continue${PORT}`);
})