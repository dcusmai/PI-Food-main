const { Router } = require('express'); // D: Voy a modularizar todas las rutas de Diet. 
// Importar todos los routers;

const dietRouter = Router();
// Configurar los routers

const getDietsHandler = // D: ver si vale la pena hacer un handler por separado


dietRouter.get('/diets', async (req, res) => {
    try {
      
      const allDiets = await Diets.findAll();
      
      res.status(200).json(allDiets)
  
    } catch (error) {
        res.status(404).send(error.message);
    }
  })
  

module.exports = dietRouter;