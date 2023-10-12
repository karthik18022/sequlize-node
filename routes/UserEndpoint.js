const express = require('express');

const router = express.Router();


const {userCreation, login} =  require('../service/userService.js');

router.post("/users", userCreation);

router.post("/login", login);

module.exports = router;