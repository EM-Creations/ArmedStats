module.exports = function(sequelize, DataTypes) {
    const Map = sequelize.define('Map', {
        name: DataTypes.STRING,
    });

    Map.associate = function(models) {
        models.Map.hasMany(models.Mission);
        models.Map.hasMany(models.ServerReport);
    };

    return Map;
};
