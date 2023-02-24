const { Recipe } = require('../db'); // Creo los Controllers porque mis Handlers no tienen que interactuar directamente con los modelos, pero los controller si pueden.
const axios = require('axios');
//require('dotenv').config();
const { API_KEY } = process.env;
//const Recipe = require('../models/Recipe');

const getRecipeById = async(id, source) => { // D: No me anda la API
    const recipe = 
        source === "api" ?
            (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data // D: &offset=${id}
            : await Recipe.findByPk(id); // D: con esto, me filtra por el tipo de Id (integer/UUID) y trae el que corresponde de la API o DB
    return recipe;
};

const getAllRecipes = async() => {
    const databaseRecipes = await Recipe.findAll();
    const apiRecipesRaw = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data.results; // D: Me trae la info cruda
    
    const cleanArray = (arr) =>
        arr.map((elem) => {
        return {
            id: elem.id,
            name: elem.title,
            image: elem.image,
            summary: elem.summary,
            healthScore: elem.healthScore,
            steps: (elem.analyzedInstructions[0] && elem.analyzedInstructions[0].steps ? elem.analyzedInstructions[0].steps.map(e => e.step).join("| ") : 'No hay pasos')
        }
    });

    const apiRecipes = cleanArray(apiRecipesRaw);
    
    return [...databaseRecipes, ...apiRecipes];
    }

const searchRecipeByName = async(name) => {
    const recipesApiDb = await getAllRecipes(); //(rec) => {        rec.name.toLowerCase() === name.toLowerCase();
    const recipesFounded = await recipesApiDb.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
    
    
    if(!recipesFounded) throw new Error('Recipe not fouded');
    return recipesFounded;
    
}

const createRecipes = async (name, image, summary, healthScore, steps) => {
    const newRecipe =  await Recipe.create({name, image, summary, healthScore, steps});
    return newRecipe;
}


module.exports = { getRecipeById, getAllRecipes, searchRecipeByName, createRecipes };