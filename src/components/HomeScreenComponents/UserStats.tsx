import { StyleSheet, View } from "react-native";
import React from "react";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";
import WeightGraph from "./WeightGraph";
import BodyScoreGraph from "./BodyScoreGraph";
import { useProfile } from "../../context/ProfileContext";

const UserStats = () => {
  const { profileInformation, resetGuide } = useProfile();

  const height = profileInformation.height || "";
  const weight = profileInformation.weight || "";
  return (
    <View style={styles.container}>
      <WeightGraph weight={weight} height={height} />
      <BodyScoreGraph />
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
