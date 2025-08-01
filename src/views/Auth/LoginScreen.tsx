import {
  Image,
  ImageBackgroundComponent,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { use, useEffect, useRef } from "react";
import AppColors from "../../constants/App_colors";
import { AppAssets } from "../../assets/app_assets";
import { AppFonts } from "../../assets/AppFonts";
import AppText from "../../components/AppText";
import SizedBoxView from "../../components/sized_box_view";
import { AppSvgs } from "../../assets/app_svgs";
import AppInputField from "../../components/AppInputField";
import AppButton from "../../components/app_button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import auth, {
  createUserWithEmailAndPassword,
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
} from "@react-native-firebase/auth";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { signIn } from "../../data/services/AuthService";

const LoginScreen = () => {
  const nav: any = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [validEmail, setValidEmail] = React.useState("");
  const [validPassword, setValidPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const passwordRef = useRef(null);
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length != 0) {
      setValidEmail(!emailRegex.test(email) ? "Invalid Email" : "");
    }
    if (password.length > 0)
      setValidPassword(
        password.length < 6 ? "Password must be 6 characters" : ""
      );
  }, [email, password]);
  const resetStates = () => {
    setEmail("");
    setPassword("");
    setValidEmail("");
    setValidPassword("");
  };

  return (
    <View style={styles.mainView}>
      <Image source={AppAssets.logo} style={styles.logo} />
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          overScrollMode="never"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={true}
          bounces={true}
          bouncesZoom={true}
          scrollEventThrottle={16}
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
        >
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View>
              <AppText text="Login" customStyle={styles.loginText} />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.dontHaveAccountTap}
                onPress={() => {
                  nav.navigate("signup");
                  resetStates();
                }}
              >
                <AppText
                  text="Don't have an account? "
                  customStyle={styles.dontHaveAccountText}
                />
                <AppText text="Signup" customStyle={styles.signUpText} />
              </TouchableOpacity>
              <AppInputField
                value={email}
                isError={validEmail.length > 0}
                title="Email"
                placeholder="Enter your email"
                isRequired={true}
                returnKeyType="next"
                onChange={(text) => setEmail(text)}
                onsubmitEditing={() => {
                  if (passwordRef.current) {
                    passwordRef.current.focus();
                  }
                }}
              />
              <AppText text={validEmail} customStyle={styles.validationText} />
              <SizedBoxView height={16} />
              <AppInputField
                value={password}
                title="Password"
                placeholder="Enter your password"
                isError={validPassword.length > 0}
                isRequired={true}
                showIcon={true}
                secureTextEntry={true}
                ref={passwordRef}
                onChange={(text) => setPassword(text)}
                onsubmitEditing={() => {
                  if (passwordRef.current) {
                    passwordRef.current.blur();
                  }
                }}
              />
              <AppText
                text={validPassword}
                customStyle={styles.validationText}
              />
              <SizedBoxView height={24} />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.forgotPasswordTap}
                onPress={() => {
                  nav.navigate("forgotPassword");
                  resetStates();
                }}
              >
                <AppText
                  text="Forgot Password?"
                  customStyle={styles.forgotPasswordTxt}
                />
              </TouchableOpacity>
              <SizedBoxView height={24} />
              <AppButton
                title="Login"
                customStyle={{ width: "100%" }}
                isLoading={isLoading}
                onPress={async () => {
                  try {
                    if (
                      validEmail.length > 0 ||
                      validPassword.length > 0 ||
                      email.length === 0 ||
                      password.length === 0
                    ) {
                      return;
                    }
                    setIsLoading(true);
                    const user = await signIn(email, password);
                    if (user) {
                      nav.reset({
                        index: 0,
                        routes: [{ name: "home" }],
                      });
                    }
                  } catch (error) {
                    console.error("Login error:", error);
                  } finally {
                    setIsLoading(false);
                    resetStates();
                  }
                }}
              />
            </View>
            <View
              style={{
                marginBottom: 16,
              }}
            >
              <Text style={styles.agreePrivacyText}>
                By logging in, you agree to our{" "}
                <Text onPress={() => {}} style={styles.privacyPolicyText}>
                  Privacy Policy
                </Text>{" "}
                and{" "}
                <Text onPress={() => {}} style={styles.privacyPolicyText}>
                  Terms & Conditions.
                </Text>
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainView: {
    paddingTop: 50,
    backgroundColor: AppColors.background,
    flex: 1,
    paddingHorizontal: 16,
  },
  logo: {
    width: 110,
    resizeMode: "contain",
    height: 32,
    marginBottom: 24,
  },
  loginText: {
    fontSize: 24,
    color: AppColors.secondary,
    marginBottom: 8,
    fontFamily: AppFonts.JakartaBold,
  },
  dontHaveAccountTap: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 32,
  },
  dontHaveAccountText: {
    fontSize: 14,
    color: AppColors.grey150,
  },
  signUpText: {
    fontSize: 14,
    color: AppColors.primary,
    fontFamily: AppFonts.JakartaMedium,
  },
  fieldTitle: {
    fontSize: 14,
    color: AppColors.secondary,
    fontFamily: AppFonts.JakartaMedium,
    marginBottom: 8,
  },
  fieldRequired: {
    color: AppColors.red,
  },
  inputField: {
    height: 60,
    flex: 1,
    backgroundColor: "pink",
    borderColor: AppColors.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 12,
    color: AppColors.secondary,
    fontFamily: AppFonts.JakartaRegular,
  },
  validationText: {
    fontFamily: AppFonts.JakartaRegular,
    color: AppColors.red,
    fontSize: 12,
  },
  forgotPasswordTap: {
    alignSelf: "flex-end",
  },
  forgotPasswordTxt: {
    color: AppColors.primary,
    fontSize: 14,
    fontFamily: AppFonts.JakartaMedium,
  },
  agreePrivacyText: {
    fontFamily: AppFonts.JakartaSemiBold,
    color: AppColors.secondary,
    fontSize: 12,
    textAlign: "center",
  },
  privacyPolicyText: {
    color: AppColors.blue,
    textDecorationLine: "underline",
  },
});
