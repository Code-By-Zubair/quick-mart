import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import AppColors from "../constants/App_colors";
import { AppFonts } from "../assets/AppFonts";

// props for the button
interface AppButtonProps {
  title: string;
  onPress: () => void;
  customStyle?: StyleProp<ViewStyle>;
}

const AppButton = ({ title, onPress, customStyle }: AppButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.onboardButton, customStyle]}
      onPress={onPress}
    >
      <Text style={styles.titleText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  onboardButton: {
    height: 60,
    width: "90%",
    alignSelf: "center",
    backgroundColor: AppColors.secondary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  titleText: {
    color: AppColors.white,
    fontSize: 14,
    fontFamily: AppFonts.JakartaSemiBold,
  },
});
