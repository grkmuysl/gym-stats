import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import AppButton from "../Button/AppButton";
import Entypo from "@expo/vector-icons/Entypo";
import { allExercises } from "../../data/AllExercises";

interface GymCalendarProps {
  records: any[];
  removeRecord: (id: string) => void;
  exercisesList: any[];
}

const { width, height } = Dimensions.get("window");

const GymCalendar = ({
  records,
  removeRecord,
  exercisesList,
}: GymCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [isWorkoutModalVisible, setWorkoutModalVisible] = useState(false);
  const [isNoWorkoutModalVisible, setNoWorkoutModalVisible] = useState(false);
  const [workoutData, setWorkoutData] = useState({});
  const [markedDates, setMarkedDates] = useState({});
  const [calendarHeight, setCalendarHeight] = useState(vs(350));

  const navigation = useNavigation();

  useEffect(() => {
    const calculateCalendarHeight = () => {
      const baseHeight = height * 0.45;
      const minHeight = vs(320);
      const maxHeight = vs(420);

      let responsiveHeight;
      if (width < 350) {
        responsiveHeight = baseHeight * 0.85;
      } else if (width > 400) {
        responsiveHeight = baseHeight * 1.1;
      } else {
        responsiveHeight = baseHeight;
      }

      const finalHeight = Math.max(
        minHeight,
        Math.min(maxHeight, responsiveHeight)
      );
      setCalendarHeight(finalHeight);
    };

    calculateCalendarHeight();

    const subscription = Dimensions.addEventListener(
      "change",
      calculateCalendarHeight
    );

    return () => subscription?.remove();
  }, []);

  const addBtnHandle = () => {
    setWorkoutModalVisible(false);
    navigation.navigate("AddExerciseScreen");
  };

  useEffect(() => {
    setWorkoutData(records);
  }, [records]);

  useEffect(() => {
    if (isWorkoutModalVisible && selectedDate && !workoutData[selectedDate]) {
      setWorkoutModalVisible(false);
      setTimeout(() => {
        setNoWorkoutModalVisible(true);
      }, 300);
    }
  }, [workoutData, isWorkoutModalVisible, selectedDate]);

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

  const handleDeleteRecord = async (itemId) => {
    await removeRecord(itemId);

    setWorkoutData((prevData) => {
      const updatedData = { ...prevData };

      if (updatedData[selectedDate]) {
        updatedData[selectedDate] = updatedData[selectedDate].filter(
          (workout) => workout.id !== itemId
        );

        if (updatedData[selectedDate].length === 0) {
          delete updatedData[selectedDate];
        }
      }

      return updatedData;
    });
  };

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

  const navigateExerciseDetail = ({ item }) => {
    const exerciseName = item.exercise || item.exerciseName || item.name;

    const matchedExercise = allExercises?.find(
      (exercise) => exercise.name.toLowerCase() === exerciseName?.toLowerCase()
    );

    if (matchedExercise) {
      setWorkoutModalVisible(false);
      navigation.navigate("DetailScreen" as never, matchedExercise as never);
    } else {
      setWorkoutModalVisible(false);
      const defaultExerciseData = {
        name: exerciseName || "Bilinmeyen Egzersiz",
        subtitle: "Egzersiz detayları",
        type: "Genel",
        difficulty: "Orta",
        animationSource: "default",
        inputType: "weight",
        id: item.id || Date.now().toString(),
      };

      navigation.navigate(
        "DetailScreen" as never,
        defaultExerciseData as never
      );
    }
  };

  const renderWorkoutItem = ({ item }) => (
    <TouchableOpacity
      style={styles.workoutItem}
      onPress={() => navigateExerciseDetail({ item })}
    >
      <Text style={styles.exerciseName}>{item.exercise}</Text>
      <Text style={styles.workoutDetails}>
        {item.sets} set × {item.reps} tekrar - {item.weight}
      </Text>

      <AppButton
        onPress={() => handleDeleteRecord(item.id)}
        title={<Entypo name="trash" size={24} color={AppColors.grayBgColor} />}
        style={styles.deleteBtn}
      />
    </TouchableOpacity>
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
      <View style={[styles.calendarContainer, { height: calendarHeight }]}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={markedDates}
          markingType={"custom"}
          monthFormat={"MMMM yyyy"}
          locale="tr"
          hideExtraDays={false}
          showSixWeeks={true}
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
            textDayFontFamily: "Roboto-Regular",
            textMonthFontFamily: "Roboto-Bold",
            textDayHeaderFontFamily: "Roboto-Medium",
            textDayFontWeight: "300",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "300",
            textDayFontSize: width < 350 ? 12 : 14,
            textMonthFontSize: width < 350 ? 14 : 16,
            textDayHeaderFontSize: width < 350 ? 10 : 12,
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
    width: s(296),
    backgroundColor: AppColors.grayBgColor,
    overflow: "hidden",
    borderRadius: s(8),
    // Height artık dinamik olarak set ediliyor
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
  deleteBtn: {
    height: vs(36),
    width: vs(36),
    position: "absolute",
    right: s(16),
    top: s(16),
  },
});

export default GymCalendar;
