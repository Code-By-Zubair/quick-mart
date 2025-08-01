import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import AppbarWithTitle from "../../components/AppbarWithTitle";
import AppColors from "../../constants/App_colors";
import { AppAssets } from "../../assets/app_assets";
import EmptyWishlistState from "../../components/EmptyWishlistState";
import {
  getUserCart,
  updateCartItemQuantity,
} from "../../data/services/FireStoreService";
import { useNavigation } from "@react-navigation/native";
import { CartProductTypes } from "../../types/CartProductTypes";
import { AppSvgs } from "../../assets/app_svgs";
import AppText from "../../components/AppText";
import { AppFonts } from "../../assets/AppFonts";
import ProductQuantityComponent from "../../components/ProductQuantityComponent";
import AppButton from "../../components/app_button";
import CheckBox from "@react-native-community/checkbox";
import CartItem from "../../components/CartItem";
import ProductDeleteModal from "../../components/ProductDeleteModal";

const MyCartScreen = () => {
  const nav: any = useNavigation();
  const [loading, setLoading] = React.useState(true);
  const [cartItems, setCartItems] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [deletingProduct, setDeletingProduct] = React.useState<boolean>(false);
  const [showBottomSheet, setShowBottomSheet] = React.useState<boolean>(false);
  React.useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // add listener on navigation focus
        const navFocusListener = nav.addListener("focus", () => {
          fetchCart();
        });
        return () => {
          navFocusListener();
        };
      } catch (error) {
        console.error("Error fetching cart items: ", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchCartItems();
  }, []);
  const fetchCart = async () => {
    const prod = await getUserCart();
    setCartItems(prod);
  };
  const toggleBottomSheet = () => {
    setShowBottomSheet((prev) => !prev);
  };
  return (
    <View style={styles.mainView}>
      <AppbarWithTitle title="My Cart" />
      {showBottomSheet && (
        <ProductDeleteModal
          showBottomSheet={showBottomSheet}
          deletingProduct={deletingProduct}
          onDelete={() => {}}
          toggleBottomSheet={toggleBottomSheet}
        />
      )}
      {loading && cartItems.length === 0 ? (
        <ActivityIndicator
          size={50}
          color={AppColors.primary}
          style={styles.activityIndicator}
        />
      ) : !loading && cartItems.length === 0 ? (
        <EmptyWishlistState
          heading="Your cart is empty"
          body="Looks like you have not added anything in your cart. Go ahead and explore top categories."
          imageSource={AppAssets.cartEmpty}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
            renderItem={({ item }: { item: CartProductTypes }) => (
              <CartItem
                key={item.id}
                item={item}
                isSelected={selectedItems.includes(item.id)}
                onSelect={(isSelected) => {
                  if (isSelected) {
                    setSelectedItems((prev) => [...prev, item.id]);
                  } else {
                    setSelectedItems((prev) =>
                      prev.filter((id) => id !== item.id)
                    );
                  }
                }}
                onPress={() => {
                  nav.navigate("ProductDetails", {
                    productId: item.productDetails.id,
                  });
                }}
                onDecrement={async (quantity: number) => {
                  await updateCartItemQuantity(item.id, quantity);
                  setCartItems((prevItems) =>
                    prevItems.map((cartItem) =>
                      cartItem.id === item.id
                        ? { ...cartItem, quantity }
                        : cartItem
                    )
                  );
                }}
                onIncrement={async (quantity: number) => {
                  await updateCartItemQuantity(item.id, quantity);
                  setCartItems((prevItems) =>
                    prevItems.map((cartItem) =>
                      cartItem.id === item.id
                        ? { ...cartItem, quantity }
                        : cartItem
                    )
                  );
                }}
                onDelete={async () => {
                  setShowBottomSheet(true);
                }}
              />
            )}
          />
          {cartItems.length > 0 && selectedItems.length > 0 && (
            <View
              style={{
                justifyContent: "flex-end",
                padding: 16,
              }}
            >
              <AppText
                text={"Order Info"}
                customStyle={{
                  fontSize: 16,
                  fontFamily: AppFonts.JakartaMedium,
                  marginBottom: 12,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <AppText
                  text={`Subtotal`}
                  customStyle={{
                    fontSize: 12,
                    fontFamily: AppFonts.JakartaRegular,
                    color: AppColors.grey150,
                  }}
                />
                <AppText
                  text={`$${cartItems
                    .filter((item) => selectedItems.includes(item.id))
                    .reduce(
                      (total, item) =>
                        total + item.productDetails.price * item.quantity,
                      0
                    )
                    .toFixed(2)}`}
                  customStyle={{
                    fontSize: 14,
                    fontFamily: AppFonts.JakartaRegular,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <AppText
                  text={`Shipping Cost`}
                  customStyle={{
                    fontSize: 12,
                    fontFamily: AppFonts.JakartaRegular,
                    color: AppColors.grey150,
                  }}
                />
                <AppText
                  text={`$0.00`}
                  customStyle={{
                    fontSize: 14,
                    fontFamily: AppFonts.JakartaRegular,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <AppText
                  text={`Total`}
                  customStyle={{
                    fontSize: 16,
                    fontFamily: AppFonts.JakartaMedium,
                    color: AppColors.secondary,
                  }}
                />
                <AppText
                  text={`$${
                    // only selected items total
                    cartItems
                      .filter((item) => selectedItems.includes(item.id))
                      .reduce(
                        (total, item) =>
                          total + item.productDetails.price * item.quantity,
                        0
                      )
                      .toFixed(2)
                  }`}
                  customStyle={{
                    fontSize: 16,
                    fontFamily: AppFonts.JakartaMedium,
                    color: AppColors.secondary,
                  }}
                />
              </View>
              <AppButton
                title={`Checkout (${selectedItems.length})`}
                customStyle={{ width: "100%" }}
                onPress={() => {}}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default MyCartScreen;

const styles = StyleSheet.create({
  mainView: { flex: 1, paddingTop: 50, backgroundColor: AppColors.background },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
