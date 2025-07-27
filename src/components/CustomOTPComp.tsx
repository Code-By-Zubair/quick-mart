import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import AppColors from "../constants/App_colors";
import { AppFonts } from "../assets/AppFonts";

interface CustomOTPCompProps {
  value?: string;
  onTextChange: (text: string) => void;
  returnKeyType?: "next" | "done";
  ref?: any;
  onChangeText?: (text: string) => void;
  onKeyPress?: (e: any) => void;
}

const CustomOTPComp = ({
  value,
  onTextChange,
  returnKeyType,
  ref,
  onKeyPress,
}: CustomOTPCompProps) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <TextInput
      value={value}
      style={[styles.otpInput, isFocused && { borderColor: AppColors.primary }]}
      maxLength={1}
      onChangeText={onTextChange}
      onKeyPress={onKeyPress}
      returnKeyType={returnKeyType}
      keyboardType="number-pad"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      ref={ref}
    />
  );
};

export default CustomOTPComp;

const styles = StyleSheet.create({
  otpInput: {
    height: 48,
    width: 48,
    borderColor: AppColors.grey50,
    borderWidth: 1,
    borderRadius: 12,
    textAlign: "center",
    fontSize: 20,
    paddingHorizontal: 0,
    color: AppColors.secondary,
    fontFamily: AppFonts.JakartaSemiBold,
  },
});
