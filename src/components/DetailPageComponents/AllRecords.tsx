import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";
import GymCalendar from "../Calendar/GymCalendar";

const AllRecords = () => {
  return (
    <View style={styles.container}>
      <GymCalendar />
    </View>
  );
};

export default AllRecords;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.grayBgColor,
    marginTop: vs(8),
    marginBottom: vs(24),
    borderRadius: s(16),
    padding: s(8),
  },
});
