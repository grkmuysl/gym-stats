import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";
import { calculateBMI } from "../../utils/BMICalculater";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BMI_TYPES } from "../../data/BMITypes";

const WeightGraph = ({ weight, height }) => {
  const { bmi, category } = calculateBMI(weight, height);

  let colorCode;
  if (category == BMI_TYPES.UNDERWEIGHT) {
    colorCode = AppColors.blueColor;
  } else if (category == BMI_TYPES.NORMAL_WEIGHT) {
    colorCode = AppColors.greenColor;
  } else if (category == BMI_TYPES.OVERWEIGHT) {
    colorCode = AppColors.orangeColor;
  } else if (category == BMI_TYPES.OBESE_1) {
    colorCode = AppColors.darkOrangeColor;
  } else if (category == BMI_TYPES.OBESE_2) {
    colorCode = AppColors.redColor;
  } else {
    colorCode = AppColors.purpleColor;
  }

  const dynamicContainerStyle = {
    ...styles.container,
    borderTopColor: colorCode,
  };

  const dynamicCategoryTitle = { ...styles.categoryTitle, color: colorCode };
  return (
    <View style={dynamicContainerStyle}>
      <AntDesign
        name="caretup"
        size={24}
        color={colorCode}
        style={styles.upIcon}
      />

      <Text style={styles.weight}>{weight}</Text>
      <Text style={styles.kg}>kg</Text>
      <View>
        <Text style={dynamicCategoryTitle}>{category}</Text>
      </View>
    </View>
  );
};

export default WeightGraph;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.grayBgColor,
    marginTop: vs(12),
    height: vs(120),
    width: s(120),
    borderRadius: s(60),
    borderWidth: s(12),
    borderLeftColor: AppColors.whiteColor,
    borderRightColor: AppColors.whiteColor,
    borderBottomColor: AppColors.grayBgColor,
    justifyContent: "center",
    alignItems: "center",
  },
  upIcon: {
    position: "absolute",
    top: -1,
  },
  weight: {
    color: AppColors.whiteColor,
    fontSize: s(18),
    fontFamily: "Roboto-SemiBold",
    marginTop: s(6),
  },
  kg: {
    color: AppColors.whiteColor,
    fontSize: s(14),
    fontFamily: "Roboto-SemiBold",
  },
  categoryTitle: {
    color: AppColors.whiteColor,
    fontSize: s(16),
    fontFamily: "Roboto-SemiBold",
    position: "absolute",
    top: vs(22),
    width: s(120),
    right: -82,
  },
});
