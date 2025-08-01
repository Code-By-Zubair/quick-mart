import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { AppAssets } from "../assets/app_assets";
import { AppSvgs } from "../assets/app_svgs";
import AppText from "./AppText";
import { ProductTypes } from "../types/ProductTypes";
import { AppFonts } from "../assets/AppFonts";
import AppColors from "../constants/App_colors";

interface WishListItemProps {
  item: ProductTypes;
  onPress?: () => void;
  onDelete?: () => void;
}

const WishListItem = ({ item, onPress, onDelete }: WishListItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.wishListItemContainer}
    >
      <Image
        source={
          item.images && item.images.length > 0
            ? { uri: item.images[0] }
            : AppAssets.imagePlaceholder
        }
        resizeMode="cover"
        style={styles.wishListItemImage}
      />
      <View style={{ flex: 2 }}>
        <AppText
          text={item.name}
          numberOfLines={2}
          customStyle={styles.wishListItemName}
        />
        <AppText
          text={`$${item.price}`}
          customStyle={styles.wishListItemPrice}
        />
        <AppText
          text={`$${item.discountedPrice}`}
          customStyle={styles.wishListItemDiscountedPrice}
        />

        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <AppSvgs.Delete />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default WishListItem;

const styles = StyleSheet.create({
  wishListItemContainer: {
    flexDirection: "row",
    borderRadius: 12,
    gap: 8,
    borderColor: AppColors.grey50,
    borderWidth: 1,
    padding: 8,
  },
  wishListItemImage: {
    flex: 1,
    height: 120,
    borderRadius: 12,
  },
  wishListItemName: {
    fontSize: 16,
    fontFamily: AppFonts.JakartaBold,
    marginBottom: 8,
  },
  wishListItemPrice: {
    fontSize: 12,
    color: AppColors.secondary,
    fontFamily: AppFonts.JakartaSemiBold,
  },
  wishListItemDiscountedPrice: {
    fontSize: 10,
    color: AppColors.grey150,
    fontFamily: AppFonts.JakartaSemiBold,
    textDecorationLine: "line-through",
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
