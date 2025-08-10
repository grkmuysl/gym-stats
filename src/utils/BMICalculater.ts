import { BMI_TYPES } from "../data/BMITypes";

export const calculateBMI = (weight: number, height: number) => {
  if (!weight || !height || weight <= 0 || height <= 0) {
    return {
      bmi: 0,
      category: null,
      error: "Invalid weight or height values",
    };
  }

  const heightInMeters = height / 100;
  const bmiValue = weight / (heightInMeters * heightInMeters);

  let category: string;

  if (bmiValue < 18.5) {
    category = BMI_TYPES.UNDERWEIGHT;
  } else if (bmiValue < 25) {
    category = BMI_TYPES.NORMAL_WEIGHT;
  } else if (bmiValue < 30) {
    category = BMI_TYPES.OVERWEIGHT;
  } else if (bmiValue < 35) {
    category = BMI_TYPES.OBESE_1;
  } else if (bmiValue < 40) {
    category = BMI_TYPES.OBESE_2;
  } else {
    category = BMI_TYPES.MORBID_OBESE;
  }

  return {
    bmi: parseFloat(bmiValue.toFixed(1)),
    category,
    error: null,
  };
};

export const useBMICalculator = () => {
  const getBMI = (weight: number, height: number) => {
    return calculateBMI(weight, height);
  };

  return { getBMI };
};
