import { StyleSheet, View } from "react-native";
import React from "react";
import AppLineChart from "./AppLineChart";
import { useRecords } from "../../context/ExerciseRecordsContext";

const PrevRecords = ({ exerciseName }) => {
  const dPoint = () => {
    return (
      <View
        style={{
          width: 14,
          height: 14,
          backgroundColor: "white",
          borderWidth: 3,
          borderRadius: 7,
          borderColor: "#07BAD1",
        }}
      />
    );
  };

  const { allRecords } = useRecords();

  const filteredAndSortedRecords = [...allRecords]
    .filter((record) => record.exerciseName === exerciseName)
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });

  const weights = filteredAndSortedRecords.map((record) => ({
    value: record.weight,
    hideDataPoint: true,
  }));

  return (
    <View>
      <AppLineChart data={weights} />
    </View>
  );
};

export default PrevRecords;

const styles = StyleSheet.create({});
