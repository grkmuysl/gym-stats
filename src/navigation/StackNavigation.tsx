import { StyleSheet, View } from "react-native";
import React, { useRef } from "react";

import BottomTabs from "./BottomTabs";
import DetailScreen from "../screens/DetailScreen";
import { createStackNavigator } from "@react-navigation/stack";
import AddExerciseScreen from "../screens/AddExerciseScreen";
import { GuideModal } from "../screens/GuideModal";
import { useProfile } from "../context/ProfileContext";
import { AppColors } from "../styles/colors";
import CustomSpinner from "../components/Spinner/CustomSpinner";

const StackNavigation = () => {
  const { isGuideCompleted, setGuideCompleted, isLoading } = useProfile();
  const Stack = createStackNavigator();

  const handleGuideComplete = async () => {
    try {
      await setGuideCompleted();
    } catch (error) {
      console.error("Guide error:", error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <CustomSpinner />
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
    <Stack.Navigator
      initialRouteName="BottomTabs"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: {
            opacity: current.progress,
          },
        }),
      }}
    >
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="AddExerciseScreen" component={AddExerciseScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: AppColors.blackBgColor,
    justifyContent: "center",
    alignItems: "center",
  },
});
