const bcrypt = require('bcrypt')

const jwt = require("jsonwebtoken");

const  User = require('../models/user.js');

exports.userCreation = async (req, res) => {
    const { email, user_name, password } = req.body;

    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
        res.status(400).send("user already exists");
        return res;
    }
    const user = {
        user_name,
        email,
        password: await hashGeneration(password)
    }

    const data = await User.create({ user_name: user.user_name, email: user.email, password: user.password });
    if (data) {
        res.status(200).send({ message: 'User added to database, not verified' });
        jwt.sign(user.email, 'ben103', (err, token) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Token:', token);
            }
        });
        return res;
    } else {
        res.status(500).send({ message: 'User not added. Error occured...' });
        return res;
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body;
    const existingUser = await User.findOne({ where: { email: email } });
    console.log(existingUser);
    if (!existingUser) {
        res.status(400).send("user doesn't exists");
        return res;
    }
    const user = existingUser.dataValues;
    const value = await checkPassword(password, user.password, user.email, user.id);
    console.log('value', value);
    return res.status(200).json(value);
}


const hashGeneration = async (password) => {
    try {
        const hash = await bcrypt.hash(password, 10);
        console.log("private hash", hash);
        return hash;
    } catch (err) {
        console.error("Error hashing the value:", err);
        throw err; // You may want to handle the error differently here
    }
}

const checkPassword = async (password, userPassword, email, userId) => {
    try {
        const match = await bcrypt.compare(password, userPassword);

        if (!match) {
            return {
                error: "Password does not match"
            };
        }
        const token = jwt.sign({ email, userId: userId, },
             'ben103');
        const response = {
            message: "User signed in!",
            token: token,
        };

        return response;
    } catch (err) {
        console.error("Error comparing passwords or signing JWT:", err);
        throw err; // You may want to handle the error differently here
    }
};