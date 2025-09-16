import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useRef } from "react";
import { AppColors } from "../styles/colors";
import GoBackButton from "../components/Button/GoBackButton";
import PrevRecords from "../components/DetailPageComponents/PrevRecords";
import { s, vs } from "react-native-size-matters";
import LastChanges from "../components/DetailPageComponents/LastChanges";
import AllRecords from "../components/DetailPageComponents/AllRecords";
import { ScrollView } from "react-native-gesture-handler";
import { useRecords } from "../context/ExerciseRecordsContext";
import { useFocusEffect } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import animations from "../data/Animations";
import CustomSpinner from "../components/Spinner/CustomSpinner";

const DetailScreen = ({ route }) => {
  const exerciseName = route.params?.name;
  const inputType = route.params?.inputType;

  const { refreshRecords, isLoading } = useRecords();

  const animation = useRef<LottieView>(null);
  const animationKey = route.params?.animationSource;

  const ANIMATION_SIZES = {
    verySmall: [
      "One-Arm Row",
      "Hip Thrust",
      "Dağ Tırmanışı",
      "Incline Biceps Curl",
    ],
    small: [
      "Deadlift",
      "Pec Deck",
      "Cable Crossover",
      "Bent Over Row",
      "Cable Row",
      "Bulgarian Split Squat",
      "Triceps Extension",
      "Wrist Hammer Curl",
      "Mekik",
      "Koşu Bandı",
      "Preacher Biceps Curl",
    ],
    big: [
      "Şınav",
      "Barfiks",
      "Shoulder Press Machine",
      "Squat",
      "Leg Press",
      "Paralel Bar Dips",
      "Crunch",
      "Russian Twist",
    ],
  };

  const STYLE_MAP = {
    verySmall: styles.verySmallAnimation,
    small: styles.smallAnim,
    big: styles.bigAnimation,
    mid: styles.midAnim,
  };

  const getAnimationStyle = (name: string) => {
    for (const [size, exercises] of Object.entries(ANIMATION_SIZES)) {
      if (exercises.includes(name)) {
        return STYLE_MAP[size as keyof typeof STYLE_MAP];
      }
    }
    return STYLE_MAP.mid;
  };

  useFocusEffect(
    useCallback(() => {
      refreshRecords();
    }, [refreshRecords])
  );

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <CustomSpinner />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <GoBackButton style={styles.goBackBtn} />

        <Text style={styles.pageTitle}>{route.params.name}</Text>

        <View style={styles.animationContainer}>
          <LottieView
            autoPlay
            ref={animation}
            style={getAnimationStyle(exerciseName)}
            source={animations[animationKey]}
          />
        </View>

        <View style={styles.innerContainer}>
          {inputType === "duration" ? (
            <Text style={styles.innerTitle}>Önceki Kayıtlar (Toplam Süre)</Text>
          ) : inputType === "reps" ? (
            <Text style={styles.innerTitle}>
              Önceki Kayıtlar (Toplam Tekrar Sayısı)
            </Text>
          ) : (
            <Text style={styles.innerTitle}>Önceki Kayıtlar</Text>
          )}

          <PrevRecords
            exerciseName={route.params.name}
            inputType={route.params.inputType}
          />

          <Text style={styles.title}>Son Değişiklikler</Text>
          <LastChanges
            exerciseName={route.params.name}
            inputType={route.params.inputType}
          />

          <Text style={styles.title}>Tüm {route.params.name} Kayıtları</Text>
          <AllRecords exerciseName={exerciseName} />
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.blackBgColor,
  },
  scrollView: {
    marginTop: vs(16),
  },
  goBackBtn: {
    position: "relative",
    top: s(28),
    left: s(14),
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  innerTitle: {
    color: AppColors.whiteColor,
    fontFamily: "Roboto-Regular",
    fontSize: s(14),
    left: s(22),
    marginTop: vs(16),
    alignSelf: "flex-start",
  },
  pageTitle: {
    color: AppColors.whiteColor,
    fontFamily: "Roboto-SemiBold",
    fontSize: s(18),
    alignSelf: "center",
    marginTop: vs(4),
  },
  title: {
    fontFamily: "Roboto-Regular",
    fontSize: s(14),
    color: AppColors.whiteColor,
    alignSelf: "flex-start",
    left: s(22),
  },
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: vs(200),
    width: s(316),
    marginLeft: s(16),
    marginTop: s(8),
    backgroundColor: AppColors.grayBgColor,
    borderRadius: s(16),
  },
  bigAnimation: {
    width: "100%",
    height: "100%",
  },
  smallAnim: {
    width: "70%",
    height: "70%",
  },
  verySmallAnimation: {
    width: "60%",
    height: "60%",
  },
  midAnim: {
    width: "80%",
    height: "80%",
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerAnimation: {
    width: s(120),
    height: s(120),
  },
});
