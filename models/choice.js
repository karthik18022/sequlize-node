const Sequelize = require('sequelize');
const sequelize = require('../config/database.js');
const Question = require('../models/question.js');

const Choice = sequelize.define("Choice", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    desc: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    correctAnswer: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
});

// Define the relationship on the Question model
// Question.hasMany(Choice, { foreignKey: 'questionId', as: 'choices' });

module.exports = Choice;
