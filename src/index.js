const homepage = require("./homepage.js");
const itempage = require("./itempage.js");

console.log("index.js loaded");

window.addEventListener("load", () => {
    homepage.setup();
    itempage.setup();
});