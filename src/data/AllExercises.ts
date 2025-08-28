export const allChestExercises = [
  {
    name: "Bench Press",
    subtitle:
      "Göğüs kuvveti geliştirmek için bileşik (çok eklemli) bir egzersiz",
    type: "Göğüs",
    id: "0",
    difficulty: "İleri",
    animationSource: "benchPress",
  },
  {
    name: "Incline Bench Press",
    subtitle: "Göğüs kaslarının üst bölümünü hedefler",
    type: "Göğüs",
    id: "1",
    difficulty: "İleri",
  },
  {
    name: "Decline Bench Press",
    subtitle: "Alt göğüs kaslarına odaklanır",
    type: "Göğüs",
    id: "2",
    difficulty: "Orta",
  },
  {
    name: "Şınav",
    subtitle: "Vücut ağırlığıyla yapılan temel bir üst vücut egzersizi",
    type: "Göğüs",
    id: "3",
    difficulty: "Başlangıç",
    animationSource: "pushUp",
  },
  {
    name: "Kablo Göğüs Açışı",
    subtitle: "Kablo direnciyle göğüs kaslarını izole eder",
    type: "Göğüs",
    id: "4",
    difficulty: "Orta",
  },
];

export const allBackExercises = [
  {
    name: "Barfiks",
    subtitle: "Sırt ve kol kuvveti için zorlayıcı bir egzersiz",
    type: "Sırt",
    id: "5",
    difficulty: "İleri",
    animationSource: "pullUp",
  },
  {
    name: "Deadlift",
    subtitle: "Sırt ve bacaklara odaklanan tam vücut egzersizi",
    type: "Sırt",
    id: "6",
    difficulty: "İleri",
    animationSource: "deadLift",
  },
  {
    name: "Bent Over Row",
    subtitle: "Sırt ve dengeleyici kasları güçlendirir",
    type: "Sırt",
    id: "7",
    difficulty: "Orta",
  },
  {
    name: "Lat Çekiş",
    subtitle: "Kanat kaslarını geliştirir ve barfiks kuvvetini artırır",
    type: "Sırt",
    id: "8",
    difficulty: "Başlangıç",
  },
  {
    name: "Face Pull",
    subtitle: "Arka omuz ve üst sırt kaslarını hedefler",
    type: "Sırt",
    id: "9",
    difficulty: "Orta",
  },
];

export const allShoulderExercises = [
  {
    name: "Overhead Press",
    subtitle: "Omuz kuvveti ve stabilitesini geliştirir",
    type: "Omuz",
    id: "10",
    difficulty: "İleri",
  },
  {
    name: "Arnold Press",
    subtitle: "Rotasyon içeren dinamik bir omuz egzersizi",
    type: "Omuz",
    id: "11",
    difficulty: "Orta",
  },
  {
    name: "Yana Açış",
    subtitle: "Omuz genişliği için yan deltoidleri hedefler",
    type: "Omuz",
    id: "12",
    difficulty: "Başlangıç",
  },
  {
    name: "Öne Kaldırış",
    subtitle: "Omuz hattı için ön deltoidleri hedefler",
    type: "Omuz",
    id: "13",
    difficulty: "Başlangıç",
  },
];

export const allLegExercises = [
  {
    name: "Squat",
    subtitle: "Alt vücut kuvveti için temel bir egzersiz",
    type: "Bacak",
    id: "14",
    difficulty: "İleri",
  },
  {
    name: "Leg Press",
    subtitle: "Kontrollü hareketle quadriceps ve glute kuvveti kazandırır",
    type: "Bacak",
    id: "15",
    difficulty: "Orta",
    animationSource: "legPress",
  },
  {
    name: "Lunge",
    subtitle: "Dengeyi geliştirir ve bacakları güçlendirir",
    type: "Bacak",
    id: "16",
    difficulty: "Başlangıç",
  },
  {
    name: "Bulgarian Split Squat",
    subtitle: "Kuvvet ve denge için tek taraflı bir bacak egzersizi",
    type: "Bacak",
    id: "17",
    difficulty: "İleri",
  },
];

export const allBicepsExercises = [
  {
    name: "Barbell Curl",
    subtitle: "Barbell direnciyle biceps kuvveti kazandırır",
    type: "Biceps",
    id: "18",
    difficulty: "Orta",
  },
  {
    name: "Dumbbell Curl",
    subtitle: "Kontrollü kuvvet gelişimi için biceps’i izole eder",
    type: "Biceps",
    id: "19",
    difficulty: "Başlangıç",
  },
  {
    name: "Hammer Curl",
    subtitle: "Biceps ve brachialis kaslarını hedefler",
    type: "Biceps",
    id: "20",
    difficulty: "Başlangıç",
  },
];

export const allTricepsExercises = [
  {
    name: "Paralel Bar Dips",
    subtitle: "Vücut ağırlığıyla triceps’i güçlendirir",
    type: "Triceps",
    id: "21",
    difficulty: "Orta",
  },
  {
    name: "Skull Crushers",
    subtitle: "Baş üstü ekstansiyonla triceps’i izole eder",
    type: "Triceps",
    id: "22",
    difficulty: "İleri",
  },
];

export const allAbsExercises = [
  {
    name: "Plank",
    subtitle: "Karın ve bel (alt sırt) için merkez stabilite egzersizi",
    type: "Karın",
    id: "23",
    difficulty: "Başlangıç",
    animationSource: "plank",
  },
  {
    name: "Mekik",
    subtitle: "Üst karın kaslarını hedefler",
    type: "Karın",
    id: "24",
    difficulty: "Başlangıç",
  },
  {
    name: "Russian Twist",
    subtitle: "Merkez kuvveti ve rotasyonel stabiliteyi artırır",
    type: "Karın",
    id: "25",
    difficulty: "Orta",
  },
  {
    name: "Dağ Tırmanışı",
    subtitle: "Dinamik bir core ve kardiyo egzersizi",
    type: "Karın",
    id: "26",
    difficulty: "Orta",
  },
];

export const exerciseTypes = [
  { label: "Göğüs", value: "Göğüs" },
  { label: "Sırt", value: "Sırt" },
  { label: "Omuz", value: "Omuz" },
  { label: "Bacak", value: "Bacak" },
  { label: "Biceps", value: "Biceps" },
  { label: "Triceps", value: "Triceps" },
  { label: "Karın", value: "Karın" },
];

export const getExercisesByType = (type) => {
  switch (type) {
    case "Göğüs":
      return allChestExercises;
    case "Sırt":
      return allBackExercises;
    case "Omuz":
      return allShoulderExercises;
    case "Bacak":
      return allLegExercises;
    case "Biceps":
      return allBicepsExercises;
    case "Triceps":
      return allTricepsExercises;
    case "Karın":
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
