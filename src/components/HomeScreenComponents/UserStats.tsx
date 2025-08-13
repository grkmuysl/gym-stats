import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";
import WeightGraph from "./WeightGraph";
import BodyScoreGraph from "./BodyScoreGraph";

const UserStats = () => {
  return (
    <View style={styles.container}>
      <WeightGraph weight={110} height={180} />

      <BodyScoreGraph weight={60} height={180} />
    </View>
  );
};

export default UserStats;

const styles = StyleSheet.create({
  container: {
    width: s(320),
    marginTop: vs(8),
    flexDirection: "column",
    borderRadius: s(18),
  },
  weight: {
    flex: 1,
    marginLeft: s(10),
  },
  bodyScore: {
    flex: 1,
    marginLeft: s(10),
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
