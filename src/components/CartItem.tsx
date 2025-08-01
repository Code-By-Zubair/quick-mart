import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import React from "react";
import CheckBox from "@react-native-community/checkbox";
import { AppAssets } from "../assets/app_assets";
import { AppSvgs } from "../assets/app_svgs";
import AppColors from "../constants/App_colors";
import AppText from "./AppText";
import ProductQuantityComponent from "./ProductQuantityComponent";
import { CartProductTypes } from "../types/CartProductTypes";
import { AppFonts } from "../assets/AppFonts";

interface CartItemProps {
  item: CartProductTypes;
  isSelected: boolean;
  onPress?: () => void;
  onDelete?: () => void;
  onSelect?: (id: boolean) => void;
  onIncrement?: (quantity: number) => void;
  onDecrement?: (quantity: number) => void;
}

const CartItem = ({
  item,
  isSelected,
  onPress,
  onDelete,
  onSelect,
  onIncrement,
  onDecrement,
}: CartItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.CartItemContainer}
    >
      <Image
        source={
          item.productDetails.images && item.productDetails.images.length > 0
            ? { uri: item.productDetails.images[0] }
            : AppAssets.imagePlaceholder
        }
        resizeMode="cover"
        style={styles.CartItemImage}
      />
      <View style={{ flex: 2 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "80%" }}>
            <AppText
              text={item.productDetails.name}
              numberOfLines={2}
              customStyle={styles.CartItemName}
            />
          </View>

          <CheckBox
            value={isSelected}
            boxType="circle"
            tintColors={{
              true: AppColors.primary,
              false: AppColors.grey150,
            }}
            style={{ borderRadius: 20 }}
            onValueChange={onSelect}
          />
        </View>

        <AppText
          text={`$${item.productDetails.price}`}
          customStyle={styles.CartItemPrice}
        />
        <AppText
          text={`$${item.productDetails.discountedPrice}`}
          customStyle={styles.CartItemDiscountedPrice}
        />
        <View style={styles.deleteNQuantityRow}>
          <ProductQuantityComponent
            quantity={item.quantity}
            decrementPressed={onDecrement}
            incrementPressed={onIncrement}
          />
          <TouchableOpacity onPress={onDelete}>
            <AppSvgs.Delete />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  CartItemContainer: {
    flexDirection: "row",
    borderRadius: 12,
    gap: 8,
    borderColor: AppColors.grey50,
    borderWidth: 1,
    padding: 8,
  },
  CartItemImage: {
    flex: 1,
    height: 120,
    borderRadius: 12,
  },
  CartItemName: {
    fontSize: 16,
    fontFamily: AppFonts.JakartaBold,
    marginBottom: 8,
  },
  CartItemPrice: {
    fontSize: 12,
    color: AppColors.secondary,
    fontFamily: AppFonts.JakartaSemiBold,
  },
  CartItemDiscountedPrice: {
    fontSize: 10,
    color: AppColors.grey150,
    fontFamily: AppFonts.JakartaSemiBold,
    textDecorationLine: "line-through",
  },
  deleteNQuantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
