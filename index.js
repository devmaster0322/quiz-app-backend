const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');
const fs = require('fs');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();
require('dotenv').config()
const middleware = require("./middlewares/auth.moddleware");
const userRoute = require("./routes/user.route")
const courseRoute = require("./routes/course.route")

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

app.use(cookieParser());

app.use(cors({
    origin: '*',
    credentials: true
}));
app.options('*', cors())

// Instantiate express
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "This is Quiz-App Backend"
    })
})

app.use("/api/user", userRoute);
app.use("/api/course", [middleware.checkAuth], courseRoute);

if(app.listen(process.env.APP_PORT)) {
    console.log(`Starting server on port ${process.env.APP_PORT}`);
}