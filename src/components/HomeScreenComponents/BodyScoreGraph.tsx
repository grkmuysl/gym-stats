import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  calculateAdvancedBodyScore,
  calculateBMI,
  getBodyScoreDescription,
  getBodyScoreEmoji,
} from "../../utils/BMICalculater";

const BodyScoreGraph = ({ weight, height }) => {
  const { bmi } = calculateBMI(weight, height);

  const score = calculateAdvancedBodyScore(bmi, 23, "male");
  const body_score_description = getBodyScoreDescription(score);

  let colorCode;
  if (body_score_description === "Perfect") {
    colorCode = AppColors.blueColor;
  } else if (body_score_description === "Very Good") {
    colorCode = AppColors.greenColor;
  } else if (body_score_description === "Good") {
    colorCode = AppColors.orangeColor;
  } else if (body_score_description === "Normal") {
    colorCode = AppColors.darkOrangeColor;
  } else if (body_score_description === "Bad") {
    colorCode = AppColors.redColor;
  } else {
    colorCode = AppColors.purpleColor;
  }

  const dynamicContainerStyle = {
    ...styles.container,
    borderTopColor: colorCode,
  };

  const dynamicScoreStyle = {
    ...styles.score,
    color: colorCode,
  };

  const dynamicDescripton = {
    ...styles.description,
    color: colorCode,
  };
  return (
    <View style={dynamicContainerStyle}>
      <AntDesign
        name="caretup"
        size={24}
        color={colorCode}
        style={styles.upIcon}
      />
      <Text style={styles.emoji}>{getBodyScoreEmoji(score)}</Text>
      <Text style={dynamicScoreStyle}>{score}</Text>
      <Text style={dynamicDescripton}>{body_score_description}</Text>
    </View>
  );
};

export default BodyScoreGraph;

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
  score: {
    fontSize: s(18),
    fontFamily: "Roboto-Regular",
    marginTop: s(3),
  },

  emoji: {
    marginTop: vs(12),
    fontSize: s(24),
  },
  upIcon: {
    position: "absolute",
    top: -1,
  },
  description: {
    fontSize: s(16),
    fontFamily: "Roboto-SemiBold",
    marginTop: s(6),
    position: "absolute",
    top: vs(90),
    alignSelf: "center",
  },
});
