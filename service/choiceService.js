const Choice = require('../models/choice.js');
const Question = require('../models/question.js');

exports.addChoice = async (req, res) => {

    const {questionId, desc, correctedAnswer} = req.body;

    if (questionId == null || questionId === 'undefined') {
        res.status(400).json({
            message : "questionId missing"
        })
        return res;
    } 
    if(desc == null || desc === 'undefined') {
        res.status(400).json({
            message : "question  desc missing"
        })
        return res;
    } else if( desc.length <= 0) {
        res.status(400).json({
            message : "question desc must not be empty"
        })
        return res;
    }

    const question = await Question.findOne({where : {id : questionId}});
    if (question == null || question === 'undefined') {
        res.status(400).json({
            message : "question not found"
        })
        return res;
    }

    const choice = {
        desc: desc,
        questionId: questionId,
        correctedAnswer: correctedAnswer
    }

    const response = await Choice.create({desc: choice.desc, questionId: choice.questionId, correctAnswer: choice.correctedAnswer});
    if (response) {
        res.status(200).json({
            message: "added successFully",
            data: {id : response.id,
                desc: response.desc,
            }
        }
        );
        return res;
    } else {
        res.status(500).send({ message: 'User not added. Error occured...' });
        return res;
    }
}

exports.getChoicesByQuestionId = async (req, res) => {
    const questionId = req.params.id;
    if (questionId == null || questionId === 'undefined') {
        res.status(400).json({
            message: "question id not found"
        })
        return res;
    }

    const data = await Choice.findAll({where : {questionId: questionId}});
    if (!data || data === 'undefined' || data.length <= 0) {
        res.status(400).json({
            message: "Question not found"
        })
        return res;
    }
    const resArray = [] ;
    data.forEach(element => {
        const id = element.dataValues.id;
        const desc = element.dataValues.desc;
        resArray.push(id, desc);
    });
    res.status(200).json({
        message: "success",
        response: resArray
    });    
}