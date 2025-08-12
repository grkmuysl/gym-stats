import { StyleSheet, Text, View } from "react-native";
import React from "react";

import BottomTabs from "./BottomTabs";
import DetailScreen from "../screens/DetailScreen";
import { createStackNavigator } from "@react-navigation/stack";
import AddExerciseScreen from "../screens/AddExerciseScreen";

const StackNavigation = () => {
  const Stack = createStackNavigator();
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

const styles = StyleSheet.create({});
