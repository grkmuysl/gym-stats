import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppColors } from "../styles/colors";
import Header from "../components/Header";
import GoBackButton from "../components/Button/GoBackButton";
import PrevRecords from "../components/PrevRecords";

const DetailScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <GoBackButton style={styles.goBackBtn} size={24} />
      <View style={styles.innerContainer}>
        <PrevRecords />
      </View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.blackBgColor,
  },
  goBackBtn: {
    position: "relative",
    top: 12,
    left: 12,
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
