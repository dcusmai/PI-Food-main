const { getAllDiets } = require('../controllers/dietsController');

const getAllDietsHandler =  async (req, res) => { // D: tomar esto solo como esqueleto. Hay que armar la lógica
    try {
        const { name }  = req.query;  
        if(!name) {
          const allDiets = await getAllDiets();
          res.status(200).send(allDiets);
        } else {
          const DietByName = await getAllDiets({
            where: {
                  name
                  }
          });
          res.status(200).send(DietByName);
        }  
    } catch (error) {
        res.status(404).send(error.message);
    }
  };

  module.exports = { getAllDietsHandler }