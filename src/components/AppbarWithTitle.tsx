import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AppColors from "../constants/App_colors";
import { AppFonts } from "../assets/AppFonts";
import { AppSvgs } from "../assets/app_svgs";
import AppText from "./AppText";
import { useNavigation } from "@react-navigation/native";

interface AppbarWithTitleProps {
  title: string;
  onBackPress?: () => void;
}

const AppbarWithTitle = ({ title, onBackPress }: AppbarWithTitleProps) => {
  const nav: any = useNavigation();
  return (
    <View>
      <View style={styles.appbar}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBackPress ? onBackPress : () => nav.goBack()}
        >
          <AppSvgs.ArrowBack />
        </TouchableOpacity>

        <AppText text={title} customStyle={styles.appbarText} />
      </View>
    </View>
  );
};

export default AppbarWithTitle;

const styles = StyleSheet.create({
  appbar: {
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 16,
    backgroundColor: AppColors.white,
    borderBottomColor: AppColors.grey50,
    paddingBottom: 12,
    borderBottomWidth: 2,
    paddingHorizontal: 16,
  },
  appbarText: {
    fontSize: 14,
    color: AppColors.secondary,
    fontFamily: AppFonts.JakartaMedium,
    marginLeft: 12,
  },
});
