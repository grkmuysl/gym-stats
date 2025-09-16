import { StyleSheet, View } from "react-native";
import React from "react";
import AppLineChart from "./AppLineChart";
import { useRecords } from "../../context/ExerciseRecordsContext";

const PrevRecords = ({ exerciseName, inputType }) => {
  const { allRecords } = useRecords();

  const filteredAndSortedRecords = [...allRecords]
    .filter((record) => record.exerciseName === exerciseName)
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });

  let lineChartData;

  if (inputType === "weight") {
    lineChartData = filteredAndSortedRecords.map((record) => ({
      value: record.weight,
      hideDataPoint: true,
    }));
  } else if (inputType === "duration") {
    lineChartData = filteredAndSortedRecords.map((record) => ({
      value: record.duration * record.setsCount,
      hideDataPoint: true,
    }));
  } else {
    lineChartData = filteredAndSortedRecords.map((record) => ({
      value: record.repsCount * record.setsCount,
      hideDataPoint: true,
    }));
  }

  return (
    <View>
      <AppLineChart data={lineChartData} />
    </View>
  );
};

export default PrevRecords;

const styles = StyleSheet.create({});
