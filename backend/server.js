const express = require("express");
const mongoose = require("mongoose");

// initialize express
const app = express();

// DB config
const db = require("../config/keys").mongoURI;

// Connect to mongo/mLab via mongoose
// Promise based
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

// env use for latter possible connection to Heroku
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
