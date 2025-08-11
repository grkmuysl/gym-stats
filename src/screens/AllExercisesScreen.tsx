import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Exercise from "../components/Exercise/Exercise";
import { AppColors } from "../styles/colors";
import Header from "../components/Header";

import { s, vs } from "react-native-size-matters";
import {
  allAbsExercises,
  allBackExercises,
  allBicepsExercises,
  allChestExercises,
  allLegExercises,
  allShoulderExercises,
  allTricepsExercises,
} from "../data/AllExercises";

type ExerciseItem = {
  name: string;
  subtitle: string;
  type: string;
  id: string;
  difficulty: string;
};

type ExerciseCategory = {
  title: string;
  data: ExerciseItem[];
};

const AllExercisesScreen = () => {
  const EXERCISE_CATEGORIES: ExerciseCategory[] = [
    { title: "CHEST EXERCISES", data: allChestExercises },
    { title: "BACK EXERCISES", data: allBackExercises },
    { title: "SHOULDER EXERCISES", data: allShoulderExercises },
    { title: "LEG EXERCISES", data: allLegExercises },
    { title: "BICEPS EXERCISES", data: allBicepsExercises },
    { title: "TRICEPS EXERCISES", data: allTricepsExercises },
    { title: "ABS EXERCISES", data: allAbsExercises },
  ];

  const renderCategory = ({ item }: { item: ExerciseCategory }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <FlatList
        data={item.data}
        renderItem={({ item }) => <Exercise ExerciseItem={item} />}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={EXERCISE_CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={(item) => item.title}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default AllExercisesScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppColors.blackBgColor,
    flex: 1,
  },
  title: {
    color: AppColors.whiteColor,
    fontSize: s(18),
    fontFamily: "Roboto-Regular",
    alignSelf: "flex-start",
    marginTop: vs(8),
    left: s(4),
  },
  categoryContainer: {
    marginBottom: vs(8),
  },
});
