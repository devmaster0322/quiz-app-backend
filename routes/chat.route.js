const express = require('express');
const router = express.Router();
const chatController = require("./../controllers/chat.controller");

router.get('/', function (req, res) {
    res.status(200).json({
        message: "APIs for Chat"
    })
});

router.post('/read', chatController.readAction);

module.exports = router;
