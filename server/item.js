const express = require("express");
const router = express.Router();
//const DB = require("./database.js");
const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    imgSrc: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model("Item", itemSchema);

/**
 * Deletes an item
 */
router.delete("/api/items/:itemId", (req, res) => {
    Item.deleteOne({"_id" : mongoose.Types.ObjectId(req.params.itemId)}, (err) => {
        if(err) {
            console.log(err);
            res.sendStatus(500);
        } 
        console.log("Deletion successful");
        return res.sendStatus(204);
    })
});

/**
 * Create a new item
 */
router.post("/api/new-item", (req, res) => {
    const props = {
        imgSrc: "example.invalid",
        title: "phone red",
        price: 200,
        category: "phones"
    };
    
    const item1 = new Item(props);
    item1.save (err => {
        if(err){
            console.log("Error: ", err);
            res.sendStatus(500);
            return;
        }
        console.log("Success createItem");
        res.sendStatus(201);
    });
});

/* ----- New queries, using items2 to differentiate ----- */

/**
 * Returns an item
 */
router.get("/api/items2/:itemId",(req, res)=>{
    Item.findById(req.params.itemId, function(err, item) {
        if(err){
            console.log("Error: ", err);
            res.status(500).send(err);
            return;
        }
        res.send(item);
    });
});

/**
 * Returns all items
 */
router.get("/api/items2",(req, res)=>{
    Item.find({}, function(err, items){
        if(err){
            console.log("Error: ", err);
            res.status(500).send(err);
            return;
        }
        res.send(items);
    });
});

/* ----- Queries for old items, delete when exported ----- */

/**
 * GET all items
 */
router.get("/api/items",(req, res)=>{
    res.json(DB.getItems());
});

/**
 * GET item by id
 */
router.get("/api/items/:itemId",(req, res)=>{
    res.send(DB.getItem(req.params.itemId));
});

module.exports = router;