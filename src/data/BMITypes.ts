export const BMI_TYPES = {
  UNDERWEIGHT: "Zayıf",
  NORMAL_WEIGHT: "Normal",
  OVERWEIGHT: "Fazla Kilolu",
  OBESE_1: "1. Derece Obez",
  OBESE_2: "2. Derece Obez",
  MORBID_OBESE: "3. Derece (Morbid) Obez",
} as const;

export type BMIType = (typeof BMI_TYPES)[keyof typeof BMI_TYPES];
