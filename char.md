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

const characSchema = new mongoose.Schema({
    title:String,
    overview:String,
    id:Number,
      });

  const animeStorage = mongoose.model('recipeCol1', characSchema);



server.get('/',testHandler);
server.get('/getAllData',getDataHandler);

server.post('/addchartoDataBase',addDataHandler);
server.get('/getFavDataChar',getfavDataHandler);
server.delete('/deletDataChar',deletDataHandler);
server.put('/upDataChar',updateDataHandler);
/////http://localhost:3001/
function testHandler(req,res){
    console.log("localHost Work");
    res.send("perfectly work")
}
// http://localhost:3001/getAllData
/////////////////////** getDataHandler function*/
function getDataHandler(req,res){
    ////////21 object
    console.log("getDataHandler Work");
    const url=`https://psychonauts-api.herokuapp.com/api/characters?limit=10`
    console.log(url);
     axios.get(url).then(dataChar=>{
         console.log(dataChar,"url dataChar result")
          let testData=dataChar.data.map(dataContent=>{
              console.log(dataContent.psiPowers,"dataContent.psiPowers");
             return new saveResultContent(dataContent,dataContent.psiPowers)
         })
        //  console.log(testData,"testData result");
    res.send(testData)

     })}
/////////////////////** addDataHandler function*/
function addDataHandler(req,res){
    console.log("addRecipetoDataBase work server");
    console.log(req.body,"req.body");
    let idChar=req.params._id
    const {name,img,gender,description}=req.body
    
    animeStorage.find({idChar:_id},(error,movieCont)=>{
        if (movieCont.length>0){
            res.send(" this data already exist")
        }else{
          
            const newRecpi=new animeStorage({
                name:name,
                img:img,
                gender:gender,
                description:description,               
            })
            newRecpi.save()
            res.send(newRecpi)
        } })
}
//////////////////////////////////////getDataHandler function

function  getfavDataHandler(req,res){
    console.log("getDataHandler work");
    animeStorage.find({},(error,recpies)=>{
         res.send("work getDataHandler function")
    })  }
//////////////////////////////////////deletDataHandler function
function deletDataHandler(req,res){
    console.log("deletDataHandler");
    let idDelet=req.params._id
    animeStorage.findOneAndDelete({idDelet:id},(error,deletMovie))
    res.send("hello in delet function")
}
//////////////////////////////////////updateDataHandler function
function updateDataHandler(req,res){
    console.log("updateDataHandler");
   const idDelet=req.params.id
    const {overview,title}=req.body
    animeStorage.find({id:idDelet},(error,updateMovie))
    updateMovie[0].title = title ;
    updateMovie[0].overview = overview ;
    updateMovie[0].save();
    res.send(updateMovie[0]);
    res.send("hello in update function")
}
///////////////////////////////
    class saveResultContent{
        constructor(element,index){
            
            this.name=element.name,
           this.img=element.img,
            this._id=element._id;
            this.gender=element.gender;
            this._id=index.description;
            // console.log();
        }
    } 

server.listen(PORT,()=>{
    console.log(`this portWork continue ${PORT}`);
})