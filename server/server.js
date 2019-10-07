const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

const useMongooseDb = false;
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./user.js");
const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-mvgj1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


app.use(userRouter);

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.get("/items/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.use(express.static("dist"));

function listen(){
    // Heroku needs process.env.PORT
    app.listen(PORT, () => {
        console.log("Server started");
        console.log(`http://localhost:${PORT}`);
    });
}

if(useMongooseDb){
    mongoose.connect(DB_URL)
    .then(() => {
        console.log("DB access successful");
        listen();
    })
    .catch(err => {
        console.log("DB access error: ", err);
    });
}
