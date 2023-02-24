const { Router } = require('express'); // D: Voy a modularizar todas las rutas de Diet. 
// Importar todos los routers;

const {
    getAllDietsHandler,
} = require('../handlers/dietsHandlers')

// Configurar los routers

const dietRouter = Router();

dietRouter.get('/', getAllDietsHandler); // D: ver si está bien el path
  

module.exports = dietRouter;