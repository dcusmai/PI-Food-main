const { getRecipeById, getAllRecipes, searchRecipeByName, createRecipes } = require('../controllers/recipesController');

// GET| /recipes/:id
const getRecipeByIdHandler = async (req, res) => { // D: Acá están todos los handlers de Recipes modularizados para no comprometer las rutas por error
  const { id } =  req.params;   
  const source = isNaN(id) ? "food" : "api" // D: si es true, significa que la id es de nuestra db (UUID). Si es false, viene de la API (integer).
    try {
        const recipeById = await getRecipeById(id, source);      
        if(!recipeById) throw new Error ('Recipe does not exist :(');  
        res.status(200).json(recipeById);  
    } catch (error) {
        res.status(404).send(error.message);
    }
  };


// GET ALL RECIPES - GET| /recipes/name?=...

const getAllRecipesHandler =  async (req, res) => {
  const { name }  = req.query;  
  //try {
      const results = name ? searchRecipeByName(name) : await getAllRecipes()
      res.status(200).json(results);
}  
      /*
      const allRecipes = await getAllRecipes();
      
        const recipeByName = await getAllRecipes({
          where: {
                name
                }
        });
        res.status(200).json(recipeByName);
      }  
  } catch (error) {
      res.status(404).send(error.message);
  } */



/* FORMA DE DAIANA
const getAllRecipesHandler =  async (req, res) => {
    try {
        const { name }  = req.query;  
        if(!name) {
          const allRecipes = await getAllRecipes();
          res.status(200).json(allRecipes);
        } else {
          const recipeByName = await getAllRecipes({
            where: {
                  name
                  }
          });
          res.status(200).json(recipeByName);
        }  
    } catch (error) {
        res.status(404).send(error.message);
    }
  }; */


// POST| /recipes
const createRecipesHandler = async (req, res) => {
    try {
        const { name, image, summary, healthScore, steps } = req.body;  
        const newRecipe = await createRecipes(name, image, summary, healthScore, steps);  
        res.status(200).json(newRecipe);  
    } catch (error) {
        res.status(404).send(error.message);
    }
  };


module.exports = { 
    getRecipeByIdHandler, 
    getAllRecipesHandler, 
    createRecipesHandler,
  };