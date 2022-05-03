const express = require("express");
const router = express.Router();

const citizensController = require("../../controllers/citizens.controller");

router.post('/edit', (req, res) => {
    const { citizen_id, address, mobile_num, dob, marital_status } = req.body;
    if (!citizen_id || !address || !mobile_num || !dob || !marital_status) {
        res.status(400).json({ message: "Please fill in all fields" });
    } else {
        citizensController.editCitizen(citizen_id, address, mobile_num, dob, marital_status)
            .then(() => {
                res.status(200).json({ message: "Citizen updated successfully" });
            })
            .catch((err) => {
                res.status(400).json({ message: err });
            });
    }
});

module.exports = router;