const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactions.controller");

router.get("/agriculture", (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 100;
  const page = req.query.page ? (req.query.page - 1) * limit : 0;
  Promise.all([
    transactionsController.getAgricultureTransactions(limit, page),
    transactionsController.getAgricultureTransactionsCount(),
  ]).then((results) => {
    const [transactions, count] = results;
    res.render("agriculture", {
      title: "Agriculture Transactions",
      transactions,
      count: count[0].count,
    });
  });
});

router.get("/hospital", (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 100;
  const page = req.query.page ? (req.query.page - 1) * limit : 0;
  Promise.all([
    transactionsController.getHospitalTransactions(limit, page),
    transactionsController.getHospitalTransactionsCount(),
  ]).then((results) => {
    const [transactions, count] = results;
    res.render("hospital", {
      title: "Hospital Transactions",
      transactions,
      count: count[0].count,
    });
  });
});

router.get("/lpg", (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 100;
  const page = req.query.page ? (req.query.page - 1) * limit : 0;
  Promise.all([
    transactionsController.getLPGTransactions(limit, page),
    transactionsController.getLPGTransactionsCount(),
  ]).then((results) => {
    const [transactions, count] = results;
    res.render("lpg", {
      title: "LPG Transactions",
      transactions,
      count: count[0].count,
    });
  });
});

router.get("/nregs", (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 100;
  const page = req.query.page ? (req.query.page - 1) * limit : 0;
  Promise.all([
    transactionsController.getNREGSTransactions(limit, page),
    transactionsController.getNREGSTransactionsCount(),
  ]).then((results) => {
    const [transactions, count] = results;
    res.render("nregs", {
      title: "NREGS Transactions",
      transactions,
      count: count[0].count,
    });
  });
});

router.get("/pension", (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 100;
  const page = req.query.page ? (req.query.page - 1) * limit : 0;
  Promise.all([
    transactionsController.getPensionTransactions(limit, page),
    transactionsController.getPensionTransactionsCount(),
  ]).then((results) => {
    const [transactions, count] = results;
    res.render("pension", {
      title: "Pension Transactions",
      transactions,
      count: count[0].count,
    });
  });
});

module.exports = router;
