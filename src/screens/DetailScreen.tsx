import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppColors } from "../styles/colors";
import GoBackButton from "../components/Button/GoBackButton";
import PrevRecords from "../components/DetailPageComponents/PrevRecords";
import { s, vs } from "react-native-size-matters";
import LastChanges from "../components/DetailPageComponents/LastChanges";

const DetailScreen = ({ route }) => {
  console.log(route.params);

  const data = [100.32, 120.21, 90.52, 110.12];
  return (
    <View style={styles.container}>
      <GoBackButton style={styles.goBackBtn} size={24} />

      <Text style={styles.pageTitle}>{route.params.name}</Text>

      <View style={styles.innerContainer}>
        <Text style={styles.innerTitle}>Prev Records</Text>
        <PrevRecords />

        <LastChanges data={data} />
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
    justifyContent: "center",
    alignItems: "center",
  },
  innerTitle: {
    color: AppColors.whiteColor,
    fontFamily: "Roboto-Regular",
    fontSize: s(18),
    left: 10,
    marginTop: vs(16),
    alignSelf: "flex-start",
  },
  pageTitle: {
    color: AppColors.whiteColor,
    fontFamily: "Roboto-SemiBold",
    fontSize: s(22),
    alignSelf: "center",
  },
});
