import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface GoBackButtonProps {
  style?: StyleProp<ViewStyle>;
  size?: number;
}

const GoBackButton: FC<GoBackButtonProps> = ({ style, size }) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <AntDesign
      name="arrowleft"
      size={size ? size : 36}
      color="white"
      onPress={goBack}
      style={[style, styles.goBackBtn]}
    />
  );
};

export default GoBackButton;

const styles = StyleSheet.create({ goBackBtn: {} });
