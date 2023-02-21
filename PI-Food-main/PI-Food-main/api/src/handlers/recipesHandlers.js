const { getRecipeById, getAllRecipes, createRecipes } = require('../controllers/recipesController');

const getRecipeByIdHandler = async (req, res) => { // D: Acá están todos los handlers de Recipes modularizados para no comprometer las rutas por error
    try {
        const { id } =  req.params;  
        const recipeById = await getRecipeById(id);      
        if(!recipeById) throw new Error ('Recipe does not exist');  
        res.status(200).send(recipeById);
  
    } catch (error) {
        res.status(404).send(error.message);
    }
  };
  
const getAllRecipesHandler =  async (req, res) => {
    try {
        const { name }  = req.query;  
        if(!name) {
          const allRecipes = await getAllRecipes();
          res.status(200).send(allRecipes);
        } else {
          const recipeByName = await getAllRecipes({
            where: {
                  name
                  }
          });
          res.status(200).send(recipeByName);
        }  
    } catch (error) {
        res.status(404).send(error.message);
    }
  };



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