'use strict';

const Sequelize = require('sequelize');
const HapiSequelize = require('hapi-sequelizejs');
const Bcrypt = require('bcrypt');
const Hapi = require('@hapi/hapi');

let registered = false;

module.exports = class ServerInstance {
  config = null;
  server = null;
  validate = null;

  constructor(mode) {
    if ("test" == mode.toLowerCase()) {
      this.config = require('../test/config.js');
    } else {
      this.config = require('./config.js');
    }

    // REST API
    this.validate = async (request, username, password) => {
      const user = this.config.USERS[username];
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

    this.server = Hapi.server({
         port: 3000,
         host: 'localhost'
     });
  }

  async init() {
    await this.server.initialize();

    if (!registered) {
      await this.server.register(require('@hapi/basic'));
      await this.server.register([
      {
          plugin: HapiSequelize,
          options: [
              {
                  name: this.config.DB.database, // identifier
                  models: [__dirname + '/model/**/*.js'], // paths/globs to model files
                  // ignoredModels: [__dirname + '/model/**/*.js'], // OPTIONAL: paths/globs to ignore files
                  sequelize: new Sequelize(this.config.DB), // sequelize instance
                  sync: true, // sync models - default false
                  forceSync: false, // force sync (drops tables) - default false
              },
          ],
      },
      ]);

      const validate = this.validate;
      this.server.auth.strategy('simple', 'basic', { validate });

      var routes = require('./routes');
      this.server.route(routes);

      registered = true;
    }

    return this.server;
  }

  async start() {
    await this.server.start();
    console.log('Server running at: ' + this.server.info.uri);
    return this.server;
  }
  // END OF REST API

}

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});
