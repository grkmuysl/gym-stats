import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppColors } from "../styles/colors";
import { s, vs } from "react-native-size-matters";
import { useFavorites } from "../context/FavouritesContext";
import { FlatList } from "react-native-gesture-handler";
import Exercise from "../components/Exercise/Exercise";
import EmptyFavoritesScreen from "./EmptyFavoritesScreen";

import { SafeAreaView } from "react-native-safe-area-context";

const FavouriteScreen = () => {
  const { favorites } = useFavorites();
  const isFavoritesEmpty = favorites.length === 0;
  return (
    <SafeAreaView style={styles.container}>
      {isFavoritesEmpty ? (
        <EmptyFavoritesScreen />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.favoritesContainer}>
            <Text
              style={{
                color: "white",
                fontSize: 26,
                fontWeight: "700",
                letterSpacing: 0.5,
              }}
            >
              ⭐ Favori Egzersizler
            </Text>
            <View
              style={{
                height: 2,
                backgroundColor: AppColors.limeGreenColor,
                width: 60,
                marginTop: 8,
                borderRadius: 1,
              }}
            />
          </View>

          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Exercise ExerciseItem={item} />}
            contentContainerStyle={{
              paddingHorizontal: s(12),
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.blackBgColor,
    flex: 1,
    paddingVertical: vs(8),
  },
  title: {
    fontFamily: "Roboto-SemiBold",
    fontSize: s(20),
    color: AppColors.whiteColor,
    marginLeft: s(12),
    marginTop: s(12),
  },
  favoritesContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: s(12),
    paddingVertical: s(12),
    borderRadius: s(16),
    marginBottom: s(8),
    borderLeftWidth: s(4),
    borderLeftColor: AppColors.limeGreenColor,
  },
});
