import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRecords } from "../../context/ExerciseRecordsContext";
import { LinearGradient } from "expo-linear-gradient";

const LastChanges = ({ exerciseName }) => {
  const { allRecords } = useRecords();
  const exerciseData =
    allRecords?.filter((record) => record.exerciseName === exerciseName) || [];

  const sortedData = exerciseData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const data_size = sortedData.length;

  let lastData = 0;
  let firstRecord = 0;
  let minValue = 0;
  let penultimate = 0;
  let isPositive = null;
  let hasChange = false;
  let isWeightBased = false;

  if (data_size > 0) {
    const getRecordValue = (record) => {
      if (record.weight && record.weight > 0) {
        isWeightBased = true;
        return record.weight;
      }
      return record.repsCount || 0;
    };

    const values = sortedData.map(getRecordValue);

    lastData = values[data_size - 1];
    minValue = Math.min(...values);
    firstRecord = values[0];

    if (data_size > 1) {
      penultimate = values[data_size - 2];
      const difference = lastData - penultimate;

      if (difference !== 0) {
        hasChange = true;
        isPositive = difference > 0;
      }
    }
  }

  const formatValue = (value) => {
    if (value === 0) return "0.0";

    const formattedNumber = value.toFixed(1);
    const unit = isWeightBased ? " kg" : " tekrar";

    return formattedNumber + unit;
  };

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "short",
    });
  };

  const lastRecordDate =
    data_size > 0 ? getFormattedDate(sortedData[data_size - 1].date) : "";
  const firstRecordDate =
    data_size > 0 ? getFormattedDate(sortedData[0].date) : "";

  const getCardColors = (type) => {
    if (type === "positive") return ["#1a4d3a", "#2d7a5f"];
    if (type === "negative") return ["#4d1a1a", "#7a2d2d"];
    return ["#2a2a2a", "#3a3a3a"];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>İlerleme Analizi</Text>
        <View style={styles.headerLine} />
      </View>

      <View style={styles.cardsContainer}>
        <LinearGradient
          colors={getCardColors(
            !hasChange ? "neutral" : isPositive ? "positive" : "negative"
          )}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardHeader}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: !hasChange
                    ? "rgba(255,255,255,0.1)"
                    : isPositive
                    ? "rgba(34, 197, 94, 0.2)"
                    : "rgba(239, 68, 68, 0.2)",
                },
              ]}
            >
              {hasChange ? (
                <AntDesign
                  name={isPositive ? "caretup" : "caretdown"}
                  size={16}
                  color={isPositive ? AppColors.greenColor : AppColors.redColor}
                />
              ) : (
                <AntDesign
                  name="minus"
                  size={16}
                  color={AppColors.whiteColor}
                />
              )}
            </View>
            <Text style={styles.cardTitle}>
              {data_size == 1 ? "İlk Kayıt" : "Son Değişiklik"}
            </Text>
          </View>

          <Text
            style={[
              styles.valueText,
              {
                color: !hasChange
                  ? AppColors.whiteColor
                  : isPositive
                  ? AppColors.greenColor
                  : AppColors.redColor,
              },
            ]}
          >
            {hasChange
              ? formatValue(lastData - penultimate)
              : data_size > 1
              ? formatValue(0)
              : formatValue(lastData)}
          </Text>

          <Text style={styles.dateText}>{lastRecordDate || "Kayıt yok"}</Text>
        </LinearGradient>

        <LinearGradient
          colors={getCardColors(
            data_size === 0
              ? "neutral"
              : lastData - firstRecord > 0
              ? "positive"
              : lastData - firstRecord < 0
              ? "negative"
              : "neutral"
          )}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardHeader}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor:
                    data_size === 0
                      ? "rgba(255,255,255,0.1)"
                      : lastData - firstRecord > 0
                      ? "rgba(34, 197, 94, 0.2)"
                      : lastData - firstRecord < 0
                      ? "rgba(239, 68, 68, 0.2)"
                      : "rgba(255,255,255,0.1)",
                },
              ]}
            >
              {data_size > 0 && lastData - firstRecord !== 0 ? (
                <AntDesign
                  name={lastData - firstRecord > 0 ? "caretup" : "caretdown"}
                  size={16}
                  color={
                    lastData - firstRecord > 0
                      ? AppColors.greenColor
                      : AppColors.redColor
                  }
                />
              ) : (
                <AntDesign
                  name="minus"
                  size={16}
                  color={AppColors.whiteColor}
                />
              )}
            </View>
            <Text style={styles.cardTitle}>
              {data_size == 1 ? "İlk Kayıt" : "Toplam İlerleme"}
            </Text>
          </View>

          <Text
            style={[
              styles.valueText,
              {
                color:
                  data_size === 0
                    ? AppColors.whiteColor
                    : lastData - firstRecord > 0
                    ? AppColors.greenColor
                    : lastData - firstRecord < 0
                    ? AppColors.redColor
                    : AppColors.whiteColor,
              },
            ]}
          >
            {data_size > 0
              ? data_size == 1
                ? formatValue(lastData)
                : formatValue(lastData - firstRecord)
              : formatValue(0)}
          </Text>

          <Text style={styles.dateText}>{firstRecordDate || "Kayıt yok"}</Text>
        </LinearGradient>
      </View>
    </View>
  );
};

export default LastChanges;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.grayBgColor,
    width: s(316),
    borderRadius: s(16),
    marginTop: vs(12),
    padding: s(16),
    marginBottom: vs(16),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  header: {
    marginBottom: vs(16),
    alignItems: "center",
  },

  headerTitle: {
    color: AppColors.whiteColor,
    fontFamily: "Roboto-Medium",
    fontSize: s(16),
    marginBottom: vs(8),
  },

  headerLine: {
    width: s(40),
    height: 2,
    backgroundColor: AppColors.limeGreenColor,
    borderRadius: 1,
  },

  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: s(12),
  },

  card: {
    flex: 1,
    borderRadius: s(12),
    padding: s(16),
    minHeight: vs(100),
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: vs(8),
  },

  iconContainer: {
    width: s(24),
    height: s(24),
    borderRadius: s(12),
    alignItems: "center",
    justifyContent: "center",
    marginRight: s(6),
  },

  cardTitle: {
    color: AppColors.whiteColor,
    fontFamily: "Roboto-Regular",
    fontSize: s(11),
    opacity: 0.9,
  },

  valueText: {
    fontFamily: "Roboto-Bold",
    fontSize: s(22),
    textAlign: "center",
    marginVertical: vs(4),
  },

  dateText: {
    fontFamily: "Roboto-Light",
    fontSize: s(11),
    color: AppColors.lightGray,
    textAlign: "center",
    opacity: 0.8,
  },
});
