import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import Exercise from "../components/Exercise";
import { AppColors } from "../styles/colors";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Exercise title="Push-Up" subTitle="A basic upper body exercise" />
      <Exercise title="Bench Press" subTitle="A basic upper body exercise" />
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
