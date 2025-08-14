import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { LineChart } from "react-native-gifted-charts";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";

const AppLineChart = ({ data }) => {
  return (
    <View>
      <View
        style={{
          marginVertical: 10,
          paddingTop: 20,
          backgroundColor: "#414141",
          borderRadius: 10,
          width: s(316),
          height: vs(200),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data.length !== 0 ? (
          <LineChart
            width={316}
            height={156}
            isAnimated
            thickness={3}
            color={AppColors.limeGreenColor}
            maxValue={150}
            noOfSections={3}
            animateOnDataChange
            animationDuration={1000}
            onDataChangeAnimationDuration={300}
            areaChart
            yAxisTextStyle={{ color: "lightgray" }}
            data={data}
            hideDataPoints
            startFillColor={AppColors.limeGreenColor}
            endFillColor={AppColors.limeGreenColor}
            startOpacity={0.7}
            endOpacity={0.2}
            spacing={10}
            backgroundColor="#414141"
            rulesColor="gray"
            rulesType="solid"
            initialSpacing={0}
            yAxisColor="lightgray"
            xAxisColor="lightgray"
          />
        ) : (
          <Text style={styles.title}>There is no records!</Text>
        )}
      </View>
    </View>
  );
};

export default AppLineChart;

const styles = StyleSheet.create({
  title: {
    color: AppColors.whiteColor,
    fontSize: s(18),
    fontFamily: "Roboto-Regular",
  },
});
