const express = require("express");
const mongoose = require("mongoose");

const places = require("./routes/api/places");

const path = require("path");

// initialize express
const app = express();
app.use(express.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

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

// Use routes
// 'starting' endpoints
app.use("/api/places/", places);

// env use for latter possible connection to Heroku
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
