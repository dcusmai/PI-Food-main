const { Router } = require('express'); // D: Voy a modularizar todas las rutas de Recipe. 
// Importar todos los routers;

const { 
  getRecipeById, 
  getAllRecipes, 
  createRecipes, 
} = require('../handlers/recipesHandlers'); // D: Mando todos los handlers a handlers/recipesHandlers

const recipeRouter = Router();
// Configurar los routers

recipeRouter.get('/recipes/:id', getRecipeById); // D: Modularizo cada ruta para más orden, además trabajo sin comprometer las rutas con los handlers separados.

recipeRouter.get('/recipes', getAllRecipes);
  
recipeRouter.post('/recipes', createRecipes);
  
  
module.exports = recipeRouter;