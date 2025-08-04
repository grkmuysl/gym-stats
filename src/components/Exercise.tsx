import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../styles/colors";
import AppButton from "./Button/AppButton";
import { ExerciseItem, useFavorites } from "../context/FavouritesContext";

const Exercise: React.FC<{ ExerciseItem: ExerciseItem }> = ({
  ExerciseItem,
}) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = favorites.some((item) => item.id === ExerciseItem.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(ExerciseItem.id);
    } else {
      addFavorite(ExerciseItem);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftDetail}>
        <Text style={styles.title}>{ExerciseItem.name}</Text>
        <Text style={styles.subTitle}>{ExerciseItem.subtitle}</Text>
      </View>
      <View>
        <AppButton
          title={isFavorite ? "Remove Favorites" : "Add to Favorites"}
          onPress={toggleFavorite}
        />
      </View>
    </View>
  );
};

export default Exercise;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: vs(76),
    borderRadius: s(16),
    backgroundColor: AppColors.grayBgColor,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: s(16),
    marginTop: vs(16),
  },
  leftDetail: {
    width: "60%",
  },

  title: {
    fontSize: s(14),
    fontFamily: "Roboto-Regular",
    color: AppColors.whiteColor,
  },
  subTitle: {
    fontSize: s(12),
    color: AppColors.lightGray,
    fontFamily: "Roboto-Regular",
  },
});
