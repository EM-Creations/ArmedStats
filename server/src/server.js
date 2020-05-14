'use strict';

const Sequelize = require('sequelize');
const HapiSequelize = require('hapi-sequelizejs');
const Bcrypt = require('bcrypt');
const Hapi = require('@hapi/hapi');
const config = require('./config.js');

let registered = false;


// REST API
const validate = async (request, username, password) => {
  const user = config.USERS[username];
  var result = {
    credentials: null,
    isValid: false
  };

  if (user) {
    const isValid = await Bcrypt.compare(password, user.password);
    const credentials = {
      id: user.id,
      username: user.username
    };
    result = {
      isValid,
      credentials
    };
  }

  return result;
};

const server = Hapi.server({
     port: 3000,
     host: 'localhost'
 });

exports.init = async () => {
  await server.initialize();

  if (!registered) {
    await server.register(require('@hapi/basic'));
    await server.register([
    {
        plugin: HapiSequelize,
        options: [
            {
                name: config.DB.database, // identifier
                models: [__dirname + '/model/**/*.js'], // paths/globs to model files
                // ignoredModels: [__dirname + '/model/**/*.js'], // OPTIONAL: paths/globs to ignore files
                sequelize: new Sequelize(config.DB), // sequelize instance
                sync: true, // sync models - default false
                forceSync: false, // force sync (drops tables) - default false
            },
        ],
    },
    ]);

    server.auth.strategy('simple', 'basic', { validate });

    var routes = require('./routes');
    server.route(routes);

    registered = true;
  }

  return server;
};

exports.start = async () => {
  await server.start();
  console.log('Server running at: ${server.info.uri}');
  return server;
};
// END OF REST API

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});
