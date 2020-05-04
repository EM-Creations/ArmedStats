// Config file
// Change variables in here then rename to config.js
exports.DB = {
    'dialect': 'mysql',
    'host': 'localhost',
    'port': 3306,
    'database': 'DATABASE NAME HERE',
    'username': 'USERNAME HERE',
    'password': 'PASSWORD HERE'
};

exports.USERS = {
  client: {
    username: 'client',
    password: '$2b$10$vHOuvRCzDwGpWZtHn.lkbu0GtODABiboYeOWid707rqtS5DVon8lm' // Bcrypt hash for 'ArmedStatsDefault'
  }
};
