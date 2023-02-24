const { Router } = require('express'); // D: Voy a modularizar todas las rutas de Recipe. 
const { Recipe, Diet } = require('../db'); // D: agrego porque Pablo lo trae
// Importar todos los routers;


const { 
  getRecipeByIdHandler,
  getAllRecipesHandler,
  createRecipesHandler, 
} = require('../handlers/recipesHandlers'); // D: Mando todos los handlers a handlers/recipesHandlers

// Configurar los routers

const recipeRouter = Router();

recipeRouter.get('/:id', getRecipeByIdHandler); // D: Modularizo cada ruta para más orden, además trabajo sin comprometer las rutas con los handlers separados.

recipeRouter.get('/', getAllRecipesHandler);
  
recipeRouter.post('/', createRecipesHandler); // D: saqué recipes de la ruta
  
  
module.exports = recipeRouter;