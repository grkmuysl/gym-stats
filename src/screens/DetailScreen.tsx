import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppColors } from "../styles/colors";
import GoBackButton from "../components/Button/GoBackButton";
import PrevRecords from "../components/DetailPageComponents/PrevRecords";
import { s, vs } from "react-native-size-matters";
import LastChanges from "../components/DetailPageComponents/LastChanges";
import AllRecords from "../components/DetailPageComponents/AllRecords";
import { ScrollView } from "react-native-gesture-handler";

const DetailScreen = ({ route }) => {
  console.log(route.params);

  const data = [100.32, 120.21, 90.52, 110.12];

  const exampleRecords = [
    {
      setCount: 4,
      repCounts: [12, 5, 6, 7],
      weights: ["15", "15", "17.5", "20"],
      date: "2025-08-07",
    },
    {
      setCount: 3,
      repCounts: [12, 10, 8, 12],
      weights: ["15", "17.5", "20"],
      date: "2025-08-09",
    },
  ];
  return (
    <ScrollView style={styles.container}>
      <GoBackButton style={styles.goBackBtn} size={24} />

      <Text style={styles.pageTitle}>{route.params.name}</Text>

      <View style={styles.innerContainer}>
        <Text style={styles.innerTitle}>Prev Records</Text>
        <PrevRecords />

        <Text style={styles.title}>Last Changes</Text>
        <LastChanges data={data} />

        <Text style={styles.title}>All Records</Text>
        <AllRecords />
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
    left: 10,
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
    left: 16,
  },
});
