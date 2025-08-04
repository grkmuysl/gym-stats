import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../styles/colors";
import AppButton from "../components/Button/AppButton";
import { useNavigation } from "@react-navigation/native";

const EmptyFavoritesScreen = () => {
  const navigation = useNavigation();

  const goToAllExercises = () => {
    navigation.navigate("All Exercises");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/empty-gym.png")}
        style={styles.img}
      />
      <Text style={styles.title}>Favorites List is Empty.</Text>
      <Text style={styles.subtitle}>Exercises are waiting for you.</Text>
      <AppButton
        onPress={goToAllExercises}
        title="Go to Exercises"
        style={styles.btn}
      />
    </View>
  );
};

export default EmptyFavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  img: {
    height: vs(264),
    width: s(264),
    borderRadius: s(16),
    marginTop: vs(56),
  },
  title: {
    color: AppColors.whiteColor,
    marginTop: vs(8),
    fontSize: s(16),
    fontFamily: "Roboto-Regular",
  },
  subtitle: {
    color: AppColors.lightGray,
    marginTop: vs(4),
    fontSize: s(14),
    fontFamily: "Roboto-Regular",
  },
  btn: {
    marginTop: vs(16),
  },
});
