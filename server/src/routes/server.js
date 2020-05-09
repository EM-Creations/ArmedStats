const ServerController = require('../controller/Server.js');
const routesConfig = require('./config.js');

// Server endpoints

module.exports = [
  {
      method: 'GET',
      path: routesConfig.apiVersion + '/servers',
      options: {
        auth: 'simple'
      },
      handler: ServerController.list
  },

  {
      method: 'GET',
      path: routesConfig.apiVersion + '/servers/{id}',
      options: {
        auth: 'simple'
      },
      handler: ServerController.get
  },

  {
      method: 'POST',
      path: routesConfig.apiVersion + '/servers',
      options: {
        auth: 'simple'
      },
      handler: ServerController.create
  },

  {
      method: 'PUT',
      path: routesConfig.apiVersion + '/servers/{id}',
      options: {
        auth: 'simple'
      },
      handler: ServerController.update
  },

  {
      method: 'DELETE',
      path: routesConfig.apiVersion + '/servers/{id}',
      options: {
        auth: 'simple'
      },
      handler: ServerController.remove
  }
];
