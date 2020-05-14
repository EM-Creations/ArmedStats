/**
 * Map model.
 * @module model/Map
 * @author Edward McKnight (EM-Creations.co.uk)
 */
module.exports = function(sequelize, DataTypes) {
    const Map = sequelize.define('Map', {
        name: DataTypes.STRING,
    });

    Map.associate = function(models) {
        models.Map.hasMany(models.Mission);
    };

    return Map;
};
