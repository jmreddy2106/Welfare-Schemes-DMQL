const express = require("express");
const router = express.Router();

const citizensController = require("../../controllers/citizens.controller");

router.post("/edit", (req, res) => {
  const { citizen_id, address, mobile_num, dob, marital_status } = req.body;
  if (!citizen_id || !address || !mobile_num || !dob || !marital_status) {
    res.status(400).json({ message: "Please fill in all fields" });
  } else {
    citizensController
      .editCitizen(citizen_id, address, mobile_num, dob, marital_status)
      .then(() => {
        res.status(200).json({ message: "Citizen updated successfully" });
      })
      .catch((err) => {
        res.status(400).json({ message: err });
      });
  }
});

router.post("/delete", (req, res) => {
  const { citizen_id } = req.body;
  if (!citizen_id) {
    res.status(400).json({ message: "Please fill in all fields" });
  } else {
    citizensController
      .deleteCitizenbyId(citizen_id)
      .then(() => {
        res.status(200).json({ message: "Citizen deleted successfully" });
      })
      .catch((err) => {
        res.status(400).json({ message: err });
      });
  }
});

router.post("/validate", (req, res) => {
  const { citizen_id } = req.body;
  if (!citizen_id) {
    res.status(400).json({ message: "Please fill in all fields" });
  } else {
    citizensController
      .checkCitizenId(citizen_id)
      .then((isValid) => {
        res.status(200).json({ isValid: !isValid });
      })
      .catch((err) => {
        res.status(400).json({ message: err });
      });
  }
});

router.post("/addnewcitizen", (req, res) => {
  let {
    citizen_id,
    first_name,
    middle_name,
    last_name,
    address,
    mobile_num,
    dob,
    gender,
    marital_status,
    disabled,
    disbaled_percentage,
    caste,
    village_id,
  } = req.body;

  if (!disbaled_percentage) {
    disbaled_percentage = 0.0;
  }

  if (
    !citizen_id ||
    !first_name ||
    !last_name ||
    !address ||
    !mobile_num ||
    !dob ||
    !gender ||
    !marital_status ||
    !disabled ||
    !caste ||
    !village_id
  ) {
    res.status(400).json({ message: "Please fill in all fields" });
  } else {
    citizensController
      .addNewCitizen(
        citizen_id,
        first_name,
        last_name,
        address,
        mobile_num,
        dob,
        gender,
        marital_status,
        disabled,
        disbaled_percentage,
        caste,
        village_id
      )
      .then(() => {
        res.status(200).json({ message: "Citizen added successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: err });
      });
  }
});

module.exports = router;
