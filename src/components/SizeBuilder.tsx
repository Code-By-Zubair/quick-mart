import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AppText from "./AppText";
import { AppFonts } from "../assets/AppFonts";
import AppColors from "../constants/App_colors";
interface SizeBuilderProps {
  sizes: string[];
  onPressed?: (size: string) => void;
}
const SizeBuilder = ({ sizes, onPressed }: SizeBuilderProps) => {
  const [selectedSize, setSelectedSize] = React.useState(sizes[0]);
  return (
    <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
      {sizes.map((size) => (
        <TouchableOpacity
          activeOpacity={0.7}
          key={size}
          onPress={() => {
            setSelectedSize(size);
            onPressed?.(size);
          }}
        >
          <View
            key={size}
            style={[
              styles.sizeCircle,
              {
                backgroundColor:
                  selectedSize === size ? AppColors.secondary : AppColors.white,
              },
            ]}
          >
            <AppText
              text={size}
              customStyle={[
                styles.sizeText,
                {
                  color:
                    selectedSize === size
                      ? AppColors.white
                      : AppColors.secondary,
                },
              ]}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SizeBuilder;

const styles = StyleSheet.create({
  sizeCircle: {
    height: 32,
    width: 32,
    justifyContent: "center",
    alignItems: "center",
    borderColor: AppColors.grey50,
    borderWidth: 1,
    borderRadius: 50,
  },
  sizeText: {
    textAlign: "center",
    fontSize: 10,
    fontFamily: AppFonts.JakartaSemiBold,
  },
});
