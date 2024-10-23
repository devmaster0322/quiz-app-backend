const Course = require("./../models/course.model");
const History = require("./../models/history.model");

exports.readAction = async (req, res) => {
    try {
        const { type, count } = req.body;
        const randomProblems = await Course.aggregate([
            { $match: { type } },
            { $sample: { size: Number(count) }, },
            { $unset: "answer" }
        ]).exec();

        res.status(200).json({
            status: 'success',
            problems: randomProblems
        })
    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message
        })
    }
}

exports.saveAction = async (req, res) => {
    try {

    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message
        })
    }
}