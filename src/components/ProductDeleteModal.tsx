import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppFonts } from "../assets/AppFonts";
import AppColors from "../constants/App_colors";
import { toggleFavoriteProduct } from "../data/services/FireStoreService";
import AppButton from "./app_button";
import AppText from "./AppText";

interface ProductDeleteModalProps {
  showBottomSheet: boolean;
  toggleBottomSheet: () => void;
  deletingProduct: boolean;
  onDelete: () => void;
}
const ProductDeleteModal = ({
  showBottomSheet,
  toggleBottomSheet,
  deletingProduct,
  onDelete,
}: ProductDeleteModalProps) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={showBottomSheet}
      onRequestClose={toggleBottomSheet}
      statusBarTranslucent
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
          justifyContent: "flex-end",
        }}
      >
        <Pressable style={{ flex: 1 }} onPress={toggleBottomSheet} />

        <View
          style={{
            backgroundColor: AppColors.white,
            padding: 16,
            borderColor: AppColors.grey50,
            borderWidth: 1,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}
        >
          <AppText
            text="Delete product from wishlist"
            customStyle={{
              fontSize: 16,
              fontFamily: AppFonts.JakartaMedium,
              marginBottom: 16,
            }}
          />
          <AppButton
            title="Delete Product"
            customStyle={{ width: "100%" }}
            isLoading={deletingProduct}
            onPress={onDelete}

            // {async () => {
            //   try {
            //     setDeletingProduct(true);
            //     if (!productId) {
            //       throw new Error("Product ID is not set");
            //     }
            //     await toggleFavoriteProduct(productId);
            //   } catch (error) {
            //     console.error("Error deleting product: ", error);
            //   } finally {
            //     setDeletingProduct(false);
            //     setProductId(null);
            //     setShowBottomSheet(false);
            //     toggleBottomSheet();
            //     getWishlistItems();
            //   }
            // }}
          />
          <AppButton
            title="Cancel"
            customStyle={{
              width: "100%",
              backgroundColor: AppColors.white,
              borderColor: AppColors.grey50,
              borderWidth: 1,
              marginTop: 16,
            }}
            customTextStyle={{ color: AppColors.secondary }}
            onPress={toggleBottomSheet}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ProductDeleteModal;

const styles = StyleSheet.create({});
