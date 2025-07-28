import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppColors from "../../constants/App_colors";
import { AppAssets } from "../../assets/app_assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppText from "../../components/AppText";
import { AppFonts } from "../../assets/AppFonts";
import AppInputField from "../../components/AppInputField";
import SizedBoxView from "../../components/sized_box_view";
import AppButton from "../../components/app_button";
import React, { useState } from "react";
import AuthService from "../../data/services/AuthService";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const SignupScreen = () => {
  const nav: any = useNavigation();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [validUsername, setValidUsername] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const resetStates = () => {
    setEmail("");
    setFullName("");
    setPassword("");
    setValidUsername("");
    setValidEmail("");
    setValidPassword("");
  };
  React.useEffect(() => {
    // Validate email and password
    if (fullName.length > 0) {
      setValidUsername(
        fullName.length < 3 ? "Username must be at least 3 characters" : ""
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length !== 0) {
      setValidEmail(!emailRegex.test(email) ? "Invalid Email" : "");
    }
    if (password.length > 0)
      setValidPassword(
        password.length < 6 ? "Password must be 6 characters" : ""
      );
  }, [email, password, fullName]);

  return (
    <View style={styles.mainView}>
      <Image source={AppAssets.logo} style={styles.logo} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <KeyboardAwareScrollView
          overScrollMode="never"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={true}
          bounces={true}
        >
          <AppText text="Signup" customStyle={styles.signupText} />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.dontHaveAccountTap}
            onPress={() => {
              nav.goBack();
            }}
          >
            <AppText
              text="Already have an account? "
              customStyle={styles.dontHaveAccountText}
            />
            <AppText text="Login" customStyle={styles.loginText} />
          </TouchableOpacity>
          <AppInputField
            value={fullName}
            isError={validUsername.length > 0}
            title="Full Name"
            placeholder="Enter your full name"
            isRequired={true}
            returnKeyType="next"
            onChange={(text) => setFullName(text)}
            onsubmitEditing={() => {
              if (emailRef.current) {
                emailRef.current.focus();
              }
            }}
          />
          <AppText text={validUsername} customStyle={styles.validationText} />
          <SizedBoxView height={16} />
          <AppInputField
            value={email}
            title="Email"
            placeholder="Enter your email"
            isError={validEmail.length > 0}
            isRequired={true}
            secureTextEntry={true}
            ref={emailRef}
            returnKeyType="next"
            onChange={(text) => setEmail(text)}
            onsubmitEditing={() => {
              // close keyboard on submit
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
              // close keyboard on submit
              if (passwordRef.current) {
                passwordRef.current.blur();
              }
            }}
          />
          <AppText text={validPassword} customStyle={styles.validationText} />
          <SizedBoxView height={24} />
          <AppButton
            title="Create Account"
            customStyle={{ width: "100%" }}
            isLoading={isLoading}
            onPress={async () => {
              try {
                if (validEmail.length > 0 || validPassword.length > 0) {
                  return;
                }
                setIsLoading(true);
                await AuthService.createAccount(email, password, fullName);
              } catch (error) {
                console.error("Signup failed: ", error);
                Toast.show({
                  type: "error",
                  text1: "Signup failed",
                });
              } finally {
                setIsLoading(false);
                resetStates();
              }
            }}
          />
          <SizedBoxView height={50} />
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  mainView: {
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
  signupText: {
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
  loginText: {
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
});
