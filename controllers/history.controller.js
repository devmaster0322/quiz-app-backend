exports.readAction = async (req, res) => {
    try {

    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message
        })
    }
}