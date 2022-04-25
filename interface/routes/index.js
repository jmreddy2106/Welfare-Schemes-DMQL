const express = require("express");
const router = express.Router();
const citizensController = require("../controllers/citizens.controller");

// Setup Hello World route
router.get("/", (req, res) => {
    // Get the citizens from the database
    citizensController.findXCitizens().then(citizens => {
        res.render("index", {
            citizens: citizens,
            title: "Hello World"
        });
    });
});

// export the router
module.exports = router;
