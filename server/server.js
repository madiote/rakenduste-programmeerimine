const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

const mongoose = require("mongoose");
require("dotenv").config();
const itemRouter = require("./item.router.js");
const userRouter = require("./user.router.js");
const DB = require("./database.js");
const Item = require("./item.model.js");
const bodyParser = require("body-parser");

const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-a7iqn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(bodyParser.json())

app.use(itemRouter);
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

mongoose.connect(DB_URL)
.then(() => {
    console.log("DB access successful");
    //deleteAllItems();
    migrate();
    listen();
})
.catch(err => {
    console.log("DB access error: ", err);
});

function migrate(){ // async, can't know when all are saved
    Item.count({}, (err, countNo) => {
        if(err) throw err;
        if(countNo > 0) {
            console.log("Items already exist in mongodb");
            return;
        }
        saveAllItems();
    });
}

function deleteAllItems(){
    Item.deleteMany({}, (err, doc) => {
        console.log("err", err, "doc", doc);
    });
}

function saveAllItems(){
    console.log("Migration started");
    const items = DB.getItems();
    items.forEach(item => {
        const document = new Item(item);
        document.save ((err) => {
            if(err){
                console.log(err);
                throw new Error("Item save error");
            }
            console.log("Save successful")
        });
    });
    //console.log("items", items);
}