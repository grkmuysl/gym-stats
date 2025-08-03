import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import FavouriteScreen from "../screens/FavouriteScreen";
import AllExercisesScreen from "../screens/AllExercisesScreen";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name="home-outline" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouriteScreen}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="favorite-border" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="All Exercises"
        component={AllExercisesScreen}
        options={{
          tabBarIcon: () => <Feather name="list" size={24} color="black" />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({});
