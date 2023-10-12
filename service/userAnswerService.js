const UserAnswer = require('../models/userAnswer.js');
const Utils = require('../Utils/userUtils.js');
const Question = require('../models/question.js');
const Choice = require('../models/choice');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.addUserAnswer = async (req, res) => {
    console.log('reqq', req.body);
    const request = req.body;
    const response = Utils.getUserId(req, res);
    const userId = response.userId;
    if (Array.isArray(request)) {
        request.forEach(async userRequest => {
            const questionId = userRequest.questionId;
            const choiceId = userRequest.choiceId;
            const question = await Question.findOne({ where: { id: questionId } });
            if (!question || question === 'undefined') {
                res.status(400).json({
                    message: "Question not found for" + questionId
                })
                return res;
            }
            const currentChoiceId = choiceId;
            const existAnswerByUser = await UserAnswer.findOne({
                where: {
                    userId: userId,
                    ChoiceId: currentChoiceId
                }
            })
            if (existAnswerByUser ) {
                res.status(400).json({
                    message: "Answer already added for this question " + questionId
                })
                return res;
            }
            const currentAnswer = {
                userId: userId,
                choiceId: currentChoiceId
            }
            const answer = await UserAnswer.create({ userId: currentAnswer.userId, ChoiceId: currentAnswer.choiceId });

            res.status(200).json({
                message: "succcessFully Added.."
            })
            return res;
        })
    } else {
        res.status(200).json({
            message: "bad Added.."
        })
        return res;
    }
}

exports.getUserAnswers = async (req, res) => {
    const response = Utils.getUserId(req, res);
    const userId = response.userId;

    const userAnswers = await UserAnswer.findAll({where : {userId: userId, ChoiceId:{ [Op.not] : null}}});
    if (userAnswers && userAnswers != null) {
        res.status(200).json({
            message: "success",
            answers: userAnswers,
            score: userAnswers.length
        })
    } else {
        res.status(200).json({
            message: "success",
            answers: [],
            score: 0
        })
    }
    return res;
}