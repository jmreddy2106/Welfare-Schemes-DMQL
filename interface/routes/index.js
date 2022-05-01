const express = require("express");
const router = express.Router();
const citizensController = require("../controllers/citizens.controller");
const api = require('./api');

// Setup api routes
router.use('/api', api);

// Setup main route
router.get("/", (req, res) => {
    // Get the citizens from the database
    citizensController.findXCitizens().then(citizens => {
        res.render("index", {
            citizens: citizens,
            title: "Home"
        });
    });
});

// export the router
module.exports = router;
