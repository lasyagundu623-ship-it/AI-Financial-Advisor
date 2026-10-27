console.log("AI ROUTES FILE LOADED");
const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/advice", async (req, res) => {
  try {
    const { income, expenses } = req.body;

    const prompt = `
    You are a financial advisor.

    Monthly Income: ₹${income}
    Monthly Expenses: ₹${expenses}

    Give short financial advice in 3-5 bullet points.
    `;

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3.2",
        prompt,
        stream: false,
      }
    );

    res.json({
      advice: response.data.response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to generate advice",
    });
  }
});
router.post("/analysis", async (req, res) => {
  try {
    const {
      income,
      expenses,
      budgets,
    } = req.body;

    const prompt = `
You are an expert personal financial advisor.

Analyze the user's financial data and provide a detailed report.

Income:
${JSON.stringify(income, null, 2)}

Expenses:
${JSON.stringify(expenses, null, 2)}

Budgets:
${JSON.stringify(budgets, null, 2)}

Tasks:

1. Calculate total income, total expenses, and savings.
2. Identify the top spending categories.
3. Detect any budget violations or categories close to budget limits.
4. Evaluate the user's financial health (Excellent, Good, Average, Poor).
5. Suggest specific ways to reduce expenses.
6. Recommend a monthly savings target.
7. Give 5 actionable personalized recommendations.

Format the response as:

📊 Financial Summary
💰 Spending Analysis
⚠ Budget Alerts
🎯 Savings Recommendations
✅ Action Plan

Keep the response concise, professional, and easy to read.
`;
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3.2",
        prompt,
        stream: false,
      }
    );

    res.json({
      analysis:
        response.data.response,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Analysis failed",
    });
  }
});
module.exports = router;
