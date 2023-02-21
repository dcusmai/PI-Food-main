const { Recipe } = require('../db'); // Creo los Controllers porque mis Handlers no tienen que interactuar directamente con los modelos, pero los controller si pueden.


const getRecipeById = async(id) => {
    return await Recipe.findByPk({id});
}

const getAllRecipes = async(name) => {
    return await Recipe.findAll({name});
}

const createRecipes = async (name, image, summary, healthScore, steps) => {
    const newRecipe =  await Recipe.create({name, image, summary, healthScore, steps});
    return newRecipe;
}


module.exports = { getRecipeById, getAllRecipes, createRecipes };