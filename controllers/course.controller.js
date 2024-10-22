const formidable = require('formidable');
const Course = require("./../models/course.model");

exports.makeProAction = async (req, res) => {
    try {
        const form = new formidable.IncomingForm({ uploadDir: __dirname + '/../uploads', keepExtensions: true });
        console.log(req);
        form.parse(req, async (err, fields, files) => {
            const filePath = files.problemPdf[0].filepath;

            const type = fields.type[0];
            const count = Number(fields.count[0]);

            const courseData = new Course({
                problem: "who is smile?",
                items: ["hdg", "msg", "ksy"],
                answer: "hdg",
                type: fields.type[0],
                user_id: req.user._id
            })
            await courseData.save();

            res.status(200).json({
                status:"success",
                filePath,
                type,
                count
            })
        })
    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message
        })
    }
}

exports.deleteAction = async (req, res) => {
    try {
        const { _id } = req.body;
        await Course.deleteOne({ _id });
        res.status(200).json({
            status: "success"
        })
    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message
        })
    }
}

exports.readAction = async (req, res) => {
    try {
        const { type } = req.body;
        const problems = await Course.find({ type });
        res.status(200).json({
            status: "success",
            problems: problems
        })
    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message
        })
    }
}

exports.readMineAction = async (req, res) => {
    try {

        const { type } = req.body;
        const user_id = req.user._id;

        const problems = await Course.find({ type, user_id });
        res.status(200).json({
            status: "success",
            problems: problems
        })
    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message
        })
    }
}