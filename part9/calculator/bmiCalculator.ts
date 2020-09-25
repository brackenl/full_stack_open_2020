const calculateBmi = (h: string, w: string): string => {
  const bmi = Number(w) / Math.pow(Number(h) / 100, 2);

  switch (true) {
    case bmi <= 18.5:
      return "Underweight";
    case bmi >= 25:
      return "Overweight";
    default:
      return "Normal (healthy weight)";
  }
};

export default calculateBmi;
