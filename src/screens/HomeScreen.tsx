import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import Exercise from "../components/Exercise/Exercise";
import { AppColors } from "../styles/colors";
import UserStats from "../components/HomeScreenComponents/UserStats";
import AllRecords from "../components/DetailPageComponents/AllRecords";
import { s, vs } from "react-native-size-matters";
import { ScrollView } from "react-native-gesture-handler";

const HomeScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.userStats}>
          <Text style={styles.title}>User Stats</Text>
          <UserStats />
        </View>
        <View style={styles.allRecords}>
          <Text style={styles.title}>All Records</Text>
          <AllRecords />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: AppColors.blackBgColor,
    flex: 1,
  },
  userStats: {
    padding: s(12),
    marginTop: vs(16),
  },

  title: {
    fontSize: s(18),
    fontFamily: "Roboto-Regular",
    color: AppColors.whiteColor,
    left: s(4),
  },
  allRecords: {
    marginTop: vs(8),
    width: s(316),
  },
});
