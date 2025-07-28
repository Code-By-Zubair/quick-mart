import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AppColors from "../constants/App_colors";
import { AppFonts } from "../assets/AppFonts";
import AppText from "./AppText";

// props for CategoryComponent
interface CategoryComponentProps {
  item: {
    label: string;
    emoji: string;
  };
  onPress?: () => void;
}

const CategoryComponent = ({ item, onPress }: CategoryComponentProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        padding: 8,
        borderColor: AppColors.grey50,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: "center",
        width: 90,
      }}
    >
      <AppText text={item.emoji} customStyle={[{ fontSize: 24 }]} />

      <AppText
        text={item.label}
        customStyle={{
          fontFamily: AppFonts.JakartaSemiBold,
          fontSize: 10,
          color: AppColors.secondary,
          textAlign: "center",
          marginTop: 2,
        }}
      />
    </TouchableOpacity>
  );
};

export default CategoryComponent;

const styles = StyleSheet.create({});
