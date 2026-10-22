import { Pokemon } from "./pokemon.model";

export interface GymLeader{
    name:String;
    region:String;
    pokemonTeam:Pokemon[];
    description:String;
    motto:String;
    spritePath:String;
    badgePath:String;
    //Maybe add team

}