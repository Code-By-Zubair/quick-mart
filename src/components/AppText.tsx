import { StyleSheet, Text, TextStyle, View, StyleProp } from "react-native";
import React from "react";
import AppColors from "../constants/App_colors";
import { AppFonts } from "../assets/AppFonts";

// props for AppText
interface AppTextProps {
  text: string;
  customStyle?: StyleProp<TextStyle>;
  subText?: string;
  subTextStyle?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

const AppText = ({
  text,
  customStyle,
  subText,
  subTextStyle,
  numberOfLines,
}: AppTextProps) => {
  return (
    <View>
      <Text
        numberOfLines={numberOfLines}
        maxFontSizeMultiplier={1}
        style={[styles.text, customStyle]}
      >
        {text}
        {subText && <Text style={[styles.text, subTextStyle]}>{subText}</Text>}
      </Text>
    </View>
  );
};

export default AppText;

const styles = StyleSheet.create({
  text: {
    fontFamily: AppFonts.JakartaRegular,
    color: AppColors.secondary,
    fontSize: 14,
  },
});
