'use strict';

const Sequelize = require('sequelize');
const Hapi = require('@hapi/hapi');
const config = require('./config.js');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register([
    {
        plugin: require('hapi-sequelizejs'),
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

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
