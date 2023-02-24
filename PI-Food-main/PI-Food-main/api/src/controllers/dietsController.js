const { Diet } = require('../db'); // Creo los Controllers porque mis Handlers no tienen que interactuar directamente con los modelos, pero los controller si pueden.


const getAllDiets = async(name) => {
    return await Diet.findAll({ name }); // D: Acá debemos colocar el parámetro de busqueda
}


module.exports = { getAllDiets };