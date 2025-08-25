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

const BodyScoreGraph = ({ weight, height }) => {
  const { bmi } = calculateBMI(weight, height);
  const score = calculateAdvancedBodyScore(bmi, 23, "male");
  const body_score_description = getBodyScoreDescription(score);

  let primaryColor, secondaryColor, bgGradient, iconName;
  if (body_score_description === "Perfect") {
    primaryColor = "#667eea";
    secondaryColor = "#764ba2";
    bgGradient = ["#667eea", "#764ba2"];
    iconName = "star";
  } else if (body_score_description === "Very Good") {
    primaryColor = "#11998e";
    secondaryColor = "#38ef7d";
    bgGradient = ["#11998e", "#38ef7d"];
    iconName = "trending-up";
  } else if (body_score_description === "Good") {
    primaryColor = "#f093fb";
    secondaryColor = "#f5576c";
    bgGradient = ["#f093fb", "#f5576c"];
    iconName = "thumb-up";
  } else if (body_score_description === "Normal") {
    primaryColor = "#F2BE8F";
    secondaryColor = "#E3743C";
    bgGradient = ["#F2BE8F", "#E3743C"];
    iconName = "balance";
  } else if (body_score_description === "Bad") {
    primaryColor = "#ff9a9e";
    secondaryColor = "#fecfef";
    bgGradient = ["#ff9a9e", "#fecfef"];
    iconName = "warning";
  } else {
    primaryColor = "#56AAA7";
    secondaryColor = "#E1839F";
    bgGradient = ["#56AAA7", "#E1839F"];
    iconName = "help";
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
        <Text style={styles.headerText}>Body Score</Text>
      </View>

      {/* Main Score Card */}
      <View
        style={[
          styles.scoreCard,
          {
            borderLeftColor: primaryColor,
            shadowColor: primaryColor,
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
              <Text style={styles.statLabel}>Status</Text>
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
    backgroundColor: "#121715", // koyu kart zemini
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
