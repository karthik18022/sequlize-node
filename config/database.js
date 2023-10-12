const Sequlize = require("sequelize");

const sequelize = new Sequlize(
    'quiz',
    'postgres',
    'demo', {
       dialect: 'postgres',
       port: process.env.PSQL_PORT,
       host: process.env.PSQL_HOST,  
    }
);

module.exports = sequelize; 