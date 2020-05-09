'use strict';

const Sequelize = require('sequelize');
const HapiSequelize = require('hapi-sequelizejs');
const Bcrypt = require('bcrypt');
const Hapi = require('@hapi/hapi');
const config = require('./config.js');
const cron = require('node-cron');
const ServerQuery = require('./lib/ServerQuery.js');
const ServerController = require('./controller/Server.js');

const apiVersion = "/v1";

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

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

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

    server.route({
        method: 'GET',
        path: '/',
        options: {
          auth: 'simple'
        },
        handler: (request, h) => {
            return "Hello world!";
        }
    });

    server.route({
        method: 'GET',
        path: apiVersion + '/servers',
        options: {
          auth: 'simple'
        },
        handler: ServerController.list
    });

    server.route({
        method: 'GET',
        path: apiVersion + '/servers/{id}',
        options: {
          auth: 'simple'
        },
        handler: ServerController.get
    });

    server.route({
        method: 'POST',
        path: apiVersion + '/servers',
        options: {
          auth: 'simple'
        },
        handler: ServerController.create
    });

    server.route({
        method: 'PUT',
        path: apiVersion + '/servers/{id}',
        options: {
          auth: 'simple'
        },
        handler: ServerController.update
    });

    server.route({
        method: 'DELETE',
        path: apiVersion + '/servers/{id}',
        options: {
          auth: 'simple'
        },
        handler: ServerController.remove
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);

    // SCHEDULING OF SERVER CHECKING
    cron.schedule("* * * * *", function() {
      console.log("Running server check every minute..");
      ServerQuery.build("136.243.171.145", 2302).then((serverQuery) => {
        const db = HapiSequelize.instances.getDb();
        console.log(serverQuery.getCurrentPlayers() + "/" + serverQuery.getMaxPlayers());
      });
    });
    // END OF SCHEDULING OF SERVER CHECKING
};
// END OF REST API

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
