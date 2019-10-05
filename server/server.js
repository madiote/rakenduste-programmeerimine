const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const DB = require("./database.js");
const mongoose = require("mongoose");
require("dotenv").config();

var kittySchema = new mongoose.Schema({
    name: String
});

var Kitten = mongoose.model("Kitten", kittySchema);

const kitten1 = new Kitten({
    name: "Red cat 2",
});

const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-mvgj1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB_URL)
.then(() => {
    console.log("DB access successful");
    kitten1.save(err => {
        if(err){
            console.log("Kitten error", err);
        }
        else {
            console.log("Kitten success");
        }
    });
})
.catch(err => {
    console.log("DB error", err);
});


/**
 * GET all items
 */
app.get("/api/items",(req, res)=>{
    res.json(DB.getItems());
});

/**
 * GET item by id
 */
app.get("/api/items/:itemId",(req, res)=>{
    res.send(DB.getItem(req.params.itemId));
});

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.get("/items/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.use(express.static("dist"));

// Heroku needs process.env.PORT
app.listen(PORT, () => {
    console.log("Server started");
    console.log(`http://localhost:${PORT}`);
});