import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import FavouriteScreen from "../screens/FavouriteScreen";
import AllExercisesScreen from "../screens/AllExercisesScreen";
import { AppColors } from "../styles/colors";
import { s, vs } from "react-native-size-matters";
import ProfileScreen from "../screens/ProfileScreen";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: AppColors.whiteColor,
        tabBarInactiveTintColor: AppColors.lightGray,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: AppColors.grayBgColor,
          height: vs(72),
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Anasayfa"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="home-outline"
              size={24}
              color={AppColors.limeGreenColor}
            />
          ),
          tabBarLabelStyle: {
            fontSize: s(10),
            fontFamily: "Roboto-Regular",
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favoriler"
        component={FavouriteScreen}
        options={{
          tabBarIcon: () => (
            <MaterialIcons
              name="favorite-border"
              size={24}
              color={AppColors.limeGreenColor}
            />
          ),
          tabBarLabelStyle: {
            fontSize: s(10),
            fontFamily: "Roboto-Regular",
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Tüm Egzersizler"
        component={AllExercisesScreen}
        options={{
          tabBarIcon: () => (
            <Feather name="list" size={24} color={AppColors.limeGreenColor} />
          ),
          tabBarLabelStyle: {
            fontSize: s(10),
            fontFamily: "Roboto-Regular",
          },
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome5
              name="user"
              size={24}
              color={AppColors.limeGreenColor}
            />
          ),
          tabBarLabelStyle: {
            fontSize: s(10),
            fontFamily: "Roboto-Regular",
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
