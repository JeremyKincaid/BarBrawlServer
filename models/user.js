module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', { 
        email: {
            type: DataTypes.STRING, 
            allowNull: false, 
            unique: true
        }, 
        password: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        firstName: {
            type: DataTypes.STRING, 
            allowNull: true
        }, 
        lastName: {
            type: DataTypes.STRING, 
            allowNull: true
        }, 
        displayName: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        xp: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }) 
    return User; 
}