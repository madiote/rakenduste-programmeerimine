const express = require("express");
const router = express.Router();
const User = require("./user.model.js");

/**
 * Gets all users
 */
router.get("/api/users", (req, res) => {
    User.find({}, (err, docs) => {
        if(err) return handleError(err, res);
        res.status(200).json(docs);
    });
});

/**
 * Login
 */
router.post("/api/users/login", (req, res) => {
    User.findOne({email: req.body.email}, (err, doc) => {
        if(err) return handleError(err, res);
        res.send(doc);
    });
});

/**
 * Creates a new user (signup)
 */
router.post("/api/users", (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
        if(err) return handleError(err, res);
        console.log("Successfully saved the user");
        res.status(200).json(user);
    });
});

/** 
 * Delete all users
 */
router.delete("/api/users", (req, res) => {
    User.deleteMany({}, (err, docs) => {
        if(err) return handleError(err, res);
        console.log(docs);
        console.log("Successfully deleted all users");
        res.send(204);
    });
});

function handleError(err, res){
    console.log(err);
    res.send(500);
}

module.exports = router;