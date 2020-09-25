interface CalcObj {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseArr: Array<string>,
  target: number
): CalcObj => {
  // const exerciseArr = arr.slice(2);
  const periodLength = exerciseArr.length;
  let totalHours = 0;
  exerciseArr.map((num) => {
    const fig = Number(num);
    totalHours += fig;
  });
  console.log(totalHours);
  const avgDailyHours = totalHours / periodLength;

  const rating = avgDailyHours > 2 ? 3 : avgDailyHours > 1 ? 2 : 1;
  const ratingDescription =
    rating === 3 ? "Very good" : rating === 2 ? "OK" : "Do better!";
  const success = avgDailyHours >= 2 ? true : false;

  const result = {
    periodLength: periodLength,
    trainingDays: exerciseArr.filter((num) => Number(num) !== 0).length,

    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: avgDailyHours,
    success: success,
  };
  console.log(result);
  return result;
};

export default calculateExercises;
