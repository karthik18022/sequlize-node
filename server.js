const express = require('express')
const sequelize = require("./config/database.js")
require("./config/dotenv");
const users = require("./routes/UserEndpoint.js");
const question = require("./routes/questionEndpoint.js");
const choiceEndpoint = require('./routes/choiceEndpoint.js');
const userAnswerEndpoint = require('./routes/userAnswerEndpoint.js');
const Choice = require('./models/choice.js');
const User = require('./models/user.js');
const Question = require('./models/question.js');
const UserAnswer = require('./models/userAnswer.js');
const app = express(); //Initialized express
app.use(express.json());
app.use("/user", users);
app.use("/question", question)
app.use("/choice", choiceEndpoint)
app.use('/userAnswer', userAnswerEndpoint)
const port = process.env.PORT || 5000;

app.listen(port, () => {

    console.log(`Here we go, Engines started at ${port}.`);

});

Question.hasMany(Choice, { foreignKey: 'questionId', as: 'choices' });
User.hasMany(UserAnswer, {foreignKey: 'userId', as : 'userAnswers' });
Choice.hasOne(UserAnswer);

async function initializeDatabase() {
    try {
      await sequelize.sync();
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  initializeDatabase();