import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import AppColors from "../constants/App_colors";
import { AppFonts } from "../assets/AppFonts";
import CustomOTPComp from "./CustomOTPComp";

interface OtpFieldProps extends TextInputProps {
  onTextChange: (text: string) => void;
  value?: string;
  returnKeyType?: "next" | "done";
}

const OTP_LENGTH = 6;

const OtpField = ({ onTextChange }: OtpFieldProps) => {
  const [otp, setOTP] = useState(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<TextInput[]>([]);

  const handleOTPChange = (index: number, char: string) => {
    const newOTP = [...otp];

    newOTP[index] = char;
    setOTP(newOTP);
    onTextChange(newOTP.join(""));

    if (char && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, e: any) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newOTP = [...otp];
      newOTP[index - 1] = "";
      setOTP(newOTP);
      onTextChange(newOTP.join(""));
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: OTP_LENGTH }).map((_, index) => (
        // <TextInput
        //   key={index}
        //   style={[styles.otpInput]}
        //   ref={(ref) => {
        //     if (ref) inputRefs.current[index] = ref;
        //   }}
        //   value={otp[index]}
        //   maxLength={1}
        //   keyboardType="number-pad"
        //   returnKeyType={index === OTP_LENGTH - 1 ? "done" : "next"}
        //   onChangeText={(char) => handleOTPChange(index, char)}
        //   onKeyPress={(e) => handleKeyPress(index, e)}
        // />
        <CustomOTPComp
          key={index}
          value={otp[index]}
          onTextChange={(char) => handleOTPChange(index, char)}
          onKeyPress={(e) => handleKeyPress(index, e)}
          returnKeyType={index === OTP_LENGTH - 1 ? "done" : "next"}
          ref={(ref) => {
            if (ref) inputRefs.current[index] = ref;
          }}
        />
      ))}
    </View>
  );
};

export default OtpField;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
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
