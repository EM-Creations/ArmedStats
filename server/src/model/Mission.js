module.exports = function(sequelize, DataTypes) {
    const Mission = sequelize.define('Mission', {
        name: DataTypes.STRING,
    });

    Mission.associate = function(models) {
        models.Mission.belongsTo(models.Server);
        models.Mission.belongsTo(models.Map);
        models.Mission.belongsTo(models.Author);
        models.Mission.hasMany(models.ServerReport);
    };

    return Mission;
};
