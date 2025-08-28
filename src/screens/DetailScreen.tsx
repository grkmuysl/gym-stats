import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
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

const DetailScreen = ({ route }) => {
  const exerciseName = route.params?.name;
  const { refreshRecords, isLoading } = useRecords();

  const animation = useRef<LottieView>(null);
  const animationKey = route.params?.animationSource;

  console.log(animationKey);

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
        <Text style={styles.pageTitle}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <GoBackButton style={styles.goBackBtn} />

      <Text style={styles.pageTitle}>{route.params.name}</Text>

      <View style={styles.animationContainer}>
        <LottieView
          autoPlay
          ref={animation}
          style={styles.animation}
          source={animations[animationKey]}
        />
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.innerTitle}>Önceki Kayıtlar</Text>
        <PrevRecords exerciseName={route.params.name} />

        <Text style={styles.title}>Son Değişiklikler</Text>
        <LastChanges exerciseName={route.params.name} />

        <Text style={styles.title}>Tüm {route.params.name} Kayıtları</Text>
        <AllRecords exerciseName={exerciseName} />
      </View>
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.blackBgColor,
  },
  goBackBtn: {
    position: "relative",
    top: 12,
    left: 12,
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
    backgroundColor: "#b7b3b3ff",
    borderRadius: s(16),
  },
  animation: {
    width: "100%",
    height: "100%",
  },
});
