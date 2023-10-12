const express = require('express');

const router = express.Router();

const {addUserAnswer, getUserAnswers} = require('../service/userAnswerService.js')

const {authenticateToken} = require("../verification/auth")

router.post('/userAnswer', authenticateToken, addUserAnswer)

router.get('/answers', authenticateToken, getUserAnswers);

module.exports = router;