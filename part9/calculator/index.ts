import express from "express";

const app = express();

app.use(express.json());

import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (
    !req.query.height ||
    typeof req.query.height !== "string" ||
    !req.query.weight ||
    typeof req.query.weight !== "string"
  ) {
    res.status(400).json({
      error: "malformatted parameters",
    });
  } else {
    const bmi = calculateBmi(req.query.height, req.query.weight);
    const response = {
      height: req.query.height,
      weight: req.query.weight,
      bmi: bmi,
    };
    res.json(response);
  }
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body as {
    daily_exercises: Array<string>;
    target: number;
  };

  if (!daily_exercises || !target) {
    res.status(400).json({
      error: "parameters missing",
    });
  } else if (
    typeof daily_exercises !== "object" ||
    typeof target !== "number"
  ) {
    res.status(400).json({
      error: "malformatted parameters",
    });
  } else {
    const result = calculateExercises(daily_exercises, target);
    console.log(result);
    res.json(result);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
