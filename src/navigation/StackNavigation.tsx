import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useRef } from "react";

import BottomTabs from "./BottomTabs";
import DetailScreen from "../screens/DetailScreen";
import { createStackNavigator } from "@react-navigation/stack";
import AddExerciseScreen from "../screens/AddExerciseScreen";
import { GuideModal } from "../screens/GuideModal";
import { useProfile } from "../context/ProfileContext";
import { AppColors } from "../styles/colors";
import { s } from "react-native-size-matters";
import LottieView from "lottie-react-native";

const StackNavigation = () => {
  const { isGuideCompleted, setGuideCompleted, isLoading } = useProfile();
  const Stack = createStackNavigator();
  const animation = useRef<LottieView>(null);
  const handleGuideComplete = async () => {
    try {
      await setGuideCompleted();
    } catch (error) {
      console.error("Guide error:", error);
    }
  };

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <View style={styles.spinner}>
          <LottieView
            autoPlay
            loop
            ref={animation}
            style={styles.spinnerAnimation}
            source={require("../assets/animations/spinner.json")}
          />
        </View>
      </View>
    );
  }

  if (!isGuideCompleted()) {
    return (
      <GuideModal
        visible={true}
        onClose={handleGuideComplete}
        navigation={null}
      />
    );
  }

  return (
    <Stack.Navigator initialRouteName="BottomTabs">
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddExerciseScreen"
        component={AddExerciseScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.blackBgColor,
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
