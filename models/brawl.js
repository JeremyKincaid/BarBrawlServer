const Business = require('../Db').import('./Business.js');

module.exports = (sequelize, DataTypes) => {
    const Brawl = sequelize.define('brawl', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        drink: {
            type: DataTypes.STRING,
            allowNull: false
        },
        business1Pic: { 
            type: DataTypes.STRING,
            allowNull: true
        },
        business2Pic: { 
            type: DataTypes.STRING,
            allowNull: true
        },
        startDate: { 
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: { 
            type: DataTypes.DATE,
            allowNull: false
        },
        winnerId: { 
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })
    Brawl.belongsTo(Business, { as: 'business1' });
    Brawl.belongsTo(Business, { as: 'business2' });

    return Brawl;
}