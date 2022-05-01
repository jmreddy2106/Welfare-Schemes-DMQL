const express = require("express");
const router = express.Router();
const citizensController = require("../controllers/citizens.controller");
const api = require('./api');

// Setup api routes
router.use('/api', api);


router.get('/', (req, res) => {
    Promise.all([citizensController.findGenderDistribution()]).then(results => {
        const [genderDistribution] = results;
        res.render('index', {
            title: 'Home Page',
            genderDistribution
        });
    });
});

router.get("/citizens", (req, res) => {
    // Get the citizens from the database
    citizensController.findXCitizens().then(citizens => {
        res.render("citizens", {
            citizens: citizens,
            title: "Citizens Data"
        });
    });
});

// export the router
module.exports = router;
