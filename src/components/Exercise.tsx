import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../styles/colors";
import AppButton from "./Button/AppButton";

interface ExerciseProps {
  title: string;
  subTitle: string;
}

const Exercise: FC<ExerciseProps> = ({ title, subTitle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftDetail}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      <View>
        <AppButton
          title="Add to Favourites"
          onPress={() => {
            console.log("favorilendi");
          }}
        />
      </View>
    </View>
  );
};

export default Exercise;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: vs(76),
    borderRadius: s(16),
    backgroundColor: AppColors.grayBgColor,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: s(16),
    marginTop: vs(16),
  },
  leftDetail: {
    width: "60%",
  },

  title: {
    fontSize: s(14),
    fontFamily: "Roboto-Regular",
    color: AppColors.whiteColor,
  },
  subTitle: {
    fontSize: s(12),
    color: AppColors.lightGray,
    fontFamily: "Roboto-Regular",
  },
});
