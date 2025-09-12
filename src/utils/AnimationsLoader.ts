// utils/AnimationLoader.ts
export const AnimationLoader = {
  // Chest Exercises
  pushUp: () => require("../assets/animations/exerciseAnimations/push-up.json"),
  benchPress: () =>
    require("../assets/animations/exerciseAnimations/bench-press.json"),
  incline_bench_press: () =>
    require("../assets/animations/exerciseAnimations/incline-bench-press.json"),
  decline_bench_press: () =>
    require("../assets/animations/exerciseAnimations/decline-bench-press.json"),
  dumbbell_bench_press: () =>
    require("../assets/animations/exerciseAnimations/dumbell-bench-press.json"),
  dumbbell_fly: () =>
    require("../assets/animations/exerciseAnimations/dumbbell-fly.json"),
  cable_crossover: () =>
    require("../assets/animations/exerciseAnimations/cable-crossover.json"),
  pec_deck: () =>
    require("../assets/animations/exerciseAnimations/pec-dec.json"),
  chest_press_machine: () =>
    require("../assets/animations/exerciseAnimations/chest-machine.json"),

  // Back Exercises
  deadLift: () =>
    require("../assets/animations/exerciseAnimations/deadLift.json"),
  pullUp: () => require("../assets/animations/exerciseAnimations/pull-up.json"),
  bent_over_row: () =>
    require("../assets/animations/exerciseAnimations/bent-over-row.json"),
  lat_pull_down: () =>
    require("../assets/animations/exerciseAnimations/lat-pull-down.json"),
  face_pull: () =>
    require("../assets/animations/exerciseAnimations/face-pull.json"),
  one_arm_row: () =>
    require("../assets/animations/exerciseAnimations/one-arm-row.json"),
  cable_row: () =>
    require("../assets/animations/exerciseAnimations/cable-row.json"),
  high_pulley: () =>
    require("../assets/animations/exerciseAnimations/cable-high-pulley.json"),

  // Shoulder Exercises
  shoulder_press: () =>
    require("../assets/animations/exerciseAnimations/shoulder-press.json"),
  lateral_raise: () =>
    require("../assets/animations/exerciseAnimations/lateral-raise.json"),
  front_raise: () =>
    require("../assets/animations/exerciseAnimations/front-raise.json"),
  shoulder_press_machine: () =>
    require("../assets/animations/exerciseAnimations/shoulder-press-machine.json"),

  // Leg Exercises
  legPress: () =>
    require("../assets/animations/exerciseAnimations/leg-press.json"),
  squat: () => require("../assets/animations/exerciseAnimations/squat.json"),
  weighted_squat: () =>
    require("../assets/animations/exerciseAnimations/sqaut-agirlikli.json"),
  lunge: () => require("../assets/animations/exerciseAnimations/lunge.json"),
  bulgarian_split: () =>
    require("../assets/animations/exerciseAnimations/bulgarian-split.json"),
  hip_thrust: () =>
    require("../assets/animations/exerciseAnimations/hip-thrust.json"),

  // Biceps Exercises
  biceps_curl: () =>
    require("../assets/animations/exerciseAnimations/biceps-curl.json"),
  biceps_curl_dumb: () =>
    require("../assets/animations/exerciseAnimations/biceps-curl-dumb.json"),
  hammer_curl: () =>
    require("../assets/animations/exerciseAnimations/hammer.json"),
  incline_biceps_curl: () =>
    require("../assets/animations/exerciseAnimations/incline-biceps.json"),
  preacher_biceps_curl: () =>
    require("../assets/animations/exerciseAnimations/preacher_biceps.json"),

  // Triceps Exercises
  dips: () => require("../assets/animations/exerciseAnimations/dips.json"),
  triceps_extension: () =>
    require("../assets/animations/exerciseAnimations/triceps-extension.json"),
  triceps_pushdown: () =>
    require("../assets/animations/exerciseAnimations/tricecp-pushdown.json"),

  // Forearms Exercises
  seated_wrist_curl: () =>
    require("../assets/animations/exerciseAnimations/seated-wrist-curl.json"),
  ulnar_deviation: () =>
    require("../assets/animations/exerciseAnimations/ulnar-deviation.json"),
  wrist_hammer_curl: () =>
    require("../assets/animations/exerciseAnimations/wrist-hammer-curl.json"),

  // Abs Exercises
  plank: () => require("../assets/animations/exerciseAnimations/plank.json"),
  mekik: () => require("../assets/animations/exerciseAnimations/mekik.json"),
  russian_twist: () =>
    require("../assets/animations/exerciseAnimations/russian-twist.json"),
  mountain_climber: () =>
    require("../assets/animations/exerciseAnimations/mountain-climber.json"),
  crunch: () => require("../assets/animations/exerciseAnimations/crunch.json"),
  bridge: () => require("../assets/animations/exerciseAnimations/bridge.json"),
  cobras: () => require("../assets/animations/exerciseAnimations/cobras.json"),
  side_hip: () =>
    require("../assets/animations/exerciseAnimations/side-hip.json"),

  // Cardio Exercises
  treadmill: () =>
    require("../assets/animations/exerciseAnimations/treadmill.json"),

  // Icon Animations
  chest: () =>
    require("../assets/animations/exerciseIconsAnimations/chest-animated.json"),
  back: () =>
    require("../assets/animations/exerciseIconsAnimations/back-animated.json"),
  shoulder: () =>
    require("../assets/animations/exerciseIconsAnimations/shoulder-animated.json"),
  leg: () =>
    require("../assets/animations/exerciseIconsAnimations/leg-animated.json"),
  biceps: () =>
    require("../assets/animations/exerciseIconsAnimations/biceps-animated.json"),
  triceps: () =>
    require("../assets/animations/exerciseIconsAnimations/triceps-animated.json"),
  forearms: () =>
    require("../assets/animations/exerciseIconsAnimations/forearms-animated.json"),
  abs: () =>
    require("../assets/animations/exerciseIconsAnimations/abs-animated.json"),
  cardio: () =>
    require("../assets/animations/exerciseIconsAnimations/cardio-animated.json"),
};

// Type safety için
export type AnimationKey = keyof typeof AnimationLoader;

// Cache için
const animationCache = new Map<AnimationKey, any>();

export const getAnimation = async (key: AnimationKey): Promise<any> => {
  // Cache'den kontrol et
  if (animationCache.has(key)) {
    return animationCache.get(key);
  }

  try {
    // Animasyonu yükle
    const animation = AnimationLoader[key]();

    // Cache'e kaydet
    animationCache.set(key, animation);

    return animation;
  } catch (error) {
    console.warn(`Animation ${key} yüklenemedi:`, error);
    return null;
  }
};

// Cache temizleme fonksiyonu (memory management için)
export const clearAnimationCache = () => {
  animationCache.clear();
};

// Belirli bir animasyonu cache'den kaldır
export const removeFromCache = (key: AnimationKey) => {
  animationCache.delete(key);
};
