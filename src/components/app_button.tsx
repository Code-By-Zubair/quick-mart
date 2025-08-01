import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
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
  isLoading?: boolean;
  onPress: () => void;
  customStyle?: StyleProp<ViewStyle>;
  customTextStyle?: StyleProp<TextStyle>;
}

const AppButton = ({
  title,
  onPress,
  customStyle,
  isLoading,
  customTextStyle,
}: AppButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.onboardButton, customStyle]}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size={"large"} color={AppColors.white} />
      ) : (
        <Text style={[styles.titleText, customTextStyle]}>{title}</Text>
      )}
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
  },
  titleText: {
    color: AppColors.white,
    fontSize: 14,
    fontFamily: AppFonts.JakartaSemiBold,
  },
});
