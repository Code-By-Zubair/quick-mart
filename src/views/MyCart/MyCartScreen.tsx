import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import React from "react";
import AppbarWithTitle from "../../components/AppbarWithTitle";
import AppColors from "../../constants/App_colors";
import { AppAssets } from "../../assets/app_assets";
import EmptyWishlistState from "../../components/EmptyWishlistState";
import {
  deleteCartItem,
  getUserCart,
  updateCartItemQuantity,
} from "../../data/services/FireStoreService";
import { useNavigation } from "@react-navigation/native";
import { CartProductTypes } from "../../types/CartProductTypes";
import AppText from "../../components/AppText";
import { AppFonts } from "../../assets/AppFonts";
import AppButton from "../../components/app_button";
import CartItem from "../../components/CartItem";
import ProductDeleteModal from "../../components/ProductDeleteModal";

const MyCartScreen = () => {
  const nav: any = useNavigation();
  const [loading, setLoading] = React.useState(true);
  const [cartItems, setCartItems] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [deletingProduct, setDeletingProduct] = React.useState<boolean>(false);
  const [showBottomSheet, setShowBottomSheet] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);
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
          onDelete={async () => {
            try {
              setDeletingProduct(true);
              if (selectedItem) {
                await deleteCartItem(selectedItem);
              }
            } catch (error) {
              console.error("Error deleting product: ", error);
            } finally {
              setTimeout(() => {
                setDeletingProduct(false);
                setShowBottomSheet(false);
                setSelectedItem(null);
                fetchCart();
              }, 1000);
            }
          }}
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
                  // nav.navigate("productDetails", {
                  //   productId: item.productDetails.id,
                  // });
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
                  setSelectedItem(item.id);
                  setShowBottomSheet(true);
                }}
              />
            )}
          />
          {cartItems.length > 0 && selectedItems.length > 0 && (
            <View style={styles.orderInfoContainer}>
              <AppText text={"Order Info"} customStyle={styles.orderInfoText} />
              <View style={[styles.infoContainerRow, { marginBottom: 8 }]}>
                <AppText
                  text={`Subtotal`}
                  customStyle={styles.subTototalText}
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
                  customStyle={styles.subTototalText}
                />
              </View>
              <View style={[styles.infoContainerRow, { marginBottom: 8 }]}>
                <AppText
                  text={`Shipping Cost`}
                  customStyle={styles.subTototalText}
                />
                <AppText text={`$0.00`} customStyle={styles.subTototalText} />
              </View>
              <View style={styles.infoContainerRow}>
                <AppText text={`Total`} customStyle={styles.totalPriceText} />
                <AppText
                  text={`$${cartItems
                    .filter((item) => selectedItems.includes(item.id))
                    .reduce(
                      (total, item) =>
                        total + item.productDetails.price * item.quantity,
                      0
                    )
                    .toFixed(2)}`}
                  customStyle={styles.totalPriceText}
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
  orderInfoContainer: {
    justifyContent: "flex-end",
    padding: 16,
  },
  orderInfoText: {
    fontSize: 16,
    fontFamily: AppFonts.JakartaMedium,
    marginBottom: 12,
  },
  infoContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  subTototalText: {
    fontSize: 12,
    fontFamily: AppFonts.JakartaRegular,
    color: AppColors.grey150,
  },
  totalPriceText: {
    fontSize: 16,
    fontFamily: AppFonts.JakartaMedium,
    color: AppColors.secondary,
  },
});
