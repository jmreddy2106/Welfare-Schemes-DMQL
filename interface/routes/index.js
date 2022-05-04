const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");
const citizensController = require("../controllers/citizens.controller");
const api = require("./api");
const citizensAPI = require("./api/citizens");
const geographyAPI = require("./api/geography");
const transactionsRoute = require("./transactions");

// Setup api routes
router.use("/api", api);
router.use("/api/citizens", citizensAPI);
router.use("/api/geography", geographyAPI);
router.use("/transactions", transactionsRoute);

router.get("/", (req, res) => {
  Promise.all([
    dashboardController.genderDist(),
    dashboardController.ageDist(),
    dashboardController.casteDist(),
    dashboardController.maritalDist(),
    dashboardController.disablePercentage(),
    dashboardController.citizensByDistrict(),
  ]).then((results) => {
    const [
      genderDist,
      ageDist,
      casteDist,
      maritalDist,
      disableDist,
      citizenDist,
    ] = results;
    res.render("index", {
      title: "Home Page",
      genderDist,
      ageDist,
      casteDist,
      maritalDist,
      disableDist,
      citizenDist,
    });
  });
});

router.get("/citizens", (req, res) => {
  // Get the limit and offset from the query string
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = req.query.page ? (req.query.page - 1) * limit : 0;

  // Get the citizens from the database
  Promise.all([
    citizensController.findXCitizens(limit, page),
    citizensController.getCountOfCitizens(),
  ]).then((results) => {
    const [citizens, count] = results;
    res.render("citizens", {
      title: "Citizens",
      citizens,
      count: count[0].count,
    });
  });
});

router.get("/search", (req, res) => {
  // Get the limit and offset from the query string
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = req.query.page ? (req.query.page - 1) * limit : 0;
  const query = req.query.query;

  // Get the citizens from the database
  Promise.all([
    citizensController.searchCitizens(query, limit, page),
    citizensController.countSearchedCitizens(query),
  ]).then((results) => {
    const [citizens, count] = results;
    res.render("citizens", {
      title: `Search results for "${query}"`,
      citizens,
      count: count[0].count,
    });
  });
});

router.get("/addUser", (req, res) => {
  res.render("adduser", {
    title: "Add User",
  });
});

router.get("/beneficiaries", (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 100;
  const page = req.query.page ? (req.query.page - 1) * limit : 0;
  Promise.all([
    citizensController.getBeneficiaries(limit, page),
    citizensController.getCountOfCitizens(),
  ]).then((results) => {
    const [beneficiaries, count] = results;
    res.render("beneficiaries", {
      title: "Beneficiaries",
      beneficiaries,
      count: count[0].count,
    });
  });
});

// export the router
module.exports = router;
