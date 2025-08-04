import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import React, { FC } from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";

interface AppButtonProps {
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
}

const AppButton: FC<AppButtonProps> = ({ onPress, title, style }) => {
  return (
    <TouchableOpacity style={[style, styles.container]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    width: s(112),
    borderRadius: s(32),
    height: vs(40),
    backgroundColor: AppColors.limeGreenColor,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: s(11),
    color: AppColors.blackBgColor,
  },
});
