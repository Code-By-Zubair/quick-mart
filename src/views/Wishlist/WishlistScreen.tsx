import {
  FlatList,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Modal,
  Dimensions,
  Pressable,
} from "react-native";
import React, { use, useRef } from "react";
import AppColors from "../../constants/App_colors";
import AppbarWithTitle from "../../components/AppbarWithTitle";
import {
  fetchProductsByListOfIds,
  toggleFavoriteProduct,
} from "../../data/services/FireStoreService";
import { useNavigation } from "@react-navigation/native";
import { ProductTypes } from "../../types/ProductTypes";
import { AppAssets } from "../../assets/app_assets";
import AppText from "../../components/AppText";
import { AppFonts } from "../../assets/AppFonts";
import { AppSvgs } from "../../assets/app_svgs";
import AppButton from "../../components/app_button";
import BottomSheet, {
  BottomSheetView,
  TouchableWithoutFeedback,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ProductDeleteModal from "../../components/ProductDeleteModal";
import EmptyWishlistState from "../../components/EmptyWishlistState";
import WishListItem from "../../components/WishListItem";

const height = Dimensions.get("window").height;
const WishlistScreen = () => {
  const nav: any = useNavigation();
  const [showBottomSheet, setShowBottomSheet] = React.useState(false);
  const [wishlistItems, setWishlistItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [deletingProduct, setDeletingProduct] = React.useState(false);
  const [productId, setProductId] = React.useState<string | null>(null);
  const getWishlistItems = async () => {
    const prod = await fetchProductsByListOfIds();
    setWishlistItems(prod);
  };
  React.useEffect(() => {
    try {
      const navFocusListener = nav.addListener("focus", () => {
        getWishlistItems();
      });

      return () => {
        navFocusListener();
      };
    } catch (error) {
      console.error("Error fetching wishlist items: ", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);

  const toggleBottomSheet = () => {
    if (showBottomSheet) {
      setShowBottomSheet(false);
      setProductId(null);
    } else {
      setShowBottomSheet(true);
    }
  };
  return (
    <View style={styles.mainView}>
      <AppbarWithTitle title="Wishlist" />

      {showBottomSheet && (
        <ProductDeleteModal
          toggleBottomSheet={toggleBottomSheet}
          deletingProduct={deletingProduct}
          showBottomSheet={showBottomSheet}
          onDelete={async () => {
            try {
              setDeletingProduct(true);
              if (!productId) {
                throw new Error("Product ID is not set");
              }
              await toggleFavoriteProduct(productId);
            } catch (error) {
              console.error("Error deleting product: ", error);
            } finally {
              setDeletingProduct(false);
              setProductId(null);
              setShowBottomSheet(false);
              toggleBottomSheet();
              getWishlistItems();
            }
          }}
        />
      )}

      {loading && wishlistItems.length === 0 ? (
        <ActivityIndicator
          size={50}
          color={AppColors.primary}
          style={styles.activityIndicator}
        />
      ) : !loading && wishlistItems.length === 0 ? (
        <EmptyWishlistState
          heading="Your wishlist is empty"
          body="Tap heart button to start saving your favorite items."
          imageSource={AppAssets.emptyWishlist}
        />
      ) : (
        <FlatList
          data={wishlistItems}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
          renderItem={({ item }: { item: ProductTypes }) => (
            <WishListItem
              item={item}
              key={item.id}
              onDelete={() => {
                setProductId(item.id);
                toggleBottomSheet();
              }}
              onPress={() => {
                nav.navigate("ProductDetails", {
                  productDetails: { ...item, isFavorite: true },
                });
              }}
            />
          )}
        />
      )}
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  mainView: { flex: 1, paddingTop: 50, backgroundColor: AppColors.background },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
