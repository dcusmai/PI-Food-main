const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipeRouter = require('./recipeRouter'); // D: Requiero mis rutas recipeRouter y dietRouter
const dietRouter = require('./dietRouter');


const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipeRouter); // D: ante cualquier petición a /recipes, que vaya a recipeRouter.
router.use('/diets', dietRouter); // D: ante cualquier petición a /diets, que vaya a dietRouter.


module.exports = router;