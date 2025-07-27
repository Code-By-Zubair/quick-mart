import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import AppText from "./AppText";
import AppColors from "../constants/App_colors";
import { AppFonts } from "../assets/AppFonts";
import { AppSvgs } from "../assets/app_svgs";

// props for AppInputField
interface AppInputFieldProps {
  title: string;
  isRequired?: boolean;
  placeholder: string;
  secureTextEntry?: boolean;
  showIcon?: boolean;
  value?: string;
  onChange?: (text: string) => void;
  ref?: React.RefObject<TextInput>;
  onsubmitEditing?: () => void;
  returnKeyType?: "done" | "next";
  isError?: boolean;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "number-pad"
    | "name-phone-pad"
    | "decimal-pad"
    | "twitter"
    | "web-search";
}

const AppInputField = ({
  title,
  isRequired,
  placeholder,
  showIcon = false,
  value,
  onChange,
  keyboardType,
  ref,
  onsubmitEditing,
  returnKeyType,
  isError = false,
}: AppInputFieldProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <View>
      <AppText
        text={title}
        customStyle={styles.fieldTitle}
        {...(isRequired
          ? { subText: "*", subTextStyle: styles.fieldRequired }
          : {})}
      />
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
          styles.inputField,
          isError && { borderColor: AppColors.red },
        ]}
      >
        <TextInput
          style={{ flex: 1 }}
          placeholder={placeholder}
          value={value}
          secureTextEntry={showPassword}
          onChangeText={onChange}
          keyboardType={keyboardType}
          ref={ref}
          blurOnSubmit={false}
          onSubmitEditing={onsubmitEditing}
          returnKeyType={returnKeyType}
        />
        {showIcon && (
          <TouchableOpacity
            hitSlop={20}
            activeOpacity={0.7}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AppSvgs.EyeClose /> : <AppSvgs.EyeOpen />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AppInputField;

const styles = StyleSheet.create({
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
    borderColor: AppColors.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 12,
    color: AppColors.secondary,
    fontFamily: AppFonts.JakartaRegular,
    marginBottom: 5,
  },
});
