import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { AppSvgs } from "../assets/app_svgs";
import AppText from "./AppText";
import { AppFonts } from "../assets/AppFonts";
import AppColors from "../constants/App_colors";

interface ProductQuantityComponentProps {
  incrementPressed?: (value: number) => void;
  decrementPressed?: (value: number) => void;
  quantity?: number;
}

const ProductQuantityComponent = ({
  incrementPressed,
  decrementPressed,
  quantity,
}: ProductQuantityComponentProps) => {
  const [internalQuantity, setInternalQuantity] = React.useState(quantity || 1);
  const increment = () => {
    const newVal = internalQuantity + 1;
    setInternalQuantity(newVal);
    incrementPressed?.(newVal);
  };

  const decrement = () => {
    if (internalQuantity > 1) {
      const newVal = internalQuantity - 1;
      setInternalQuantity(newVal);
      decrementPressed?.(newVal);
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 4,
        borderColor: AppColors.grey50,
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: "flex-start",
        marginTop: 8,
      }}
    >
      <TouchableOpacity
        disabled={internalQuantity === 0}
        activeOpacity={0.7}
        hitSlop={10}
        onPress={decrement}
        style={{
          borderRadius: 5,
        }}
      >
        <AppSvgs.Minus />
      </TouchableOpacity>
      <AppText
        text={internalQuantity.toString()}
        customStyle={styles.quantity}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={increment}
        hitSlop={10}
        style={{
          borderRadius: 5,
        }}
      >
        <AppSvgs.Add />
      </TouchableOpacity>
    </View>
  );
};

export default ProductQuantityComponent;

const styles = StyleSheet.create({
  quantity: {
    fontSize: 16,
    fontFamily: AppFonts.JakartaMedium,
    marginHorizontal: 10,
    width: 30,
    textAlign: "center",
  },
});
