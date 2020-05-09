const fs = require('fs');

let routes = [];

fs.readdirSync(__dirname)
  .filter(file => ((file != 'index.js') && (file != 'config.js')))
  .forEach(file => {
    routes = routes.concat(require(`./${file}`))
  });

module.exports = routes;
