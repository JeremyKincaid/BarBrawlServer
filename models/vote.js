const Business = require('../Db').import('./business.js');
const Brawl = require('../Db').import('./brawl.js');
const User = require('../Db').import('./brawl.js');
module.exports = (sequelize, DataTypes) => {
    const Vote = sequelize.define('vote')
    Vote.belongsTo(Business, { as: 'business' });
    Vote.belongsTo(Brawl, { as: 'brawl' });
    Vote.belongsTo(User, { as: 'user' });
    return Vote;
}