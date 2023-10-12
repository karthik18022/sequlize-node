const Sequelize = require('sequelize');
const sequelize = require('../config/database.js')

const UserAnswer = sequelize.define( 'UserAnswer', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }    
});

module.exports = UserAnswer;