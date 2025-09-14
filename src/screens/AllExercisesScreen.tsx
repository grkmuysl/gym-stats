import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";
import Exercise from "../components/Exercise/Exercise";
import { AppColors } from "../styles/colors";
import EvilIcons from "@expo/vector-icons/EvilIcons";

import { s, vs } from "react-native-size-matters";
import {
  allAbsExercises,
  allBackExercises,
  allBicepsExercises,
  allChestExercises,
  allLegExercises,
  allShoulderExercises,
  allTricepsExercises,
  allForearmsExercises,
  allCardioExercises,
} from "../data/AllExercises";

import { TextInput } from "react-native-gesture-handler";

import LottieView from "lottie-react-native";
import animations from "../data/Animations";

type ExerciseItem = {
  name: string;
  subtitle: string;
  type: string;
  id: string;
  difficulty: string;
};

type ExerciseCategory = {
  title: string;
  data: ExerciseItem[];
  animationSource: string;
  color: string;
};

const AllExercisesScreen = () => {
  const [searchString, setSearchString] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const animation = useRef<LottieView>(null);

  const EXERCISE_CATEGORIES: ExerciseCategory[] = [
    {
      title: "GÖĞÜS EGZERSİZLERİ",
      data: allChestExercises,
      animationSource: "chest",
      color: AppColors.chestColor,
    },
    {
      title: "SIRT EGZERSİZLERİ",
      data: allBackExercises,
      animationSource: "back",
      color: AppColors.backColor,
    },
    {
      title: "OMUZ EGZERSİZLERİ",
      data: allShoulderExercises,
      animationSource: "shoulder",
      color: AppColors.shoulderColor,
    },
    {
      title: "BACAK EGZERSİZLERİ",
      data: allLegExercises,
      animationSource: "leg",
      color: AppColors.legColor,
    },
    {
      title: "ÖN KOL EGZERSİZLERİ",
      data: allBicepsExercises,
      animationSource: "biceps",
      color: AppColors.bicepsColor,
    },
    {
      title: "ARKA KOL EGZERSİZLERİ",
      data: allTricepsExercises,
      animationSource: "triceps",
      color: AppColors.tricepsColor,
    },
    {
      title: "FOREARMS EGZERSİZLERİ",
      data: allForearmsExercises,
      animationSource: "forearms",
      color: AppColors.forearmsColor,
    },
    {
      title: "KARIN EGZERSİZLERİ",
      data: allAbsExercises,
      animationSource: "abs",
      color: AppColors.absColor,
    },

    {
      title: "KARDİO EGZERSİZLERİ",
      data: allCardioExercises,
      animationSource: "cardio",
      color: AppColors.cardioColor,
    },
  ];

  const filteredCategories = useMemo(() => {
    if (!searchString.trim()) {
      return EXERCISE_CATEGORIES;
    }

    const searchTerm = searchString.toLowerCase().trim();

    return EXERCISE_CATEGORIES.map((category) => ({
      ...category,
      data: category.data.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(searchTerm) ||
          exercise.subtitle.toLowerCase().includes(searchTerm) ||
          exercise.type.toLowerCase().includes(searchTerm) ||
          exercise.difficulty.toLowerCase().includes(searchTerm)
      ),
    })).filter((category) => category.data.length > 0);
  }, [searchString]);

  const renderCategory = ({
    item,
    index,
  }: {
    item: ExerciseCategory;
    index: number;
  }) => (
    <View style={styles.categoryContainer}>
      <View style={styles.categoryHeader}>
        <View
          style={[styles.iconContainer, { backgroundColor: item.color + "90" }]}
        >
          <View style={styles.animationContainer}>
            <LottieView
              autoPlay
              ref={animation}
              style={styles.animation}
              source={animations[item.animationSource]}
            />
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={[styles.underline, { backgroundColor: item.color }]} />
        </View>
      </View>

      <FlatList
        data={item.data}
        renderItem={({ item }) => <Exercise ExerciseItem={item} />}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchInputContainer,
            {
              borderColor: isFocused
                ? AppColors.limeGreenColor
                : AppColors.lightGray,
            },
          ]}
        >
          <EvilIcons
            name="search"
            size={24}
            color={AppColors.lightGray}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            value={searchString}
            onChangeText={setSearchString}
            placeholder="Egzersiz ara..."
            placeholderTextColor={AppColors.lightGray}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {searchString.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearchString("")}
            >
              <EvilIcons name="close" size={24} color={AppColors.lightGray} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {filteredCategories.length > 0 ? (
        <FlatList
          data={filteredCategories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.title}
          showsVerticalScrollIndicator={false}
          style={styles.listContainer}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <EvilIcons name="search" size={64} color={AppColors.lightGray} />
          <Text style={styles.noResultsTitle}>Sonuç Bulunamadı</Text>
          <Text style={styles.noResultsSubtitle}>
            "{searchString}" ile eşleşen egzersiz bulunamadı.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AllExercisesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.blackBgColor,
    flex: 1,
    paddingTop: vs(42),
  },

  searchContainer: {
    paddingHorizontal: s(20),
    marginBottom: vs(16),
  },

  searchInputContainer: {
    backgroundColor: AppColors.grayBgColor,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: s(16),
    paddingHorizontal: s(16),
    paddingVertical: vs(12),
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  searchIcon: {
    marginRight: s(8),
  },

  searchInput: {
    flex: 1,
    color: AppColors.whiteColor,
    fontSize: s(16),
    fontFamily: "Roboto-Regular",
    paddingVertical: 0,
  },

  clearButton: {
    marginLeft: s(8),
    padding: s(4),
  },

  searchResultInfo: {
    marginTop: vs(8),
    paddingHorizontal: s(4),
  },

  searchResultText: {
    color: AppColors.lightGray,
    fontSize: s(14),
    fontFamily: "Roboto-Light",
  },

  listContainer: {
    paddingHorizontal: s(12),
  },

  categoryContainer: {
    marginBottom: vs(24),
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: s(12),
    borderRadius: s(8),
  },

  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: vs(12),
  },

  title: {
    color: AppColors.whiteColor,
    fontSize: s(18),
    fontFamily: "Roboto-Medium",
    marginLeft: s(4),
  },

  exerciseCount: {
    color: AppColors.limeGreenColor,
    fontSize: s(14),
    fontFamily: "Roboto-Regular",
    marginLeft: s(8),
  },

  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: s(40),
  },

  noResultsTitle: {
    color: AppColors.whiteColor,
    fontSize: s(20),
    fontFamily: "Roboto-Medium",
    marginTop: vs(16),
    marginBottom: vs(8),
  },

  noResultsSubtitle: {
    color: AppColors.lightGray,
    fontSize: s(16),
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    marginBottom: vs(4),
  },

  noResultsHint: {
    color: AppColors.lightGray,
    fontSize: s(14),
    fontFamily: "Roboto-Light",
    textAlign: "center",
    opacity: 0.7,
  },
  iconContainer: {
    width: s(56),
    height: s(56),
    borderRadius: s(28),
    justifyContent: "center",
    alignItems: "center",
    marginRight: s(16),
  },
  titleContainer: {
    flex: 1,
  },
  underline: {
    height: vs(3),
    width: s(40),
    borderRadius: vs(2),
    marginBottom: vs(4),
  },
  animationContainer: {
    height: vs(68),
    width: s(68),
    backgroundColor: AppColors.grayBgColor,
    borderRadius: s(34),
  },
  animation: {
    width: "100%",
    height: "100%",
  },
});
