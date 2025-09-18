import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useMemo, useCallback, useRef, useEffect } from "react";
import { AppColors } from "../styles/colors";
import { s, vs } from "react-native-size-matters";
import { useFavorites } from "../context/FavouritesContext";
import { FlatList } from "react-native-gesture-handler";
import Exercise from "../components/Exercise/Exercise";
import EmptyFavoritesScreen from "./EmptyFavoritesScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const FavouriteScreen = () => {
  const { favorites } = useFavorites();
  const fadeAnim = useRef(
    new Animated.Value(favorites.length === 0 ? 1 : 0)
  ).current;

  const isFavoritesEmpty = useMemo(
    () => favorites.length === 0,
    [favorites.length]
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isFavoritesEmpty ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFavoritesEmpty, fadeAnim]);

  const renderItem = useCallback(
    ({ item }) => <Exercise ExerciseItem={item} />,
    []
  );

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.emptyFavoriteContainer,
          {
            opacity: fadeAnim,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: isFavoritesEmpty ? 1 : -1,
          },
        ]}
      >
        <SafeAreaView style={styles.emptyFavoriteContainer}>
          <EmptyFavoritesScreen />
        </SafeAreaView>
      </Animated.View>

      {/* Favorites List */}
      <Animated.View
        style={[
          styles.flatListContainer,
          {
            opacity: Animated.subtract(1, fadeAnim), // 1 - fadeAnim = ters opacity
            paddingTop: vs(40),
          },
        ]}
      >
        <View style={styles.favoritesContainer}>
          <Text style={styles.titleText}>⭐ Favori Egzersizler</Text>
          <View style={styles.underline} />
        </View>

        <FlatList
          data={favorites}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={10}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={50}
        />
      </Animated.View>
    </View>
  );
};

export default React.memo(FavouriteScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.blackBgColor,
    flex: 1,
    paddingBottom: vs(8),
  },
  emptyFavoriteContainer: {
    backgroundColor: AppColors.blackBgColor,
    flex: 1,
  },
  flatListContainer: {
    flex: 1,
  },
  titleText: {
    color: "white",
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  underline: {
    height: 2,
    backgroundColor: AppColors.limeGreenColor,
    width: 60,
    marginTop: 8,
    borderRadius: 1,
  },
  flatListContent: {
    paddingHorizontal: s(12),
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
