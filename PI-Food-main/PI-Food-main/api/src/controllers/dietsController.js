const { Diet } = require('../db'); // Creo los Controllers porque mis Handlers no tienen que interactuar directamente con los modelos, pero los controller si pueden.



const getAllDiets = async() => {
    const allDiets = await Diet.findAll();
    if(allDiets.length) {
        return allDiets;
    };
    
    const diets = [
        "gluten free",
        "ketogenic",
        "vegetarian",
        "lacto-vegetarian",
        "ovo-vegetarian",
        "lacto ovo vegetarian",
        "vegan",
        "pescetarian",
        "paleolithic",
        "primal",
        "low fodmap",
        "whole 30",
        "dairy free",
      ];  

    diets.forEach((elem) => {
        Diet.findOrCreate({
            where: { name: elem },
        });
      });
    const allDietsDb = await Diet.findAll();
    return allDietsDb;
};

module.exports = { getAllDiets };