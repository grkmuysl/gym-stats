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

export const calculateBodyScoreLinear = (bmi: number): number => {
  if (bmi <= 0) return 0;

  const optimalMin = 20;
  const optimalMax = 25;
  const optimalMid = 22.5;

  if (bmi >= optimalMin && bmi <= optimalMax) {
    const distance = Math.abs(bmi - optimalMid);
    return Math.round(100 - distance * 6);
  } else if (bmi < optimalMin) {
    if (bmi < 16) return 5;
    return Math.round(((bmi - 16) / (optimalMin - 16)) * 80 + 5);
  } else {
    if (bmi > 45) return 5;
    return Math.round(85 - ((bmi - optimalMax) / (45 - optimalMax)) * 80);
  }
};

export const calculateAdvancedBodyScore = (
  bmi: number,
  age?: number,
  gender?: "male" | "female"
): number => {
  let baseScore = calculateBodyScoreLinear(bmi);

  if (age) {
    if (age >= 18 && age <= 30) {
    } else if (age > 30 && age <= 50) {
      baseScore += 2;
    } else if (age > 50) {
      baseScore += 5;
    }
  }

  if (gender === "female") {
    if (bmi >= 18.5 && bmi <= 26) {
      baseScore += 2;
    }
  }

  return Math.min(100, Math.max(5, Math.round(baseScore)));
};

export const getBodyScoreDescription = (score: number): string => {
  if (score >= 90) return "Mükemmel";
  if (score >= 80) return "Çok İyi";
  if (score >= 70) return "İyi";
  if (score >= 60) return "Normal";
  if (score >= 20) return "Kötü";
  return "Very Bad";
};

export const getBodyScoreEmoji = (score: number): string => {
  if (score >= 90) return "😍";
  if (score >= 80) return "😊";
  if (score >= 70) return "🙂";
  if (score >= 60) return "😐";
  if (score >= 20) return "😟";
  return "😰";
};
