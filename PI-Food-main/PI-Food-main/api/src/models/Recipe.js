const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => { // D: Acá podría usar database en vez de sequelize, sería más claro.
  // defino el modelo
  sequelize.define('recipe', { // D: ¿Acá recipe no iría con mayúscula? Recipe

    id:{
      type: DataTypes.UUID,
      defaultValue:  DataTypes.UUIDV4, // D: default es para que se genere solo
      primaryKey: true,
      // autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      //allowNull: false
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.FLOAT, 
      //allowNull: false,
    },
    steps: {
      type: DataTypes.TEXT,
      //allowNull: false
    },
    created: {
      type: DataTypes.BOOLEAN, // D: esto me sirve como flag para poder buscar rápidamente cuales recipes son de mi db (tienen esta prop en true) y cuáles de la API (no tienen esta prop)
      defaultValue: true
    }
  }, {timestamps: false });
};
