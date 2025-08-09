import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";
import AntDesign from "@expo/vector-icons/AntDesign";

const LastChanges = ({ data }) => {
  const data_size = data.length;

  let lastData = 0;
  let minValue = 0;
  let penultimate = 0;
  let isPositive = true;

  if (data_size > 0) {
    lastData = data[data_size - 1];
    penultimate = data[data_size - 2];
    minValue = Math.min(...data);
    isPositive = lastData - penultimate > 0;
  }

  console.log(minValue);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={isPositive ? styles.positive : styles.negative}>
            {isPositive ? (
              <AntDesign
                name="caretup"
                size={24}
                color={isPositive ? AppColors.greenColor : AppColors.redColor}
              />
            ) : (
              <AntDesign
                name="caretdown"
                size={24}
                color={isPositive ? AppColors.greenColor : AppColors.redColor}
              />
            )}{" "}
            {(lastData - penultimate).toFixed(2)}
          </Text>

          <Text style={styles.progress}>Progress (1 Nisan)</Text>
        </View>

        <View>
          <Text style={isPositive ? styles.positive : styles.negative}>
            {isPositive ? (
              <AntDesign
                name="caretup"
                size={24}
                color={isPositive ? AppColors.greenColor : AppColors.redColor}
              />
            ) : (
              <AntDesign
                name="caretdown"
                size={24}
                color={isPositive ? AppColors.greenColor : AppColors.redColor}
              />
            )}{" "}
            {(lastData - minValue).toFixed(2)}
          </Text>
          <Text style={styles.progress}>Progress (1 Nisan)</Text>
        </View>
      </View>
    </View>
  );
};

export default LastChanges;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.grayBgColor,
    height: vs(128),
    width: s(316),
    borderRadius: s(12),
    marginTop: vs(12),
    padding: s(12),
    marginBottom: vs(16),
  },

  innerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: vs(20),
  },
  positive: {
    color: AppColors.greenColor,
    fontFamily: "Roboto-Regular",
    fontSize: s(18),
  },
  negative: {
    color: AppColors.redColor,
    fontFamily: "Roboto-Regular",
    fontSize: s(18),
  },
  progress: {
    fontFamily: "Roboto-Light",
    fontSize: s(12),
    color: AppColors.lightGray,
  },
});
