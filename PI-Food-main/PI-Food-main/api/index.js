//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { sequelize } = require('./src/db.js'); // D: ¿Por qué le llama conn? ¿No sería sequelize/database? connection

// Syncing all the models at once.
sequelize.sync({ force: true }).then(() => { // D: RECORDAR PONER FORCE EN FALSE CUANDO TERMINE DE DISEÑAR LA APP
  console.log('Database conected, all Ok!'); // D: Esto lo agregué para ver en consola que esté la DB conectada. 
  server.listen(3001, () => {
    console.log('listening at 3001'); // eslint-disable-line no-console // D: VER SI TENGO QUE CAMBIAR ESTA LINEA. Saqué '%s' de listening at 3001
  });
});
