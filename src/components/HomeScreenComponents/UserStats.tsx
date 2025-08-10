import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";
import WeightGraph from "./WeightGraph";

const UserStats = () => {
  return (
    <View style={styles.container}>
      <View style={styles.weight}>
        <Text style={styles.title}>Weight</Text>
        <Text style={styles.subTitle}>28 Temmuz</Text>

        <WeightGraph weight={80} height={180} />
      </View>

      <View style={styles.bodyScore}>
        <Text style={styles.title}>Body Score</Text>
        <Text style={styles.subTitle}>28 Temmuz</Text>
      </View>
    </View>
  );
};

export default UserStats;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.grayBgColor,
    height: vs(240),
    width: s(350),
    marginTop: vs(12),
    flexDirection: "row",
    borderRadius: s(16),
    padding: s(12),
  },
  weight: {
    flex: 1,
  },
  bodyScore: {
    flex: 1,
  },
  title: {
    left: s(4),
    fontFamily: "Roboto-Regular",
    fontSize: s(14),
    color: AppColors.whiteColor,
  },
  subTitle: {
    fontSize: s(12),
    left: s(4),
    color: AppColors.lightGray,
  },
});
