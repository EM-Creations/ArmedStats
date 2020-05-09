const AuthorController = require('../controller/Author.js');
const routesConfig = require('./config.js');

// Author endpoints

module.exports = [
  {
      method: 'GET',
      path: routesConfig.apiVersion + '/authors',
      options: {
        auth: 'simple'
      },
      handler: AuthorController.list
  },

  {
      method: 'GET',
      path: routesConfig.apiVersion + '/authors/{id}',
      options: {
        auth: 'simple'
      },
      handler: AuthorController.get
  },

  {
      method: 'POST',
      path: routesConfig.apiVersion + '/authors',
      options: {
        auth: 'simple'
      },
      handler: AuthorController.create
  },

  {
      method: 'PUT',
      path: routesConfig.apiVersion + '/authors/{id}',
      options: {
        auth: 'simple'
      },
      handler: AuthorController.update
  },

  {
      method: 'DELETE',
      path: routesConfig.apiVersion + '/authors/{id}',
      options: {
        auth: 'simple'
      },
      handler: AuthorController.remove
  }
];
