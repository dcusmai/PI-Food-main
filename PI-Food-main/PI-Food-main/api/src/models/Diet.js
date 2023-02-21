const { DataTypes } = require('sequelize');

module.exports = (sequelize) => { // D: Acá podría usar database en vez de sequelize, sería más claro.

   sequelize.define('diet', { // D: En Recipe.js recipe está en minúscula? Ver si acá la tengo que poner igual

    id:{
        type: DataTypes.INTEGER, // D: Ver si es necesario usar esta id o la puedo descartar. Puede ser necesario cambiar integer por UUID
        primaryKey: true,
        autoIncrement: true

      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
   }, {timestamps: false });
};