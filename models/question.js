const Sequlize = require('sequelize')
const sequelize = require('../config/database.js');

const Question = sequelize.define( "Question",  {

    id : {
        type: Sequlize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    desc: {
        type: Sequlize.STRING,
        allowNull: false,
    }
    
});


// sequelize.Question.belongsTo(sequelize.QuestionChoice, {
//     foreignKey: 'questionChoiceId', 
//     as: 'question_choice'
//   });

// Question.belongsTo(Choice, {foreignKey: 'questionId', as :'questionId'})

module.exports =  Question;