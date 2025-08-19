import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { AppColors } from "../styles/colors";
import GoBackButton from "../components/Button/GoBackButton";
import PrevRecords from "../components/DetailPageComponents/PrevRecords";
import { s, vs } from "react-native-size-matters";
import LastChanges from "../components/DetailPageComponents/LastChanges";
import AllRecords from "../components/DetailPageComponents/AllRecords";
import { ScrollView } from "react-native-gesture-handler";
import { useRecords } from "../context/ExerciseRecordsContext";
import { useFocusEffect } from "@react-navigation/native";

const DetailScreen = ({ route }) => {
  const exerciseName = route.params?.name;
  const { refreshRecords, isLoading } = useRecords();

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
        <Text style={styles.pageTitle}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <GoBackButton style={styles.goBackBtn} />

      <Text style={styles.pageTitle}>{route.params.name}</Text>

      <View style={styles.innerContainer}>
        <Text style={styles.innerTitle}>Prev Records</Text>
        <PrevRecords exerciseName={route.params.name} />

        <Text style={styles.title}>Last Changes</Text>
        <LastChanges exerciseName={route.params.name} />

        <Text style={styles.title}>All {route.params.name} Records</Text>
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
});
