import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import Exercise from "../components/Exercise";
import { AppColors } from "../styles/colors";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: AppColors.blackBgColor,
    flex: 1,
  },
});
