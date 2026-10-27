const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");

// Get All Budgets
router.get("/", async (req, res) => {
try {
const budgets = await Budget.find();
res.json(budgets);
} catch (error) {
console.error("GET BUDGET ERROR:", error);

res.status(500).json({
  error: error.message,
});

}
});

// Add Budget
router.post("/", async (req, res) => {
try {
console.log("BODY RECEIVED:", req.body);

const budget = new Budget(req.body);

await budget.save();

res.status(201).json(budget);

} catch (error) {
console.error("ADD BUDGET ERROR:");
console.error(error);
console.error(error.stack);

res.status(500).json({
  error: error.message,
});

}
});

// Delete Budget
router.delete("/:id", async (req, res) => {
try {
await Budget.findByIdAndDelete(req.params.id);

res.json({
  message: "Budget deleted",
});

} catch (error) {
console.error("DELETE BUDGET ERROR:");
console.error(error);
console.error(error.stack);

res.status(500).json({
  error: error.message,
});

}
});

module.exports = router;

