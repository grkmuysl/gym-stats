import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { s } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import LottieView from "lottie-react-native";

const CustomSpinner = () => {
  const animation = useRef<LottieView>(null);
  return (
    <View style={styles.customLoadingContainer}>
      <View style={styles.spinner}>
        <LottieView
          autoPlay
          loop
          ref={animation}
          style={styles.spinnerAnimation}
          source={require("../../assets/animations/spinner.json")}
        />
      </View>
    </View>
  );
};

export default CustomSpinner;

const styles = StyleSheet.create({
  customLoadingContainer: {
    flex: 1,
    backgroundColor: AppColors.blackBgColor,
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerAnimation: {
    width: s(120),
    height: s(120),
  },
});
