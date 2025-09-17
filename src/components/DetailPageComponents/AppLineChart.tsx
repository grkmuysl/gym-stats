import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";

const AppLineChart = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Burada kayıt yok!</Text>
      </View>
    );
  }

  const prepareChartData = () => {
    const values = data.map((item) => item.value || 0);

    if (values.length === 1) {
      const currentValue = values[0];
      return {
        values: [0, currentValue],
        labels: ["", ""],
        hidePointsAtIndex: [0],
      };
    }

    return {
      values: [0, ...values],
      labels: ["", ...values.map((_, index) => `${index + 1}`)],
      hidePointsAtIndex: [0],
    };
  };

  const processedData = prepareChartData();

  const chartData = {
    labels: processedData.labels,
    datasets: [
      {
        data: processedData.values,
        color: (opacity = 1) => AppColors.limeGreenColor,
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: AppColors.grayBgColor,
    backgroundGradientFrom: AppColors.grayBgColor,
    backgroundGradientTo: AppColors.grayBgColor,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: AppColors.blackBgColor,
      fill: AppColors.limeGreenColor,
    },
    fillShadowGradient: AppColors.limeGreenColor,
    fillShadowGradientOpacity: 0.3,
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={s(316)}
        height={vs(180)}
        chartConfig={chartConfig}
        style={styles.chart}
        withDots={true}
        withShadow={true}
        hidePointsAtIndex={processedData.hidePointsAtIndex}
      />
    </View>
  );
};

export default AppLineChart;

const styles = StyleSheet.create({
  container: {
    marginVertical: vs(10),
    backgroundColor: AppColors.grayBgColor,
    borderRadius: s(10),
    width: s(316),
    height: vs(200),
    justifyContent: "center",
    alignItems: "center",
  },
  chart: {
    borderRadius: s(10),
    marginTop: vs(16),
  },
  title: {
    color: AppColors.whiteColor,
    fontSize: s(18),
    fontFamily: "Roboto-Bold",
  },
});
