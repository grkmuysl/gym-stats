export const allChestExercises = [
  {
    name: "Bench Press",
    subtitle: "A compound exercise for building chest strength",
    type: "Chest",
    id: "0",
    difficulty: "Advanced",
  },
  {
    name: "Incline Bench Press",
    subtitle: "Targets the upper part of the chest muscles",
    type: "Chest",
    id: "1",
    difficulty: "Advanced",
  },
  {
    name: "Decline Bench Press",
    subtitle: "Focuses on the lower chest muscles",
    type: "Chest",
    id: "2",
    difficulty: "Intermediate",
  },
  {
    name: "Push-Ups",
    subtitle: "A basic upper body exercise using body weight",
    type: "Chest",
    id: "3",
    difficulty: "Beginner",
  },
  {
    name: "Cable Crossover",
    subtitle: "Isolates the chest muscles with cable resistance",
    type: "Chest",
    id: "4",
    difficulty: "Intermediate",
  },
];

export const allBackExercises = [
  {
    name: "Pull-Ups",
    subtitle: "A challenging back and arm strength exercise",
    type: "Back",
    id: "5",
    difficulty: "Advanced",
  },
  {
    name: "Deadlift",
    subtitle: "A full-body exercise focusing on back and legs",
    type: "Back",
    id: "6",
    difficulty: "Advanced",
  },
  {
    name: "Bent Over Row",
    subtitle: "Strengthens the back and stabilizer muscles",
    type: "Back",
    id: "7",
    difficulty: "Intermediate",
  },
  {
    name: "Lat Pulldown",
    subtitle: "Builds lat muscles and improves pull-up strength",
    type: "Back",
    id: "8",
    difficulty: "Beginner",
  },
  {
    name: "Face Pull",
    subtitle: "Targets rear delts and upper back muscles",
    type: "Back",
    id: "9",
    difficulty: "Intermediate",
  },
];

export const allShoulderExercises = [
  {
    name: "Overhead Press",
    subtitle: "Builds shoulder strength and stability",
    type: "Shoulders",
    id: "10",
    difficulty: "Advanced",
  },
  {
    name: "Arnold Press",
    subtitle: "A dynamic shoulder exercise with rotation",
    type: "Shoulders",
    id: "11",
    difficulty: "Intermediate",
  },
  {
    name: "Lateral Raise",
    subtitle: "Focuses on the side delts for shoulder width",
    type: "Shoulders",
    id: "12",
    difficulty: "Beginner",
  },
  {
    name: "Front Raise",
    subtitle: "Targets the front delts for shoulder definition",
    type: "Shoulders",
    id: "13",
    difficulty: "Beginner",
  },
];

export const allLegExercises = [
  {
    name: "Squat",
    subtitle: "A fundamental lower body strength exercise",
    type: "Legs",
    id: "14",
    difficulty: "Advanced",
  },
  {
    name: "Leg Press",
    subtitle: "Builds quad and glute strength with controlled motion",
    type: "Legs",
    id: "15",
    difficulty: "Intermediate",
  },
  {
    name: "Lunges",
    subtitle: "Improves balance and strengthens legs",
    type: "Legs",
    id: "16",
    difficulty: "Beginner",
  },
  {
    name: "Bulgarian Split Squat",
    subtitle: "A unilateral leg exercise for strength and balance",
    type: "Legs",
    id: "17",
    difficulty: "Advanced",
  },
];

export const allBicepsExercises = [
  {
    name: "Barbell Curl",
    subtitle: "Builds bicep strength with barbell resistance",
    type: "Biceps",
    id: "18",
    difficulty: "Intermediate",
  },
  {
    name: "Dumbbell Curl",
    subtitle: "Isolates biceps for controlled strength building",
    type: "Biceps",
    id: "19",
    difficulty: "Beginner",
  },
  {
    name: "Hammer Curl",
    subtitle: "Targets biceps and brachialis muscles",
    type: "Biceps",
    id: "20",
    difficulty: "Beginner",
  },
];

export const allTricepsExercises = [
  {
    name: "Tricep Dips",
    subtitle: "Strengthens triceps using body weight",
    type: "Triceps",
    id: "21",
    difficulty: "Intermediate",
  },
  {
    name: "Skull Crushers",
    subtitle: "Isolates triceps with overhead extension",
    type: "Triceps",
    id: "22",
    difficulty: "Advanced",
  },
];

export const allAbsExercises = [
  {
    name: "Plank",
    subtitle: "A core stability exercise for abs and lower back",
    type: "Abs",
    id: "23",
    difficulty: "Beginner",
  },
  {
    name: "Crunch",
    subtitle: "Targets the upper abdominal muscles",
    type: "Abs",
    id: "24",
    difficulty: "Beginner",
  },
  {
    name: "Russian Twist",
    subtitle: "Improves core strength and rotational stability",
    type: "Abs",
    id: "25",
    difficulty: "Intermediate",
  },
  {
    name: "Mountain Climbers",
    subtitle: "A dynamic core and cardio exercise",
    type: "Abs",
    id: "26",
    difficulty: "Intermediate",
  },
];

export const exerciseTypes = [
  { label: "Göğüs", value: "Chest" },
  { label: "Sırt", value: "Back" },
  { label: "Omuz", value: "Shoulders" },
  { label: "Bacak", value: "Legs" },
  { label: "Biceps", value: "Biceps" },
  { label: "Triceps", value: "Triceps" },
  { label: "Karın", value: "Abs" },
];

export const getExercisesByType = (type) => {
  switch (type) {
    case "Chest":
      return allChestExercises;
    case "Back":
      return allBackExercises;
    case "Shoulders":
      return allShoulderExercises;
    case "Legs":
      return allLegExercises;
    case "Biceps":
      return allBicepsExercises;
    case "Triceps":
      return allTricepsExercises;
    case "Abs":
      return allAbsExercises;
    default:
      return [];
  }
};

export const formatExercisesForDropdown = (exercises) => {
  return exercises.map((exercise) => ({
    label: exercise.name,
    value: exercise.id,
    subtitle: exercise.subtitle,
    difficulty: exercise.difficulty,
  }));
};
