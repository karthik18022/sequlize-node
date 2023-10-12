
const  Question = require('../models/question.js');
const userUtils = require("../Utils/userUtils.js")


exports.createQuestion = async (req, res) => {
    const {desc} = req.body;

    const ques = {
        desc: desc
    } 
    try {
        const data =  await Question.create({desc: ques.desc});
        if (data) {
            console.log("question added successFully");
            res.status(200).json({
                message: "added successFully"
            }
            );
            return res;
        } else {
            console.log("error occuring");
            resizeBy.status(400).json({
                message: "Bad request"
            })
            return res;
        }
    } catch (err){
        console.error("Error hashing the value:", err);
        throw err; // You may want to handle the error differently here
    }
    
}

exports.getAllQuestion = async (req, res) => {
    const data = await Question.findAll();
    if (data === null || data.length <= 0) {
        res.status(404).json({
            message: "No Data Found"
        })
        return res;
    }  
    res.status(200).json({
        message: "Success",
        data: data
    })
    return res;
}

exports.getQuestionById = async (req, res) => {
    const questionId = req.params.id;
    const data = await Question.findOne({where: {id : questionId}});
    if (data === null || data.length <= 0) {
        res.status(404).json({
            message: "No Data Found"
        })
        return res;
    }  
    res.status(200).json({
        message: "Success",
        data: data
    })
    return res;
}