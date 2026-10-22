require('dotenv').config;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { required } = require('@angular/forms/signals');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

app.listen(3000,() =>{
    console.log("It is working! Port 3000 Initiated!");
});

//This is new info, make models for mongoDB to use.


const pokemonTeamSchema = new mongoose.Schema({
    name:String,
    description:String,
    type:String,
    item:String
})

const gymLeaderSchema = new mongoose.Schema({
   name:String,
   region:String,
   town:String,
   badge:String,
   specialty:String,
   aceLevel:String,
   motto:String
})

gymLeaderModel = new mongoose.model(//NOw this bugger creates the model for mongoose. Now I assume we can store it in MongoDB as is.
    'GymLeader',
    gymLeaderSchema
)




//Post and Other Functions

app.post('/api/leaders', async (req, res) =>{
    const leader = new gymLeaderModel(req.body);
    await leader.save();
    res.send(leader);console.log("Added a new Leader: ", leader)
})

app.get('api/leaders', async(req,res) =>{
    const leaders = new gymLeaderModel.find({});
    res.send(leaders); console.log("Fetched all leader entries: ", leaders);
})

app.delete('api/leaders/:id', async(req,res) =>{
    try{
        //We use custom delete function here...
    }
})

app.update('api/leaders/:id', async(req,res) =>{
    try{

    }
})











