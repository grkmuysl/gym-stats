import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";
import { calculateBMI } from "../../utils/BMICalculater";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BMI_TYPES } from "../../data/BMITypes";

const WeightGraph = ({ weight, height }) => {
  const { bmi, category } = calculateBMI(weight, height);

  // Modern gradient renk paleti ve ikonlar
  let primaryColor, secondaryColor, bgGradient, iconName;
  if (category == BMI_TYPES.UNDERWEIGHT) {
    primaryColor = "#3b82f6";
    secondaryColor = "#1d4ed8";
    bgGradient = ["#3b82f6", "#1d4ed8"];
    iconName = "trending-down";
  } else if (category == BMI_TYPES.NORMAL_WEIGHT) {
    primaryColor = "#10b981";
    secondaryColor = "#059669";
    bgGradient = ["#10b981", "#059669"];
    iconName = "check-circle";
  } else if (category == BMI_TYPES.OVERWEIGHT) {
    primaryColor = "#f59e0b";
    secondaryColor = "#d97706";
    bgGradient = ["#f59e0b", "#d97706"];
    iconName = "trending-up";
  } else if (category == BMI_TYPES.OBESE_1) {
    primaryColor = "#ef4444";
    secondaryColor = "#dc2626";
    bgGradient = ["#ef4444", "#dc2626"];
    iconName = "warning";
  } else if (category == BMI_TYPES.OBESE_2) {
    primaryColor = "#dc2626";
    secondaryColor = "#b91c1c";
    bgGradient = ["#dc2626", "#b91c1c"];
    iconName = "error";
  } else {
    primaryColor = "#8b5cf6";
    secondaryColor = "#7c3aed";
    bgGradient = ["#8b5cf6", "#7c3aed"];
    iconName = "help";
  }

  // BMI değerine göre progress yüzdesi (18.5-25 arası normal kabul ediliyor)
  const bmiPercentage = Math.min((bmi / 40) * 100, 100); // 40'a kadar olan BMI değerleri için

  return (
    <View style={styles.container}>
      {/* Header Card */}
      <View
        style={[
          styles.headerCard,
          {
            backgroundColor: primaryColor,
            shadowColor: primaryColor,
          },
        ]}
      >
        <MaterialIcons name="monitor-weight" size={20} color="white" />
        <Text style={styles.headerText}>Weight Status</Text>
      </View>

      {/* Main Weight Card */}
      <View
        style={[
          styles.weightCard,
          {
            borderLeftColor: primaryColor,
            shadowColor: primaryColor,
          },
        ]}
      >
        {/* Left Section - BMI Progress */}
        <View style={styles.leftSection}>
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressTrack,
                { backgroundColor: `${primaryColor}20` },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: primaryColor,
                    height: `${bmiPercentage}%`,
                  },
                ]}
              />
            </View>
            <Text style={[styles.bmiText, { color: primaryColor }]}>BMI</Text>
            <Text style={[styles.bmiValue, { color: primaryColor }]}>
              {bmi.toFixed(1)}
            </Text>
          </View>
        </View>

        {/* Center Section - Weight Display */}
        <View style={styles.centerSection}>
          <View
            style={[
              styles.weightCircle,
              {
                borderColor: `${primaryColor}30`,
                backgroundColor: `${primaryColor}08`,
              },
            ]}
          >
            <Text style={[styles.weightNumber, { color: primaryColor }]}>
              {weight}
            </Text>
            <Text style={[styles.kgText, { color: primaryColor }]}>kg</Text>
          </View>
        </View>

        {/* Right Section - Category Status */}
        <View style={styles.rightSection}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: `${primaryColor}15` },
            ]}
          >
            <MaterialIcons name={iconName} size={16} color={primaryColor} />
            <Text style={[styles.categoryText, { color: primaryColor }]}>
              {category}
            </Text>
          </View>

          {/* Health Indicator */}
          <View style={styles.healthIndicator}>
            <Text style={styles.healthLabel}>Health Status</Text>
            <View style={styles.indicatorRow}>
              <View
                style={[styles.healthDot, { backgroundColor: primaryColor }]}
              />
              <Text style={[styles.healthStatus, { color: primaryColor }]}>
                {category === BMI_TYPES.NORMAL_WEIGHT
                  ? "Healthy"
                  : category === BMI_TYPES.UNDERWEIGHT
                  ? "Low"
                  : category === BMI_TYPES.OVERWEIGHT
                  ? "Moderate"
                  : "High"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WeightGraph;

const styles = StyleSheet.create({
  container: {
    marginTop: vs(12),
    alignItems: "center",
  },

  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: s(16),
    paddingVertical: s(8),
    borderRadius: s(20),
    marginBottom: vs(12),
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  headerText: {
    color: "white",
    fontSize: s(14),
    fontFamily: "Roboto-SemiBold",
    marginLeft: s(8),
    fontWeight: "600",
  },

  weightCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: s(20),
    padding: s(20),
    borderLeftWidth: s(6),
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    width: s(320),
    minHeight: vs(130),
  },

  leftSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  progressContainer: {
    alignItems: "center",
  },

  progressTrack: {
    width: s(8),
    height: vs(70),
    borderRadius: s(4),
    overflow: "hidden",
    justifyContent: "flex-end",
  },

  progressFill: {
    width: "100%",
    borderRadius: s(4),
    minHeight: s(4),
  },

  bmiText: {
    fontSize: s(10),
    fontFamily: "Roboto-Regular",
    marginTop: s(6),
    opacity: 0.8,
  },

  bmiValue: {
    fontSize: s(12),
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
    marginTop: s(2),
  },

  centerSection: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  weightCircle: {
    width: s(80),
    height: s(80),
    borderRadius: s(40),
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  weightNumber: {
    fontSize: s(28),
    fontFamily: "Roboto-Bold",
    fontWeight: "800",
    lineHeight: s(32),
  },

  kgText: {
    fontSize: s(14),
    fontFamily: "Roboto-SemiBold",
    fontWeight: "600",
    opacity: 0.8,
  },

  rightSection: {
    flex: 1.5,
    justifyContent: "space-between",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: s(10),
    paddingVertical: s(8),
    borderRadius: s(12),
    width: s(110),
  },

  categoryText: {
    fontSize: s(11),
    fontFamily: "Roboto-SemiBold",
    fontWeight: "600",
    marginLeft: s(6),
    textAlign: "center",
    lineHeight: s(14),
  },

  healthIndicator: {
    marginTop: vs(12),
  },

  healthLabel: {
    fontSize: s(10),
    color: "#9CA3AF",
    fontFamily: "Roboto-Regular",
    marginBottom: s(6),
    textAlign: "center",
  },

  indicatorRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  healthDot: {
    width: s(8),
    height: s(8),
    borderRadius: s(4),
    marginRight: s(6),
  },

  healthStatus: {
    fontSize: s(12),
    fontFamily: "Roboto-SemiBold",
    fontWeight: "600",
  },
});
