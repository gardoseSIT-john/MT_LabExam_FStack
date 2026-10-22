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
    name:String, //The name
    region:String,  //The region...
    pokeTeam:{ //This one uses the custom schema for team
        type:[pokemonTeamSchema],
        required:true
    },
    description:String, //Description...
    motto:String, //The leader's Moto
    spritePath :String, //I assume we can feed the string to HTMl, Its the path relative to the project's file directory..
    badgePath: String //Similar functionality from the one uptop...
})

gymLeaderModel = new mongoose.model(//NOw this bugger creates the model for mongoose. Now I assume we can store it in MongoDB as is.
    'GymLeader',
    gymLeaderSchema
)





