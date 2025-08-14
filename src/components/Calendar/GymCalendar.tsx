import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import AppButton from "../Button/AppButton";

const GymCalendar = ({ records }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [isWorkoutModalVisible, setWorkoutModalVisible] = useState(false);
  const [isNoWorkoutModalVisible, setNoWorkoutModalVisible] = useState(false);
  const [workoutData, setWorkoutData] = useState({});
  const [markedDates, setMarkedDates] = useState({});

  const navigation = useNavigation();

  const addBtnHandle = () => {
    setWorkoutModalVisible(false);
    navigation.navigate("AddExerciseScreen");
  };

  useEffect(() => {
    setWorkoutData(records);
  }, [records]);

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

  const isDateInFuture = (dateString) => {
    const selectedDate = new Date(dateString);
    const today = new Date();

    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return selectedDate > today;
  };

  const onDayPress = (day) => {
    const dateString = day.dateString;
    setSelectedDate(dateString);

    if (isDateInFuture(dateString)) {
      return;
    }

    if (workoutData[dateString]) {
      setWorkoutModalVisible(true);
    } else {
      setNoWorkoutModalVisible(true);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    return date.toLocaleDateString("tr-TR", options);
  };

  const renderWorkoutItem = ({ item }) => (
    <View style={styles.workoutItem}>
      <Text style={styles.exerciseName}>{item.exercise}</Text>
      <Text style={styles.workoutDetails}>
        {item.sets} set × {item.reps} tekrar - {item.weight}
      </Text>
    </View>
  );

  const WorkoutModal = () => (
    <Modal
      isVisible={isWorkoutModalVisible}
      onBackdropPress={() => setWorkoutModalVisible(false)}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{formatDate(selectedDate)}</Text>
        <Text style={styles.modalSubtitle}>Yapılan Egzersizler</Text>

        {workoutData[selectedDate] && (
          <FlatList
            data={workoutData[selectedDate]}
            renderItem={renderWorkoutItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.workoutList}
            showsVerticalScrollIndicator={false}
          />
        )}

        <View style={styles.btnContainer}>
          <AppButton
            onPress={addBtnHandle}
            title="Egzersiz Ekle"
            style={styles.addBtn}
            textStyle={styles.addBtnText}
          />
        </View>

        <TouchableOpacity
          style={styles.closeButtonContainer}
          onPress={() => setWorkoutModalVisible(false)}
        >
          <Text style={styles.closeButton}>Kapat</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  const NoWorkoutModal = () => (
    <Modal
      isVisible={isNoWorkoutModalVisible}
      onBackdropPress={() => setNoWorkoutModalVisible(false)}
      style={styles.modal}
    >
      <View style={styles.noWorkoutModalContent}>
        <Text style={styles.noWorkoutIcon}>💪</Text>
        <Text style={styles.modalTitle}>{formatDate(selectedDate)}</Text>
        <Text style={styles.noWorkoutMessage}>
          Bu tarihte henüz egzersiz kaydı bulunmuyor.
        </Text>

        <View style={styles.noWorkoutButtonContainer}>
          <TouchableOpacity
            style={styles.addWorkoutButton}
            onPress={() => {
              setNoWorkoutModalVisible(false);
              navigation.navigate("AddExerciseScreen", { date: selectedDate });
            }}
          >
            <Text style={styles.addWorkoutButtonText}>Egzersiz Ekle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setNoWorkoutModalVisible(false)}
          >
            <Text style={styles.cancelButtonText}>İptal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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

      <WorkoutModal />
      <NoWorkoutModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: s(12),
  },
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
  noWorkoutModalContent: {
    backgroundColor: AppColors.whiteColor,
    padding: s(24),
    borderRadius: s(12),
    width: "85%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: s(16),
    fontFamily: "Roboto-SemiBold",
    marginBottom: vs(8),
    textAlign: "center",
    color: "#333",
  },
  modalSubtitle: {
    fontSize: s(14),
    fontFamily: "Roboto-Medium",
    marginBottom: vs(12),
    textAlign: "center",
    color: AppColors.limeGreenColor,
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
  closeButtonContainer: {
    marginTop: vs(16),
    backgroundColor: AppColors.grayBgColor,
    paddingVertical: vs(10),
    borderRadius: s(8),
  },
  closeButton: {
    textAlign: "center",
    color: AppColors.whiteColor,
    fontSize: s(14),
    fontWeight: "bold",
  },
  // No Workout Modal Styles
  noWorkoutIcon: {
    fontSize: s(48),
    marginBottom: vs(12),
  },
  noWorkoutMessage: {
    fontSize: s(14),
    textAlign: "center",
    color: "#666",
    marginBottom: vs(8),
    fontFamily: "Roboto-Regular",
  },
  noWorkoutButtonContainer: {
    width: "100%",
    gap: vs(10),
  },
  addWorkoutButton: {
    backgroundColor: AppColors.limeGreenColor,
    paddingVertical: vs(12),
    paddingHorizontal: s(24),
    borderRadius: s(8),
    alignItems: "center",
  },
  addWorkoutButtonText: {
    color: AppColors.blackBgColor,
    fontSize: s(14),
    fontWeight: "bold",
    fontFamily: "Roboto-SemiBold",
  },
  cancelButton: {
    backgroundColor: AppColors.grayBgColor,
    paddingVertical: vs(12),
    paddingHorizontal: s(24),
    borderRadius: s(8),
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cancelButtonText: {
    color: AppColors.whiteColor,
    fontSize: s(14),
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
  },
  btnContainer: {
    alignItems: "center",

    marginTop: vs(12),
  },
  addBtn: {
    borderRadius: s(8),
    width: "100%",
    height: vs(36),
  },
  addBtnText: {
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    fontSize: s(14),
    textAlign: "center",
  },
});

export default GymCalendar;
