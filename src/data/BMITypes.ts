export const BMI_TYPES = {
  UNDERWEIGHT: "Underweight",
  NORMAL_WEIGHT: "Normal Weight",
  OVERWEIGHT: "Overweight",
  OBESE_1: "Obese (Class I)",
  OBESE_2: "Obese (Class II)",
  MORBID_OBESE: "Morbidly Obese",
} as const;

export type BMIType = (typeof BMI_TYPES)[keyof typeof BMI_TYPES];
