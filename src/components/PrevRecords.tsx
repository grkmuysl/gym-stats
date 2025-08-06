import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppLineChart from "./AppLineChart";

const PrevRecords = () => {
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

  const latestData = [
    {
      value: 40,
      customDataPoint: dPoint,
    },
    {
      value: 60,
      hideDataPoint: true,
    },
    {
      value: 30,
      customDataPoint: dPoint,
    },
    {
      value: 80,
      hideDataPoint: true,
    },
    {
      value: 90,
      customDataPoint: dPoint,
    },
    {
      value: 95,
      hideDataPoint: true,
    },
    {
      value: 67,
      customDataPoint: dPoint,
    },
    {
      value: 32,
      hideDataPoint: true,
    },
    {
      value: 28,
      customDataPoint: dPoint,
    },
    {
      value: 73,
      hideDataPoint: true,
    },
    {
      value: 90,
      customDataPoint: dPoint,
    },
    {
      value: 110,
      hideDataPoint: true,
    },
    {
      value: 70,
      customDataPoint: dPoint,
    },
    {
      value: 95,
      hideDataPoint: true,
    },
    {
      value: 120,
      hideDataPoint: true,
    },
    {
      value: 100,
      customDataPoint: dPoint,
    },
    {
      value: 50,
      customDataPoint: dPoint,
    },
    {
      value: 80,
      hideDataPoint: true,
    },
    {
      value: 130,
      customDataPoint: dPoint,
    },
  ];

  return (
    <View>
      <AppLineChart data={latestData} />
    </View>
  );
};

export default PrevRecords;

const styles = StyleSheet.create({});
