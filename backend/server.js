import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import { getLoans } from "./sheets.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
    const loans = await getLoans();

    const prompt = `
You are a strict financial debt advisor.

User Loans:
${JSON.stringify(loans)}

Rules:
1. Prioritize closing small loans first
2. Reduce EMI aggressively
3. Maintain minimum payments on high-pressure loans
4. Give exact actionable steps with amounts

User Question:
${question}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.listen(3000, () => console.log("Backend running on port 3000"));
