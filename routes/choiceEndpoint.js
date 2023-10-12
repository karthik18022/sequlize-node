const express = require('express');

const router = express.Router();

const {addChoice, getChoicesByQuestionId} = require('../service/choiceService.js');

const {authenticateToken} = require("../verification/auth")


router.post('/choice', authenticateToken, addChoice);

router.get('/choices/:id', authenticateToken, getChoicesByQuestionId);
module.exports = router;