import {
  FlatList,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { use } from "react";
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

const WishlistScreen = () => {
  const nav: any = useNavigation();
  const [wishlistItems, setWishlistItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

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

  return (
    <View style={styles.mainView}>
      <AppbarWithTitle title="Wishlist" />
      {loading ? (
        <ActivityIndicator
          size={50}
          color={AppColors.primary}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      ) : !loading && wishlistItems.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={AppAssets.emptyWishlist}
            style={{ width: 240, height: 240 }}
          />
          <AppText
            text="Your wishlist is empty"
            customStyle={{
              fontSize: 24,
              color: AppColors.secondary,
              fontFamily: AppFonts.JakartaBold,
            }}
          />
          <AppText
            text="Tap heart button to start saving your favorite items."
            customStyle={{
              fontSize: 14,
              color: AppColors.grey150,
              fontFamily: AppFonts.JakartaRegular,
              textAlign: "center",
              width: "50%",
              marginBottom: 24,
            }}
          />
          <AppButton
            title="Explore Categories"
            onPress={() => nav.navigate("categories")}
          />
        </View>
      ) : (
        <FlatList
          data={wishlistItems}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
          renderItem={({ item }: { item: ProductTypes }) => (
            <View
              style={{
                flexDirection: "row",
                borderRadius: 12,
                gap: 8,
                borderColor: AppColors.grey50,
                borderWidth: 1,
                padding: 8,
              }}
            >
              <Image
                source={
                  item.images && item.images.length > 0
                    ? { uri: item.images[0] }
                    : AppAssets.imagePlaceholder
                }
                resizeMode="cover"
                style={{
                  flex: 1,
                  height: 120,
                  borderRadius: 12,
                }}
              />
              <View style={{ flex: 2 }}>
                <AppText
                  text={item.name}
                  numberOfLines={2}
                  customStyle={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom: 8,
                  }}
                />
                <AppText
                  text={`$${item.price}`}
                  customStyle={{
                    fontSize: 12,
                    color: AppColors.secondary,
                    fontFamily: AppFonts.JakartaSemiBold,
                  }}
                />
                <AppText
                  text={`$${item.discountedPrice}`}
                  customStyle={{
                    fontSize: 10,
                    color: AppColors.grey150,
                    fontFamily: AppFonts.JakartaSemiBold,
                    textDecorationLine: "line-through",
                  }}
                />

                <TouchableOpacity
                  onPress={async () => {
                    await toggleFavoriteProduct(item.id);
                    await getWishlistItems();
                  }}
                  style={{ position: "absolute", right: 0, bottom: 0 }}
                >
                  <AppSvgs.Delete />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  mainView: { flex: 1, paddingTop: 50, backgroundColor: AppColors.background },
});
