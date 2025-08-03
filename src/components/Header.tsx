import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { AppColors } from "../styles/colors";
import { s, vs } from "react-native-size-matters";

const Header = () => {
  return (
    <View style={styles.container}>
      <FontAwesome6 name="dumbbell" size={32} color="white" />

      <Text style={styles.title}>Gym Stats</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.lightGray,
    width: "100%",
    height: vs(80),
    flexDirection: "row",
    alignItems: "center",
    gap: s(16),
    padding: s(12),
  },
  title: {
    color: AppColors.whiteColor,
    fontSize: s(20),
    fontFamily: "Roboto-SemiBold",
  },
});
