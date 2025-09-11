import { StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";
import GymCalendar from "../Calendar/GymCalendar";
import { useRecords } from "../../context/ExerciseRecordsContext";

const AllRecords = ({ exerciseName = null }) => {
  const { allRecords, removeRecord } = useRecords();

  const formattedRecords = useMemo(() => {
    const groupedRecords: { [key: string]: any[] } = {};

    const filteredRecords = exerciseName
      ? allRecords.filter((record) => record.exerciseName === exerciseName)
      : allRecords;

    filteredRecords.forEach((record) => {
      const dateKey = record.date.split("T")[0];

      if (!groupedRecords[dateKey]) {
        groupedRecords[dateKey] = [];
      }

      groupedRecords[dateKey].push({
        exercise: record.exerciseName,
        sets: record.setsCount,
        reps: record.repsCount,
        weight: record.weight > 0 ? `${record.weight}kg` : "Bodyweight",
        id: record.id,
      });
    });

    return groupedRecords;
  }, [allRecords, exerciseName]);

  return (
    <View style={styles.container}>
      <GymCalendar records={formattedRecords} removeRecord={removeRecord} />
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
