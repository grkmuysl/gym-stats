import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";

const GymCalendar = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [workoutData, setWorkoutData] = useState({});
  const [markedDates, setMarkedDates] = useState({});

  const sampleWorkouts = {
    "2025-08-15": [
      { exercise: "Bench Press", sets: 3, reps: 10, weight: "80kg" },
      { exercise: "Squat", sets: 3, reps: 12, weight: "100kg" },
    ],
    "2025-08-17": [
      { exercise: "Deadlift", sets: 3, reps: 8, weight: "120kg" },
      { exercise: "Pull-ups", sets: 3, reps: 15, weight: "Bodyweight" },
    ],
    "2025-08-20": [
      { exercise: "Overhead Press", sets: 3, reps: 10, weight: "60kg" },
    ],
  };

  useEffect(() => {
    setWorkoutData(sampleWorkouts);
  }, []);

  useEffect(() => {
    const marked = {};

    Object.keys(workoutData).forEach((date) => {
      marked[date] = {
        customStyles: {
          container: {
            backgroundColor: AppColors.limeGreenColor,
            borderRadius: 4,
            elevation: 2,
          },
          text: {
            color: AppColors.blackBgColor,
          },
        },
      };
    });

    setMarkedDates(marked);
  }, [workoutData]);

  const onDayPress = (day) => {
    const dateString = day.dateString;
    setSelectedDate(dateString);

    if (workoutData[dateString]) {
      setModalVisible(true);
    }
  };

  const renderWorkoutItem = ({ item }) => (
    <View style={styles.workoutItem}>
      <Text style={styles.exerciseName}>{item.exercise}</Text>
      <Text style={styles.workoutDetails}>
        {item.sets} set × {item.reps} tekrar - {item.weight}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={markedDates}
          markingType={"custom"}
          theme={{
            backgroundColor: AppColors.blackBgColor,
            calendarBackground: AppColors.grayBgColor,
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: AppColors.lightGray,
            selectedDayTextColor: "#ffffff",
            todayTextColor: AppColors.lightGray,
            dayTextColor: AppColors.limeGreenColor,
            textDisabledColor: "#d9e1e8",
            dotColor: "#00adf5",
            selectedDotColor: "#ffffff",
            arrowColor: AppColors.limeGreenColor,
            disabledArrowColor: "#d9e1e8",
            monthTextColor: AppColors.limeGreenColor,
            indicatorColor: "blue",
            textDayFontFamily: "monospace",
            textMonthFontFamily: "monospace",
            textDayHeaderFontFamily: "monospace",
            textDayFontWeight: "300",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "300",
            textDayFontSize: 14,
            textMonthFontSize: 14,
            textDayHeaderFontSize: 11,
          }}
        />
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{selectedDate} - Egzersizler</Text>

          {workoutData[selectedDate] && (
            <FlatList
              data={workoutData[selectedDate]}
              renderItem={renderWorkoutItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.workoutList}
            />
          )}

          <Text
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            Kapat
          </Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    height: vs(352),
    width: s(296),
    backgroundColor: AppColors.grayBgColor,
    overflow: "hidden",
    borderRadius: s(8),
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: AppColors.whiteColor,
    padding: s(20),
    borderRadius: s(10),
    width: "90%",
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: s(16),
    fontFamily: "Roboto-SemiBold",
    marginBottom: vs(14),
    textAlign: "center",
    color: "#333",
  },
  workoutList: {
    maxHeight: vs(300),
  },
  workoutItem: {
    backgroundColor: AppColors.grayBgColor,
    padding: s(12),
    marginVertical: s(5),
    borderRadius: s(8),
    borderLeftWidth: s(4),
    borderLeftColor: AppColors.limeGreenColor,
  },
  exerciseName: {
    fontSize: s(14),
    fontWeight: "bold",
    color: AppColors.whiteColor,
    marginBottom: s(5),
  },
  workoutDetails: {
    fontSize: s(12),
    color: AppColors.lightGray,
  },
  closeButton: {
    marginTop: vs(14),
    textAlign: "center",
    color: AppColors.blackBgColor,
    fontSize: s(14),
    fontWeight: "bold",
  },
});

export default GymCalendar;
