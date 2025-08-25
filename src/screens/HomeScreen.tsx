import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppColors } from "../styles/colors";
import UserStats from "../components/HomeScreenComponents/UserStats";
import AllRecords from "../components/DetailPageComponents/AllRecords";
import { s, vs } from "react-native-size-matters";
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const HomeScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.userStats}>
          <UserStats />
        </View>
        <View style={styles.allRecords}>
          <View
            style={[
              styles.headerCard,
              {
                backgroundColor: AppColors.grayBgColor,
                shadowColor: AppColors.grayBgColor,
              },
            ]}
          >
            <MaterialIcons
              name="library-books"
              size={20}
              color={AppColors.whiteColor}
            />
            <Text style={styles.headerText}>All Records</Text>
          </View>
          <AllRecords />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: AppColors.blackBgColor,
    flex: 1,
  },
  userStats: {
    padding: s(12),
    marginTop: vs(16),
  },

  title: {
    fontSize: s(18),
    fontFamily: "Roboto-Regular",
    color: AppColors.whiteColor,
    left: s(4),
  },
  allRecords: {
    width: s(316),
  },
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: s(16),
    paddingVertical: s(8),
    borderRadius: s(20),
    marginBottom: vs(6),
    marginTop: vs(12),
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
    width: s(132),
    height: vs(48),
    alignSelf: "center",
  },
  headerText: {
    color: AppColors.whiteColor,
    fontSize: s(14),
    fontFamily: "Roboto-SemiBold",
    marginLeft: s(8),
    fontWeight: "600",
  },
});
