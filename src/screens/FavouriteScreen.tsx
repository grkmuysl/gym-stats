import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppColors } from "../styles/colors";
import Header from "../components/Header";
import { s } from "react-native-size-matters";
import { useFavorites } from "../context/FavouritesContext";
import { FlatList } from "react-native-gesture-handler";
import Exercise from "../components/Exercise";

const FavouriteScreen = () => {
  const { favorites } = useFavorites();
  const isFavoritesEmpty = favorites.length === 0;
  return (
    <View style={styles.container}>
      <Header />
      {isFavoritesEmpty ? (
        <Text style={{ color: "white" }}>empty</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Exercise ExerciseItem={item} />}
        />
      )}
    </View>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.blackBgColor,
    flex: 1,
  },
  title: {
    fontFamily: "Roboto-SemiBold",
    fontSize: s(20),
    color: AppColors.whiteColor,
    marginLeft: s(12),
    marginTop: s(12),
  },
});
