import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import Exercise from "../components/Exercise";
import { AppColors } from "../styles/colors";
import Header from "../components/Header";
import { AllExercises } from "../data/AllExercises";
import { s } from "react-native-size-matters";

const AllExercisesScreen = () => {
  const ALL_EXERCISES = AllExercises;
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={ALL_EXERCISES}
        renderItem={({ item }) => <Exercise ExerciseItem={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default AllExercisesScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: s(10),
    backgroundColor: AppColors.blackBgColor,
    flex: 1,
  },
});
