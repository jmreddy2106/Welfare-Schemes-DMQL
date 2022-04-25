const express = require("express");
const router = express.Router();
const citizensController = require("../controllers/citizens.controller");

// Setup Hello World route
router.get("/", citizensController.findXCitizens);

// export the router
module.exports = router;
