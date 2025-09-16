import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  calculateAdvancedBodyScore,
  calculateBMI,
  getBodyScoreDescription,
  getBodyScoreEmoji,
} from "../../utils/BMICalculater";
import { useProfile } from "../../context/ProfileContext";

const BodyScoreGraph = () => {
  const { profileInformation } = useProfile();

  const height = profileInformation.height || "";
  const weight = profileInformation.weight || "";
  const age = profileInformation.age || "";
  const gender = profileInformation.gender || "";

  const { bmi } = calculateBMI(weight, height);
  const score = calculateAdvancedBodyScore(bmi, age, gender);
  const body_score_description = getBodyScoreDescription(score);

  let primaryColor, secondaryColor, bgGradient, iconName;
  if (body_score_description === "Mükemmel") {
    primaryColor = "#8B5CF6";
    secondaryColor = "#7C3AED";
    bgGradient = ["#8B5CF6", "#7C3AED"];
    iconName = "star";
  } else if (body_score_description === "Çok İyi") {
    primaryColor = "#10B981";
    secondaryColor = "#059669";
    bgGradient = ["#10B981", "#059669"];
    iconName = "trending-up";
  } else if (body_score_description === "İyi") {
    primaryColor = "#3B82F6";
    secondaryColor = "#2563EB";
    bgGradient = ["#3B82F6", "#2563EB"];
    iconName = "thumb-up";
  } else if (body_score_description === "Normal") {
    primaryColor = "#6B7280";
    secondaryColor = "#4B5563";
    bgGradient = ["#6B7280", "#4B5563"];
    iconName = "check-circle";
  } else if (body_score_description === "Kötü") {
    primaryColor = "#EF4444";
    secondaryColor = "#DC2626";
    bgGradient = ["#EF4444", "#DC2626"];
    iconName = "warning";
  } else {
    primaryColor = "#991B1B";
    secondaryColor = "#7F1D1D";
    bgGradient = ["#991B1B", "#7F1D1D"];
    iconName = "error";
  }

  const scorePercentage = Math.min((score / 100) * 100, 100);

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
        <MaterialIcons name={iconName} size={20} color="white" />
        <Text style={styles.headerText}>Vücut Puanı</Text>
      </View>

      {/* Main Score Card */}
      <View
        style={[
          styles.scoreCard,
          {
            borderLeftColor: primaryColor,
            shadowColor: primaryColor,
            borderColor: `${primaryColor}70`,
          },
        ]}
      >
        {/* Left Section - Progress Bar */}
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
                    height: `${scorePercentage}%`,
                  },
                ]}
              />
            </View>
            <Text style={[styles.percentageText, { color: primaryColor }]}>
              {Math.round(scorePercentage)}%
            </Text>
          </View>
        </View>

        {/* Center Section - Score */}
        <View style={styles.centerSection}>
          <View
            style={[
              styles.scoreCircle,
              {
                borderColor: `${primaryColor}90`,
                backgroundColor: `${primaryColor}08`,
              },
            ]}
          >
            <Text style={styles.emoji}>{getBodyScoreEmoji(score)}</Text>
            <Text style={[styles.mainScore, { color: primaryColor }]}>
              {score}
            </Text>
          </View>
        </View>

        {/* Right Section - Status */}
        <View style={styles.rightSection}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: `${primaryColor}15` },
            ]}
          >
            <View
              style={[styles.statusDot, { backgroundColor: primaryColor }]}
            />
            <Text style={[styles.statusText, { color: primaryColor }]}>
              {body_score_description}
            </Text>
          </View>

          {/* Mini Stats */}
          <View style={styles.miniStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>BMI</Text>
              <Text style={[styles.statValue, { color: primaryColor }]}>
                {bmi.toFixed(1)}
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Durum</Text>
              <View
                style={[
                  styles.statusIndicator,
                  { backgroundColor: primaryColor },
                ]}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BodyScoreGraph;

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
    marginTop: vs(12),
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

  scoreCard: {
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
    minHeight: vs(120),
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
    height: vs(80),
    borderRadius: s(4),
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: "#1A2421",
  },

  progressFill: {
    width: "100%",
    borderRadius: s(4),
    minHeight: s(4),
    // rengi dinamik (primaryColor) inline
  },

  percentageText: {
    fontSize: s(12),
    fontFamily: "Roboto-Bold",
    marginTop: s(8),
    fontWeight: "700",
    color: "#E8FDF3",
  },

  centerSection: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  scoreCircle: {
    width: s(80),
    height: s(80),
    borderRadius: s(40),
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0E1311",
    borderColor: "#1F2E29",
  },

  emoji: {
    fontSize: s(20),
    marginBottom: s(4),
    color: "#C5DCD3",
  },

  mainScore: {
    fontSize: s(24),
    fontFamily: "Roboto-Bold",
    fontWeight: "800",
    color: "#E5F9EF",
  },

  rightSection: {
    flex: 1.5,
    justifyContent: "space-between",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: s(12),
    paddingVertical: s(8),
    borderRadius: s(16),
    width: s(100),
    backgroundColor: "#18221F",
    justifyContent: "center",
  },

  statusDot: {
    width: s(8),
    height: s(8),
    borderRadius: s(4),
    marginRight: s(8),
    backgroundColor: "#1F3D32",
  },

  statusText: {
    fontSize: s(12),
    fontFamily: "Roboto-SemiBold",
    fontWeight: "600",
    color: "#D0E9DF",
  },

  miniStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: vs(12),
  },

  statItem: {
    alignItems: "center",
  },

  statLabel: {
    fontSize: s(10),
    color: "#5F6F68",
    fontFamily: "Roboto-Regular",
    marginBottom: s(4),
  },

  statValue: {
    fontSize: s(14),
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
    color: "#CFE7DE",
  },

  statDivider: {
    width: 1,
    height: s(20),
    backgroundColor: "#23312C",
  },

  statusIndicator: {
    width: s(12),
    height: s(12),
    borderRadius: s(6),
    backgroundColor: "#1F3D32",
  },
});
