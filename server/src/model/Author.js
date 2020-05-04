module.exports = function(sequelize, DataTypes) {
    const Author = sequelize.define('Author', {
        name: DataTypes.STRING,
    });

    Author.associate = function(models) {
        models.Author.hasMany(models.Mission);
    };

    return Author;
};
