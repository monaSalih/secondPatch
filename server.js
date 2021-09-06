'use strict'
const express = require('express');
const cors = require('cors');
require('dotenv').config('axios');
const axios = require('axios');

const PORT = process.env.PORT
const server = express()
server.use(cors());
server.use(express.json())
const mongoose = require('mongoose');
mongoose.connect(process.env.LOCALMONGO, { useNewUrlParser: true, useUnifiedTopology: true });
const cookSchema = new mongoose.Schema({
    image: String,
    label: String,
    ingredientLines: Array,
});

const recipeStorage = mongoose.model('recipeCol1', cookSchema);
// let localDataBase=[];

////https://api.edamam.com/search?q=${ingredient}&app_id=${process.env.FOOD_ID}&app_key=${process.env.FOOD_KEY}
server.get('/', testHandler);
server.get('/getRecipe', getDataHandler);
server.post('/addRecipetoDataBase', addDataHandler);
server.get('/getFavDataRecipe',getfavDataHandler);
server.delete ('/deletDataRecipe/:id',deletDataHandler);
server.put('/updateDataRecipe/:_id',updateDataHandler);
/////http://localhost:3001/
function testHandler(req, res) {
    console.log("localHost Work");
    res.send("perfectly work")
}

/////////////////////** getDataHandler function*/
function getDataHandler(req, res) {
    /////10 object
    console.log("getDataHandler Work");
    // res.send("getDataHandler brows work")
    let ing = req.query.ingredient
    console.log(ing, "ingredeant result");
    const url = `https://api.edamam.com/search?q=${ing}&app_id=${process.env.FOOD_ID}&app_key=${process.env.FOOD_KEY}`
    axios.get(url).then(dataRecipe => {
                // console.log(dataRecipe.data,"without .data");
        let testData = dataRecipe.data.hits.map(dataContent => {
            //  console.log(dataContent,"result dataContent");
            return new saveResultContent(dataContent.recipe)
        })
        //    console.log(testData,"resullllllllllllt");
        //   localDataBase.push(testData);
        //   console.log(localDataBase,"localDataBase result");
        res.send(testData)

    }).catch(
        error=>{
            console.log(error,"error in get dataHandlear");
        }
    )
}
/////////////////////** addDataHandler function*/
function addDataHandler(req, res) {
    // console.log("addRecipetoDataBase work server");
    // console.log(req.body, "req.body");
    const { image, label, ingredientLines } = req.body
    // console.log(req.body, "req.bodyresult");
    recipeStorage.find({ label: label }, (error, recpieCont) => {
        if (error) {
            console.log(error);
        } else if (recpieCont.length > 0) {

            res.send(" this data already exist")
        } else {

            const newRecpi = new recipeStorage({
                image: image,
                label: label,
                ingredientLines: ingredientLines,

            })
            newRecpi.save()
            res.send(newRecpi)
        }
    })
}
       

//////////////////////////////////////getDataHandler function

function  getfavDataHandler(req,res){
    // console.log("getDataHandler work");
    recipeStorage.find({},(error,recpies)=>{
        // console.log(recpies);
         res.send(recpies)
    })  }
//////////////////////////////////////deletDataHandler function
function deletDataHandler(req,res){
    // console.log("deletDataHandler");
    const id=req.params.id;
    // console.log(id,"data id from frontend");
    recipeStorage.findOneAndDelete({_id:id},(error,deletMovie)=>{
        recipeStorage.find({},(error,data)=>{
             res.send(data)
        })   
    })
   
}
///////////////////////////////////////////updateHandler

function updateDataHandler(req,res){
  console.log("hello");
    const {image,label} =req.body;
    console.log("11111111111111",req.body);
    // console.log(req.query.label);
       const idItem= req.params._id;
       
       console.log( req.params,2222222222222222);
    //    console.log(req.body.image,"tessssssssssssssssssssssssssssssssssssst"); 
       recipeStorage.findOne({ _id:idItem},(error,recpiesUpdate)=>{
        console.log(recpiesUpdate,"recpiesUpdate result");
              recpiesUpdate.label=label
        recpiesUpdate.image=image
        // console.log(recpiesUpdate);
        recpiesUpdate.save()
         res.send(recpiesUpdate)
    })
   
} 
/////////////////////////////////////**class  */
class saveResultContent {
    constructor(element) {
        // console.log(element,"inside Counstructor");
        this.image = element.image,
            this.label = element.label,
            this.ingredientLines = element.ingredientLines;
        // this.foodId=element.foodId
        // console.log(element);
        // console.log(element.ingredientLines,"element.ingredientLines");
    }
}

server.listen(PORT, () => {
    console.log(`this portWork continue ${PORT}`);
})