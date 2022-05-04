const express = require("express");
const router = express.Router();
const citizensController = require("../controllers/citizens.controller");
const api = require('./api');
const citizensAPI = require('./api/citizens');
const geographyAPI = require('./api/geography');

// Setup api routes
router.use('/api', api);
router.use('/api/citizens', citizensAPI);
router.use('/api/geography', geographyAPI);


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
    // Get the limit and offset from the query string
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = req.query.page ? (req.query.page - 1) * limit : 0;

    // Get the citizens from the database
    Promise.all([citizensController.findXCitizens(limit, page), citizensController.getCountOfCitizens()]).then(results => {
        const [citizens, count] = results;
        res.render('citizens', {
            title: 'Citizens',
            citizens,
            count: count[0].count,
        });
    });
});


router.get("/addUser", (req, res) => {
    res.render("addUser", {
        title: "Add User"
        });
    }
);


// export the router
module.exports = router;
