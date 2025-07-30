import { Image, StyleSheet, View } from "react-native";
import { AppAssets } from "../../assets/app_assets";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AppColors from "../../constants/App_colors";

const SplashScreen = () => {
  const nav: any = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      nav.reset({
        index: 0,
        routes: [{ name: "onboard" }],
      });
    }, 3000);
  });
  return (
    <View style={styles.mainView}>
      <Image style={styles.splashImage} source={AppAssets.splash} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    paddingTop: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.background,
  },
  splashImage: {
    width: "80%",
    resizeMode: "contain",
  },
});

export default SplashScreen;
