const express = require('express');

const router = express.Router();

const {createQuestion, getAllQuestion, getQuestionById} = require('../service/questionService.js');

const {authenticateToken} = require("../verification/auth")

router.post('/question', authenticateToken, createQuestion);

router.get("/question", authenticateToken, getAllQuestion);

router.get('/question/:id', authenticateToken, getQuestionById);


module.exports = router;