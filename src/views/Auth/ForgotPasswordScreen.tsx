import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import AppText from "../../components/AppText";
import SizedBoxView from "../../components/sized_box_view";
import AppInputField from "../../components/AppInputField";
import OtpField from "../../components/OtpField";
import { AppSvgs } from "../../assets/app_svgs";
import AppButton from "../../components/app_button";
import AppColors from "../../constants/App_colors";
import { AppFonts } from "../../assets/AppFonts";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const ForgotPasswordScreen = () => {
  const nav: any = useNavigation();
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [resendTimer, setResendTimer] = useState(60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState("");
  const confirmPasswordRef = useRef<TextInput>(null);

  useEffect(() => {
    if (currentStep === 1) {
      setResendTimer(60);
      timerRef.current = setInterval(() => {
        setResendTimer((prev) => {
          if (prev === 1) clearInterval(timerRef.current!);
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentStep]);

  useEffect(() => {
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setValidEmail(emailRegex.test(email) ? "" : "Invalid email address");
    } else {
      setValidEmail("");
    }
  }, [email]);
  const changePage = (step: number) => {
    setCurrentStep(step);
    if (step === 1) {
      setResendTimer(60);
      timerRef.current = setInterval(() => {
        setResendTimer((prev) => {
          if (prev === 1) clearInterval(timerRef.current!);
          return prev - 1;
        });
      }, 1000);
      setCode("");
    }
    if (step === 2) {
      setPassword("");
      setConfirmPassword("");
      setValidPassword("");
      setValidConfirmPassword("");
    }
  };
  const confirmationEmailForm = (
    <View style={{ width: Dimensions.get("window").width - 32 }}>
      <AppText text="Confirmation Email" customStyle={styles.bodyHeading} />
      <SizedBoxView height={8} />
      <AppText
        text="Enter your email address for verification."
        customStyle={styles.bodyDescription}
      />
      <SizedBoxView height={16} />
      <AppInputField
        value={email}
        isError={validEmail.length > 0}
        title="Email"
        placeholder="Enter your email"
        isRequired={true}
        returnKeyType="done"
        onChange={(text) => setEmail(text)}
        onsubmitEditing={Keyboard.dismiss}
      />
      <AppText text={validEmail} customStyle={styles.validationText} />
    </View>
  );

  const otpForm = (
    <View>
      <AppText text="Email Verification" customStyle={styles.bodyHeading} />
      <SizedBoxView height={8} />
      <AppText
        text={`Enter the 6-digit verification code sent to your email.`}
        customStyle={styles.bodyDescription}
      />
      <SizedBoxView height={16} />
      <OtpField
        value={code}
        onTextChange={(text: string) => {
          setCode(text);
        }}
      />

      <SizedBoxView height={16} />

      <TouchableOpacity
        disabled={resendTimer > 0}
        onPress={() => setResendTimer(60)}
        activeOpacity={0.7}
      >
        <AppText
          text={
            resendTimer > 0
              ? `Resend code in ${resendTimer}s`
              : "Didn't receive the code? Resend"
          }
          customStyle={[
            styles.bodyDescription,
            {
              textAlign: "center",
              color: resendTimer > 0 ? "#888" : "#007AFF",
            },
          ]}
        />
      </TouchableOpacity>

      <SizedBoxView height={12} />
    </View>
  );

  const forgotPasswordForm = (
    <View>
      <AppText text="New Password" customStyle={styles.bodyHeading} />
      <SizedBoxView height={8} />
      <AppText
        text={"Enter your new password and remember it."}
        customStyle={styles.bodyDescription}
      />
      <SizedBoxView height={16} />
      <AppInputField
        value={password}
        title="Password"
        placeholder="Enter your password"
        isError={validPassword.length > 0}
        isRequired={true}
        showIcon={true}
        returnKeyType="next"
        onChange={(text) => {
          setPassword(text);
          if (text.length < 6) {
            setValidPassword("Password must be at least 6 characters long.");
          } else {
            setValidPassword("");
          }
        }}
        onsubmitEditing={() => {
          if (confirmPasswordRef.current) {
            confirmPasswordRef.current.focus();
          }
        }}
      />
      <AppText text={validPassword} customStyle={styles.validationText} />
      <SizedBoxView height={16} />
      <AppInputField
        value={confirmPassword}
        title="Confirm Password"
        placeholder="Re-enter your password"
        isError={validConfirmPassword.length > 0}
        isRequired={true}
        showIcon={true}
        returnKeyType="done"
        ref={confirmPasswordRef}
        onChange={(text) => {
          setConfirmPassword(text);
          if (text !== password) {
            setValidConfirmPassword("Passwords do not match.");
          } else {
            setValidConfirmPassword("");
          }
        }}
        onsubmitEditing={() => {
          // close keyboard on submit
          if (confirmPasswordRef.current) {
            confirmPasswordRef.current.blur();
          }
        }}
      />
      <AppText
        text={validConfirmPassword}
        customStyle={styles.validationText}
      />
    </View>
  );

  const forms = [confirmationEmailForm, otpForm, forgotPasswordForm];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainView}>
        <View style={styles.appBar}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                if (currentStep > 0) {
                  setCurrentStep(currentStep - 1);
                } else {
                  nav.goBack();
                }
              }}
            >
              <AppSvgs.ArrowBack />
            </TouchableOpacity>

            <SizedBoxView width={12} />
            <AppText
              text={currentStep == 2 ? "Change Password" : "Forgot Password"}
              customStyle={styles.pageTitle}
            />
          </View>
          <AppText
            text={`0${currentStep + 1}/`}
            customStyle={styles.pageIndicator}
            subText="03"
            subTextStyle={styles.pageIndicatorLight}
          />
        </View>

        <SizedBoxView height={20} />
        <View style={styles.divider} />
        <SizedBoxView height={12} />

        <KeyboardAvoidingView style={{ paddingHorizontal: 16 }}>
          <FlatList
            data={forms}
            horizontal
            scrollEnabled={false}
            renderItem={() => forms[currentStep]}
            keyExtractor={(_, i) => i.toString()}
            showsHorizontalScrollIndicator={false}
          />
          <SizedBoxView height={24} />

          <AppButton
            title="Send"
            customStyle={{ width: "100%" }}
            onPress={() => {
              switch (currentStep) {
                case 0:
                  if (validEmail.length === 0 && email.length > 0) {
                    changePage(1);
                    Toast.show({
                      type: "success",
                      text1:
                        "6-digit verification code has been sent to your email address.",
                    });
                    // send OTP here
                  } else {
                    Toast.show({
                      type: "error",
                      text1: "Please enter a valid email address.",
                    });
                  }
                  break;
                case 1:
                  if (code.length === 6) {
                    // Verify OTP here
                    Toast.show({
                      type: "success",
                      text1: "OTP verified successfully.",
                    });
                    changePage(2);
                  } else {
                    Toast.show({
                      type: "error",
                      text1: "Please enter a valid 6-digit code.",
                    });
                  }
                  break;
                case 2:
                  nav.reset({
                    index: 0,
                    routes: [{ name: "change-password-success" }],
                  });
                default:
                  break;
              }
            }}
          />
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: AppColors.background,
    flex: 1,
    // paddingHorizontal: 16,
  },
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontSize: 16,
    color: AppColors.secondary,
    fontFamily: AppFonts.JakartaSemiBold,
  },
  pageIndicator: {
    fontSize: 14,
    color: AppColors.secondary,
    fontFamily: AppFonts.JakartaMedium,
  },
  pageIndicatorLight: {
    color: AppColors.grey100,
  },
  divider: {
    height: 1,
    backgroundColor: AppColors.border,
    width: "100%",
  },
  bodyHeading: {
    fontSize: 24,
    color: AppColors.secondary,
    fontFamily: AppFonts.JakartaBold,
  },
  bodyDescription: {
    width: Dimensions.get("window").width - 32,
    fontSize: 14,
    color: AppColors.grey150,
    fontFamily: AppFonts.JakartaRegular,
  },
  validationText: {
    fontFamily: AppFonts.JakartaRegular,
    color: AppColors.red,
    fontSize: 12,
  },
});
