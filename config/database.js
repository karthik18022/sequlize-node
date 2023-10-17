const Sequlize = require("sequelize");
const {  Liquibase, POSTGRESQL_DEFAULT_CONFIG } = require('liquibase');


const sequelize = new Sequlize(
    'quiz',
    'postgres',
    'demo', {
       dialect: 'postgres',
       port: process.env.PSQL_PORT,
       host: process.env.PSQL_HOST,  

    }
);


const myConfig = {
	...POSTGRESQL_DEFAULT_CONFIG,
	url: 'jdbc:postgresql://localhost:5432/quiz',
	username: 'postgres',
	password: 'demo',
    changeLogFile: './changesets/changelog.xml',

}
const instance = new Liquibase(myConfig);

async function doEet() {
	await instance.status();
	await instance.update();
}

doEet();

module.exports = sequelize; 