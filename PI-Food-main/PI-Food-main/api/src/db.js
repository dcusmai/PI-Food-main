require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');


const recipeModel = require('./models/Recipe'); // D: Agregué estas dos líneas para presentar los modelos a la db. Pablo no lo tiene
const dietsModel = require('./models/Diet');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, API_KEY, // D: Agregé DB_NAME y API_KEY
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, { // D: Cambio food por ${DB_NAME} de mi db. OTRO: No veo que pongan el nro de puerto 5432¿?
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

recipeModel(sequelize); // D: invoco a las fc que cree y le paso como parámetro la db (ver si es sequelize/datasbase/food)
dietsModel(sequelize); // D: idem

// console.log(sequelize.models) // { Recipe: Recipe, Diet: Diet }

const { Recipe, Diet } = sequelize.models; // D: Esto me lo dan así, agrego Diet. Destructuring de la db sequelize

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Recipe.belongsToMany(Diet, {through: 'RecipeDiets'}); // D: Establezco la relación de muchos a muchos y se crea la tabla intermedia RecipeDiets
Diet.belongsToMany(Recipe, {through: 'RecipeDiets'}); // D: idem



// D: Qué hace este código? lee la carpeta models, define los modelos (cada archivo con su nombre) y define llamando a la función pasando (sequelize). Ver models

module.exports = {
  sequelize,     // para importart la conexión { conn } = require('./db.js');
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
};
