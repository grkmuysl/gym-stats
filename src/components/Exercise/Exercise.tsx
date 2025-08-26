import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import AppButton from "../Button/AppButton";
import { ExerciseItem, useFavorites } from "../../context/FavouritesContext";
import { useNavigation } from "@react-navigation/native";

interface ExerciseProps {
  ExerciseItem: ExerciseItem;
}

const Exercise: React.FC<ExerciseProps> = ({ ExerciseItem }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const navigation = useNavigation();

  const isFavorite = favorites.some((item) => item.id === ExerciseItem.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(ExerciseItem.id);
    } else {
      addFavorite(ExerciseItem);
    }
  };

  const goToDetailScreen = () => {
    navigation.navigate("DetailScreen" as never, ExerciseItem as never);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToDetailScreen}>
      <View style={styles.leftDetail}>
        <Text style={styles.title}>
          {ExerciseItem.name}{" "}
          <Text style={styles.difficulty}>({ExerciseItem.difficulty})</Text>
        </Text>
        <Text style={styles.subTitle}>{ExerciseItem.subtitle}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <AppButton
          title={isFavorite ? "💔 Sil" : "❤️ Ekle"}
          onPress={toggleFavorite}
          style={styles.favoriteBtn}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Exercise;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: vs(82),
    borderRadius: s(16),
    backgroundColor: AppColors.grayBgColor,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: s(12),
    marginTop: vs(8),
    marginBottom: vs(6),
  },
  leftDetail: {
    flex: 1,
    marginLeft: s(2),
    marginRight: s(2),
  },
  buttonContainer: {
    minWidth: s(100),
  },
  favoriteBtn: {
    width: s(92),
    height: vs(36),
  },
  difficulty: {
    fontSize: s(13),
    color: "#ddd",
    fontFamily: "Roboto-Regular",
  },
  title: {
    fontSize: s(14),
    fontFamily: "Roboto-Regular",
    color: AppColors.whiteColor,
    lineHeight: vs(18),
  },
  subTitle: {
    fontSize: s(12),
    color: AppColors.lightGray,
    fontFamily: "Roboto-Regular",
    marginTop: vs(2),
  },
});
