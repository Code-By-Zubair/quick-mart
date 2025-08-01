import {
  StyleSheet,
  Image,
  View,
  ImageSourcePropType,
  Dimensions,
} from "react-native";
import React from "react";
import { AppAssets } from "../assets/app_assets";
import { AppFonts } from "../assets/AppFonts";
import AppColors from "../constants/App_colors";
import AppButton from "./app_button";
import AppText from "./AppText";
import { useNavigation } from "@react-navigation/native";

interface EmptyWishlistStateProps {
  imageSource: ImageSourcePropType;
  heading: string;
  body: string;
}

const EmptyWishlistState = ({
  imageSource,
  heading,
  body,
}: EmptyWishlistStateProps) => {
  const nav: any = useNavigation();
  return (
    <View style={styles.emptyWishlistContainer}>
      <Image source={imageSource} style={{ width: 240, height: 240 }} />
      <AppText text={heading} customStyle={styles.emptyWishlistHeading} />
      <AppText text={body} customStyle={styles.emptyWishlistBody} />
      <AppButton
        title="Explore Categories"
        onPress={() => nav.navigate("categories")}
      />
    </View>
  );
};

export default EmptyWishlistState;

const styles = StyleSheet.create({
  emptyWishlistContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyWishlistHeading: {
    fontSize: 24,
    color: AppColors.secondary,
    fontFamily: AppFonts.JakartaBold,
  },
  emptyWishlistBody: {
    fontSize: 14,
    color: AppColors.grey150,
    fontFamily: AppFonts.JakartaRegular,
    textAlign: "center",
    width: Dimensions.get("window").width - 48,
    marginBottom: 24,
  },
});
