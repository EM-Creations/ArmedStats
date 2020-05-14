const fs = require('fs');

let routes = [{
    method: 'GET',
    path: '/',
    handler: (request, h) => {
            return 'ArmedStats server';
    }
}];

fs.readdirSync(__dirname)
  .filter(file => ((file != 'index.js') && (file != 'config.js')))
  .forEach(file => {
    routes = routes.concat(require(`./${file}`))
  });

module.exports = routes;
