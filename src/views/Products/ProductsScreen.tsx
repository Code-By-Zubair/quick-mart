import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { use, useEffect } from "react";
import AppbarWithTitle from "../../components/AppbarWithTitle";
import AppColors from "../../constants/App_colors";
import DashboardLatestProductItem from "../../components/DashboardLatestProductItem";
import {
  getAllProductsSnapshot,
  getUserFavoritesSnapshot,
  toggleFavoriteProduct,
} from "../../data/services/FireStoreService";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppText from "../../components/AppText";
import { AppFonts } from "../../assets/AppFonts";

const ProductsScreen = () => {
  const nav: any = useNavigation();
  const { categoryId }: any = useRoute()?.params ?? "";
  const [fbproducts, setFbProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [userFavorites, setUserFavorites] = React.useState<string[]>([]);
  React.useEffect(() => {
    try {
      const unsubscribe = getAllProductsSnapshot((fetchedProducts) => {
        setFbProducts(fetchedProducts);
      }, categoryId);
      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching products: ", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);
  useEffect(() => {
    try {
      const unsubscribe = getUserFavoritesSnapshot((favorites) => {
        setUserFavorites(favorites);
      });
      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching user favorites: ", error);
    }
  }, []);
  return (
    <View style={styles.mainView}>
      <AppbarWithTitle title="Products" />
      {loading && fbproducts.length === 0 ? (
        <ActivityIndicator
          size={50}
          color={AppColors.primary}
          style={styles.activityIndicator}
        />
      ) : !loading && fbproducts.length === 0 ? (
        <View style={styles.noProductsContainer}>
          <AppText
            text="No Products Available"
            customStyle={styles.noProductsText}
          />
        </View>
      ) : (
        <FlatList
          data={fbproducts}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 16,
            paddingTop: 16,
          }}
          overScrollMode="never"
          renderItem={({ item }) => (
            <DashboardLatestProductItem
              item={item}
              key={item.id}
              isFavorite={userFavorites.some(
                (fav: any) => fav.productId === item.id
              )}
              onFavTap={() => {
                toggleFavoriteProduct(item.id);
              }}
              onPress={() => {
                nav.navigate("productDetails", {
                  productDetails: {
                    ...item,
                    isFavorite: userFavorites.some(
                      (fav: any) => fav.productId === item.id
                    ),
                  },
                });
              }}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  mainView: { paddingTop: 50, flex: 1, backgroundColor: AppColors.background },
  activityIndicator: {
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
  },
  noProductsText: {
    color: AppColors.secondary,
    textAlign: "center",
    fontFamily: AppFonts.JakartaBold,
  },
  noProductsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
