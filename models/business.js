const User = require('../Db').import('./user.js');

module.exports = (sequelize, DataTypes) => {
    const Business = sequelize.define('business', {
        name: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        wins: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        losses: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    })

    Business.belongsTo(User, { as: 'user' });


    return Business;
}