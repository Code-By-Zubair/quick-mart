import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { AppSvgs } from "../assets/app_svgs";
import AppText from "./AppText";
import { AppFonts } from "../assets/AppFonts";
import AppColors from "../constants/App_colors";
interface ProductQuantityComponentProps {
  incrementPressed?: (value: number) => void;
  decrementPressed?: (value: number) => void;
}

const ProductQuantityComponent = ({
  incrementPressed,
  decrementPressed,
}: ProductQuantityComponentProps) => {
  const [quantity, setQuantity] = React.useState(1);
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
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
        disabled={quantity === 0}
        activeOpacity={0.7}
        onPress={() => {
          decrement();
          decrementPressed?.(quantity);
        }}
        style={{
          borderRadius: 5,
        }}
      >
        <AppSvgs.Minus />
      </TouchableOpacity>
      <AppText text={quantity.toString()} customStyle={styles.quantity} />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          increment();
          incrementPressed(quantity);
        }}
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
