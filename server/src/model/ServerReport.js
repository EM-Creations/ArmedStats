/**
 * ServerReport model.
 * @module model/ServerReport
 * @author Edward McKnight (EM-Creations.co.uk)
 */
module.exports = function(sequelize, DataTypes) {
    const ServerReport = sequelize.define('ServerReport', {
        ping: DataTypes.INTEGER.UNSIGNED,
        playerCount: DataTypes.INTEGER.UNSIGNED
    });

    ServerReport.associate = function(models) {
        models.ServerReport.belongsTo(models.Server);
        models.ServerReport.belongsTo(models.Mission);
    };

    return ServerReport;
};
