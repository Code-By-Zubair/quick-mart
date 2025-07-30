import {
  BackHandler,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import AppColors from "../../constants/App_colors";
import { AppAssets } from "../../assets/app_assets";
import AppText from "../../components/AppText";
import { AppFonts } from "../../assets/AppFonts";
import SizedBoxView from "../../components/sized_box_view";
import AppButton from "../../components/app_button";
import { useNavigation } from "@react-navigation/native";

const ChangePasswordSuccess = () => {
  const nav: any = useNavigation();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        nav.reset({
          index: 0,
          routes: [{ name: "login" }],
        });
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.mainView}>
      <View style={styles.lockBgContainer}>
        <Image
          source={AppAssets.lock}
          style={{ height: 300, alignSelf: "center", resizeMode: "contain" }}
        />
      </View>
      <AppText
        text="New password set successfully"
        customStyle={styles.bodyHeading}
      />
      <SizedBoxView height={16} />
      <AppText
        text="Congratulations! Your password has been set successfully. Please proceed to the login screen to verify your account."
        customStyle={styles.bodyDescription}
      />
      <SizedBoxView height={24} />
      <AppButton
        title="Login"
        onPress={() => {
          nav.reset({
            index: 0,
            routes: [{ name: "login" }],
          });
        }}
      />
    </View>
  );
};

export default ChangePasswordSuccess;

const styles = StyleSheet.create({
  mainView: {
    paddingTop: 50,
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: AppColors.background,
  },
  lockBgContainer: {
    width: "100%",
    backgroundColor: AppColors.primary50,
    paddingVertical: 30,
    paddingHorizontal: 18,
    alignSelf: "center",
    borderRadius: 32,
    marginBottom: 24,
  },
  bodyHeading: {
    fontSize: 24,
    color: AppColors.secondary,
    fontFamily: AppFonts.JakartaBold,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  bodyDescription: {
    width: Dimensions.get("window").width - 32,
    fontSize: 14,
    color: AppColors.grey150,
    fontFamily: AppFonts.JakartaRegular,
    textAlign: "center",
    alignSelf: "center",
  },
});
