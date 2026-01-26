import express from 'express';
import { Character } from '../models/Character.js';

export const router = express.Router();

// Home page: form + table
router.get("/", async (req, res, next) => {
    try{
        const characters = await Character.find();
        res.render("index", { 
            title: "Character Creator",
            characters: characters,
            types: ['Warrior', 'Druid', 'Bard', 'Elf', 'Wizard'],
            traits: ['Brave', 'Cunning', 'Wise', 'Charming', 'Loyal'],
            weapons: ['Sword', 'Staff', 'Voice', 'Dagger', 'Axe']
        });
    }
    catch(err){
        next(err);
    }
});
// Create character
router.post("/characters", async (req, res, next) => {
    try{
        const {name, type, trait} = req.body;
        await Character.create({name, type, trait, weapon});
        res.redirect("/");
    }
    catch(err){
        next(err);
    }
});

// Show character page
router.get("/characters/:id", async (req, res, next) => {
    try{
        const character = await Character.findById(req.params.id);
        
        if (!character){
            res.status(404).send("Character not found");
            return;
        }
        
        res.render("character", {
            title: character.name,
            character: character,
            weapon: character.weapon
        });
    }
    catch(err){
        next(err);
    }
});
