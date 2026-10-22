import { Pokemon } from "./pokemon.model";

export interface GymLeader{
    name:String;
    region:String;
    town:String;
    badge:String;
    specialty:String;
    aceLevel:String;
    motto:String;

    // Try to add other info later
    //Images cannot be implemented since MongoDB doesnt store img.
    //Implement image if and only if we find a site that provides those
    //images for us. While no, do not render.


}