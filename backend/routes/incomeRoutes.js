const express = require("express");
const router = express.Router();
const Income = require("../models/Income");

// Add Income
router.post("/", async (req, res) => {
  try {
    const income = new Income(req.body);
    await income.save();

    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Get All Income
router.get("/", async (req, res) => {
  try {
    const incomes = await Income.find();

    res.json(incomes);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
// Delete Income
router.delete("/:id", async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);

    res.json({
      message: "Income deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
module.exports = router;
