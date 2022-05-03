const express = require("express");
const router = express.Router();
const stateController = require("../../controllers/state.controller");
const mandalController = require("../../controllers/mandal.controller");
const villageController = require("../../controllers/village.controller");
const districtController = require("../../controllers/district.controller");


router.get("/states", (req, res) => {
    stateController.allStates().then(states => {
        res.send(states);        
        });

});

router.get("/districts/:state_id", (req, res) => {
    const state_id = req.params.state_id;
    districtController.allDistrictsByStateId(state_id).then(districts => {
        res.send(districts);
    });
});
router.get("/mandals/:district_id", (req, res) => {
    const district_id = req.params.district_id;
    mandalController.allMandalsByDistrictId(district_id).then(mandals => {
        res.send(mandals);
    });
});

router.get("/villages/:mandal_id", (req, res) => {
    const mandal_id = req.params.mandal_id;
    villageController.allVillagesByMandalId(mandal_id).then(villages => {
        res.send(villages);
    });
});




module.exports = router;



