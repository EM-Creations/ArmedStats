module.exports = function(sequelize, DataTypes) {
    const Server = sequelize.define('Server', {
        name: DataTypes.STRING,
        ip: DataTypes.STRING,
        port: DataTypes.INTEGER.UNSIGNED
    });

    Server.associate = function(models) {
        models.Server.hasMany(models.Mission);
        models.Server.hasMany(models.ServerReport);
    };

    return Server;
};
