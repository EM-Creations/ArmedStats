// Test config file
exports.DB = {
    dialect: 'sqlite',
    host: 'localhost',
    database: 'armedstatstestdb',
    storage: './test/testdb.sqlite'
};

exports.USERS = {
  client: {
    username: 'client',
    password: '$2b$10$vHOuvRCzDwGpWZtHn.lkbu0GtODABiboYeOWid707rqtS5DVon8lm' // Bcrypt hash for 'ArmedStatsDefault'
  }
};
