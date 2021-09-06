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

const movieSchema = new mongoose.Schema({
    title:String,
    overview:String,
    id:Number,
      });

  const filmStorage = mongoose.model('recipeCol1', movieSchema);


////https://api.edamam.com/search?q=${ingredient}&app_id=${process.env.FOOD_ID}&app_key=${process.env.FOOD_KEY}
server.get('/',testHandler);
server.get('/getAllData',getDataHandler);

server.post('/addMovietoDataBase',addDataHandler);
server.get('/getFavDataMovie',getfavDataHandler);
server.delete('/deletDataMovie',deletDataHandler);
server.put('/upDataMovie',updateDataHandler);
/////http://localhost:3001/
function testHandler(req,res){
    console.log("localHost Work");
    res.send("perfectly work")
}

/////////////////////** getDataHandler function*/
function getDataHandler(req,res){
    ////////21 object
    console.log("getDataHandler Work");
    const url=`https://api.themoviedb.org/3/movie/top_rated?api_key=8c9b4bb63cd4df69f04d4fdf4c64e9e0&language=en-US&page=1`
     axios.get(url).then(dataMovie=>{
         console.log(dataMovie,"url dataMovie result")
          let testData=dataMovie.data.results.map(dataContent=>{
             return new saveResultContent(dataContent)
         })
        //  console.log(testData,"testData result");
    res.send(testData)

     })}
/////////////////////** addDataHandler function*/
function addDataHandler(req,res){
    console.log("addRecipetoDataBase work server");
    console.log(req.body,"req.body");
    const {title,overview,id}=req.body
    
    filmStorage.find({id:id},(error,movieCont)=>{
console.log(recp);

        console.log(recpieCont);
        if (movieCont.length>0){
            res.send(" this data already exist")
        }else{
            const newRecpi=new filmStorage({
                title:title,
                overview:overview,
                id:id,
               
            })
            newRecpi.save()
            res.send(newRecpi)
        } })
}
//////////////////////////////////////getDataHandler function

function  getfavDataHandler(req,res){
    console.log("getDataHandler work");
    filmStorage.find({},(error,recpies)=>{
         res.send("work getDataHandler function")
    })  }
//////////////////////////////////////deletDataHandler function
function deletDataHandler(req,res){
    console.log("deletDataHandler");
    let idDelet=req.params.id
    filmStorage.findOneAndDelete({id:id},(error,deletMovie))
    res.send("hello in delet function")
}
//////////////////////////////////////updateDataHandler function
function deletDataHandler(req,res){
    console.log("deletDataHandler");
   const idDelet=req.params.id
    const {overview,title}=req.body
    filmStorage.find({id:idDelet},(error,updateMovie))
    updateMovie[0].title = title ;
    updateMovie[0].overview = overview ;
    updateMovie[0].save();
    res.send(updateMovie[0]);
    res.send("hello in update function")
}
    class saveResultContent{
        constructor(element){
            // console.log(element,"element result");
            this.title=element.title,
            // this.slice=element.overview.splice(",")
             this.overview=element.overview,
            this.id=element.id;
            console.log(element.title,"element.title");
        }
    } 

server.listen(PORT,()=>{
    console.log(`this portWork continue ${PORT}`);
})