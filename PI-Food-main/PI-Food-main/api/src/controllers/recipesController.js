const { Recipe, Diet } = require('../db'); // Creo los Controllers porque mis Handlers no tienen que interactuar directamente con los modelos, pero los controller si pueden.
const axios = require('axios');
//require('dotenv').config();
const { API_KEY } = process.env;
//const Recipe = require('../models/Recipe');
const { getAllDiets } = require('../controllers/dietsController'); // D: me lo traigo para tratar de relacionar las diets con recipes


// GET| /recipes/:id

const getRecipeById = async(id, source) => { // D: Ya anda la API pechocha
    const recipe = 
        source === "api" ? // D: con esto, me filtra por el tipo de Id (integer/UUID) y trae el que corresponde de la API o DB
            (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data.results.map((e) => { // /${id} 
                return {
                    id: e.id,
                    name: e.title,
                    summary: e.summary,
                    image: e.image,
                    healthScore: e.healthScore,
                    steps: (e.analyzedInstructions[0] && e.analyzedInstructions[0].steps ? e.analyzedInstructions[0].steps.map(el => el.step).join("| ") : 'No steps availables'),
                    diets: e.diets?.map((ele) => ele),
                    created: false // D: Flag para poder filtrar entre db (true) y api (false)
                }
            }).find(recipe => recipe.id === parseInt(id))
            : await Recipe.findByPk(id, {
                include: {  // 
                    model: Diet,
                    attributes: ['name'],
                }
            }
            ); 
    return recipe;
};


// GET ALL RECIPES - GET| /recipes/name?=...

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
            steps: (elem.analyzedInstructions[0] && elem.analyzedInstructions[0].steps ? elem.analyzedInstructions[0].steps.map(e => e.step).join("| ") : 'No steps availables'),
            diets: elem.diets?.map((ele) => ele),
            created: false // D: Flag para poder filtrar entre db (true) y api (false)
        }
    });

    const apiRecipes = cleanArray(apiRecipesRaw);
    
    return [...databaseRecipes, ...apiRecipes];
    }

const searchRecipeByName = async(name) => {
    const recipesApiDb = await getAllRecipes();
    const recipesFounded = await recipesApiDb.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
    return recipesFounded;    
}


// POST| /recipes

const createRecipes = async (name, image, summary, healthScore, steps, diets) => {
    const newRecipe =  await Recipe.create({name, image, summary, healthScore, steps, diets});
    const dietRecipeDb = await Diet.findAll({
        where: {name},
    })
    newRecipe.addDiet(dietRecipeDb)
    return newRecipe;
}


module.exports = { getRecipeById, getAllRecipes, searchRecipeByName, createRecipes };