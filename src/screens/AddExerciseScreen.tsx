import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { AppColors } from "../styles/colors";
import GoBackButton from "../components/Button/GoBackButton";
import Dropdown from "../components/AddExerciseScreen/Dropdown";
import { s, vs } from "react-native-size-matters";
import {
  exerciseTypes,
  getExercisesByType,
  formatExercisesForDropdown,
} from "../data/AllExercises";
import AppButton from "../components/Button/AppButton";
import CustomInput from "../components/CustomInput/CustomInput";
import { useRoute } from "@react-navigation/native";
import {
  ExerciseRecordsItem,
  useRecords,
} from "../context/ExerciseRecordsContext";
import { SafeAreaView } from "react-native-safe-area-context";

const AddExerciseScreen = () => {
  const [selectedExerciseType, setSelectedExerciseType] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedExerciseName, setSelectedExerciseName] = useState(null);
  const [selectedExerciseInputType, setSelectedExerciseInputType] =
    useState(null);
  const [selectedReps, setSelectedReps] = useState<number | null>(null);
  const [selectedSets, setSelectedSets] = useState<number | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<number | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [availableExercises, setAvailableExercises] = useState([]);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [exerciseDropdownOpen, setExerciseDropdownOpen] = useState(false);

  const route = useRoute();

  const { date } = route.params || {};

  const { addRecord } = useRecords();

  useEffect(() => {
    if (selectedExerciseType) {
      const exercises = getExercisesByType(selectedExerciseType);
      const formattedExercises = formatExercisesForDropdown(exercises);
      setAvailableExercises(formattedExercises);

      setSelectedExercise(null);
      setSelectedExerciseName(null);
      setExerciseDropdownOpen(false);
    } else {
      setAvailableExercises([]);
      setSelectedExercise(null);
      setSelectedExerciseName(null);
    }
  }, [selectedExerciseType]);

  const closeAllDropdowns = () => {
    setTypeDropdownOpen(false);
    setExerciseDropdownOpen(false);
  };

  const handleTypeDropdownOpen = (open: any) => {
    if (open) {
      closeAllDropdowns();
    }
    setTypeDropdownOpen(open);
  };

  const handleExerciseDropdownOpen = (open: any) => {
    if (open) {
      closeAllDropdowns();
    }
    setExerciseDropdownOpen(open);
  };

  const handleExerciseTypeChange = (value: any) => {
    setSelectedExerciseType(value);
    setSelectedExercise(null);
    setSelectedExerciseName(null);
  };

  const handleExerciseChange = (value: any) => {
    setSelectedExercise(value);

    const selectedExerciseDetails = availableExercises.find(
      (exercise) => exercise.value === value
    );

    if (selectedExerciseDetails) {
      setSelectedExerciseName(selectedExerciseDetails.label);
      setSelectedExerciseInputType(selectedExerciseDetails.inputType);
    }
  };

  const getExerciseDetails = () => {
    if (selectedExercise && availableExercises.length > 0) {
      return availableExercises.find((ex) => ex.value === selectedExercise);
    }
    return null;
  };

  const resetInputs = () => {
    setSelectedExercise(null);
    setSelectedExerciseType(null);
    setSelectedExerciseName(null);
    setSelectedReps(null);
    setSelectedSets(null);
    setSelectedWeight(null);
    setSelectedDuration(null);
  };

  const addExercise = () => {
    const newRecord: ExerciseRecordsItem = {
      id: Date.now().toString(),
      exerciseName: selectedExerciseName,
      setsCount: selectedSets,
      repsCount: selectedReps,
      weight: selectedWeight || 0,
      duration: selectedDuration || 0,
      date: date || new Date().toISOString(),
    };

    addRecord(newRecord);
    resetInputs();
  };

  return (
    <SafeAreaView style={styles.container}>
      <GoBackButton style={styles.goBackBtn} />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Egzersiz Ekle</Text>

        <View style={styles.formContainer}>
          <View style={styles.dropdownWrapper}>
            <Text style={styles.label}>Egzersiz Türü</Text>

            <Dropdown
              itemsProp={exerciseTypes}
              placeholder="Egzersiz türünü seçin"
              onValueChange={handleExerciseTypeChange}
              selectedValue={selectedExerciseType}
              open={typeDropdownOpen}
              setOpen={handleTypeDropdownOpen}
            />
          </View>

          {selectedExerciseType && (
            <View
              style={[
                styles.dropdownWrapper,
                { zIndex: exerciseDropdownOpen ? 4000 : 2000 },
              ]}
            >
              <Text style={styles.label}>Egzersiz</Text>
              <Dropdown
                itemsProp={availableExercises}
                placeholder="Egzersiz seçin"
                onValueChange={handleExerciseChange}
                selectedValue={selectedExercise}
                zIndex={2000}
                open={exerciseDropdownOpen}
                setOpen={handleExerciseDropdownOpen}
              />
            </View>
          )}
          {selectedExercise && (
            <View style={styles.doubleDropdownContainer}>
              <View style={styles.innerDropdown}>
                <Text style={styles.label}>Set Sayısı</Text>
                <CustomInput
                  type="number"
                  value={selectedSets}
                  onValueChange={(value) => setSelectedSets(value)}
                />
              </View>

              {selectedExerciseInputType !== "duration" && (
                <View style={styles.innerDropdown}>
                  <Text style={styles.label}>Tekrar Sayısı</Text>
                  <CustomInput
                    type="number"
                    value={selectedReps}
                    onValueChange={(value) => setSelectedReps(value)}
                  />
                </View>
              )}

              {selectedExerciseInputType !== "reps" && (
                <View style={styles.innerDropdown}>
                  {selectedExerciseInputType === "weight" ? (
                    <Text style={styles.label}>Ağırlık</Text>
                  ) : (
                    <Text style={styles.label}>Süre</Text>
                  )}
                  {selectedExerciseInputType === "weight" ? (
                    <CustomInput
                      type="number"
                      value={selectedWeight}
                      onValueChange={(value) => setSelectedWeight(value)}
                    />
                  ) : (
                    <CustomInput
                      type="number"
                      value={selectedDuration}
                      onValueChange={(value) => setSelectedDuration(value)}
                    />
                  )}
                </View>
              )}
            </View>
          )}

          {selectedExercise && getExerciseDetails() && (
            <View style={styles.exerciseDetails}>
              <Text style={styles.exerciseTitle}>
                {getExerciseDetails()?.label}
              </Text>
              <Text style={styles.exerciseSubtitle}>
                {getExerciseDetails()?.subtitle}
              </Text>
              <Text style={styles.exerciseDifficulty}>
                Zorluk: {getExerciseDetails()?.difficulty}
              </Text>
            </View>
          )}
          {selectedExercise && (
            <View style={styles.btnContainer}>
              <AppButton
                onPress={() => {
                  addExercise();
                }}
                title="Egzersizi Ekle"
                style={styles.addBtn}
                textStyle={styles.adBtnText}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddExerciseScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.blackBgColor,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingTop: vs(32),
    paddingHorizontal: s(12),
    paddingBottom: vs(50),
  },
  goBackBtn: {
    position: "absolute",
    left: s(24),
    top: vs(68),
    zIndex: 6000,
  },
  title: {
    fontSize: s(24),
    fontWeight: "bold",
    color: AppColors.whiteColor,
    textAlign: "center",
    marginBottom: vs(20),
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: vs(20),
  },
  dropdownWrapper: {
    marginBottom: vs(20),
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: vs(8),
    width: s(120),
    color: AppColors.whiteColor,
  },
  selectedContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: s(15),
    borderRadius: s(8),
    marginBottom: vs(10),
    zIndex: 1,
  },
  selectedValue: {
    fontSize: s(14),
    color: AppColors.limeGreenColor,
    marginBottom: vs(3),
  },
  selectedLabel: {
    fontSize: s(16),
    fontWeight: "bold",
    color: AppColors.whiteColor,
    marginBottom: vs(5),
  },
  exerciseDetails: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: s(20),
    borderRadius: s(12),
    marginTop: vs(20),
    borderWidth: 1,
    borderColor: AppColors.limeGreenColor,
    zIndex: 1,
  },
  exerciseTitle: {
    fontSize: s(18),
    fontWeight: "bold",
    color: AppColors.whiteColor,
    marginBottom: vs(8),
  },
  exerciseSubtitle: {
    fontSize: s(14),
    color: AppColors.lightGray,
    marginBottom: vs(8),
    lineHeight: s(20),
  },
  exerciseDifficulty: {
    fontSize: s(14),
    fontWeight: "600",
    color: AppColors.limeGreenColor,
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: vs(12),
  },
  addBtn: {
    width: s(140),
    height: vs(46),
  },
  adBtnText: {
    fontWeight: "400",
    fontFamily: "Roboto-Medium",
    fontSize: s(14),
    textAlign: "center",
  },
  doubleDropdownContainer: {
    flexDirection: "row",
    gap: s(12),
  },

  innerDropdown: {
    flex: 1,
  },
});
