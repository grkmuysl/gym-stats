import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { s, vs } from "react-native-size-matters";
import { calculateBMI } from "../../utils/BMICalculater";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BMI_TYPES } from "../../data/BMITypes";

const WeightGraph = ({ weight, height }) => {
  const { bmi, category } = calculateBMI(weight, height);
  let primaryColor, secondaryColor, bgGradient, iconName;
  if (category === BMI_TYPES.UNDERWEIGHT) {
    primaryColor = "#0EA5E9";
    secondaryColor = "#0369A1";
    bgGradient = ["#0EA5E9", "#0369A1"];
    iconName = "trending-down";
  } else if (category === BMI_TYPES.NORMAL_WEIGHT) {
    primaryColor = "#10B981";
    secondaryColor = "#059669";
    bgGradient = ["#10B981", "#059669"];
    iconName = "check-circle";
  } else if (category === BMI_TYPES.OVERWEIGHT) {
    primaryColor = "#F59E0B";
    secondaryColor = "#D97706";
    bgGradient = ["#F59E0B", "#D97706"];
    iconName = "trending-up";
  } else if (category === BMI_TYPES.OBESE_1) {
    primaryColor = "#F97316";
    secondaryColor = "#EA580C";
    bgGradient = ["#F97316", "#EA580C"];
    iconName = "warning";
  } else if (category === BMI_TYPES.OBESE_2) {
    primaryColor = "#DC2626";
    secondaryColor = "#B91C1C";
    bgGradient = ["#DC2626", "#B91C1C"];
    iconName = "error";
  } else {
    // Unknown / fallback
    primaryColor = "#8B5CF6";
    secondaryColor = "#7C3AED";
    bgGradient = ["#8B5CF6", "#7C3AED"];
    iconName = "help";
  }

  const bmiPercentage = Math.min((bmi / 40) * 100, 100);

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
        <Text style={styles.headerText}>Kilo Durumu</Text>
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
                borderColor: `${primaryColor}60`,
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
            <Text style={styles.healthLabel}>Sağlık Durumu</Text>
            <View style={styles.indicatorRow}>
              <View
                style={[styles.healthDot, { backgroundColor: primaryColor }]}
              />
              <Text style={[styles.healthStatus, { color: primaryColor }]}>
                {category === BMI_TYPES.NORMAL_WEIGHT
                  ? "Sağlıklı"
                  : category === BMI_TYPES.UNDERWEIGHT
                  ? "Düşük"
                  : category === BMI_TYPES.OVERWEIGHT
                  ? "Orta"
                  : "Yüksek"}
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
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },

  headerText: {
    color: "#FFFFFF",
    fontSize: s(14),
    fontFamily: "Roboto-SemiBold",
    marginLeft: s(8),
    fontWeight: "600",
  },

  weightCard: {
    flexDirection: "row",
    backgroundColor: "#121715",
    borderRadius: s(20),
    padding: s(20),
    borderLeftWidth: s(6),
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    shadowColor: "#000000",
    elevation: 10,
    width: s(320),
    minHeight: vs(130),
    borderColor: "#1E2A26",
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
    backgroundColor: "#1A2421",
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
    color: "#6B7D75",
    opacity: 0.85,
  },

  bmiValue: {
    fontSize: s(12),
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
    marginTop: s(2),
    color: "#E8FDF3",
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
    backgroundColor: "#0E1311",
    borderColor: "#1F2E29",
  },

  weightNumber: {
    fontSize: s(28),
    fontFamily: "Roboto-Bold",
    fontWeight: "800",
    lineHeight: s(32),
    color: "#E5F9EF",
  },

  kgText: {
    fontSize: s(14),
    fontFamily: "Roboto-SemiBold",
    fontWeight: "600",
    opacity: 0.85,
    color: "#7D948C",
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
    backgroundColor: "#18221F",
  },

  categoryText: {
    fontSize: s(11),
    fontFamily: "Roboto-SemiBold",
    fontWeight: "600",
    marginLeft: s(6),
    textAlign: "center",
    lineHeight: s(14),
    color: "#C5DCD3",
  },

  healthIndicator: {
    marginTop: vs(12),
  },

  healthLabel: {
    fontSize: s(10),
    color: "#74867eff",
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
    backgroundColor: "#1F3D32",
  },

  healthStatus: {
    fontSize: s(12),
    fontFamily: "Roboto-SemiBold",
    fontWeight: "600",
    color: "#D0E9DF",
  },
});
