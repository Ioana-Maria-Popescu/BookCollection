const Sequelize = require("sequelize");
const config = require("./config.js");

const connection = new Sequelize(config.development);
const modelDefinitions =[
    require('./models/user.js')
];
for (const modelDefinition of modelDefinitions)
    {
        modelDefinition(connection);
    }
module.exports = connection;

/*exports.connection = (async () => {
    const resolvedModules = await Promise.all([
        user = require("./src/models/user.js")
    ]);
    for (const resolvedModule of resolvedModules)
    {
      resolvedModule.default(connection);
    }
  
    await connection.sync({ alter: true });
  
  })().catch(err => {
    console.error("Error initializing the database: ", err);
  });*/

//export default connection;