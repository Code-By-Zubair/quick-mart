import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ImageSourcePropType,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { use, useEffect } from "react";
import AppColors from "../../constants/App_colors";
import { AppAssets } from "../../assets/app_assets";
import { AppSvgs } from "../../assets/app_svgs";
import SizedBoxView from "../../components/sized_box_view";
import AppText from "../../components/AppText";
import { AppFonts } from "../../assets/AppFonts";
import { ExpandingDot } from "react-native-animated-pagination-dots";
import DashboardCarousel from "../../components/DashboardCarousel";
import CategoryComponent from "../../components/CategoryComponent";
import DashboardLatestProductItem from "../../components/DashboardLatestProductItem";
import {
  fetchProductsByListOfIds,
  getCategoriesSnapshot,
  getFiveCategoriesSnapshot,
  getLatestProductsSnapshot,
  getProductAdvertisementsSnapshot,
  getUserCart,
  getUserFavoritesSnapshot,
  toggleFavoriteProduct,
} from "../../data/services/FireStoreService";
import { useNavigation } from "@react-navigation/native";
import { ProductTypes } from "../../types/ProductTypes";

export interface LatesProduct {
  image: ImageSourcePropType;
  colors: string[];
  title: string;
  price: string;
  discountedPrice: string;
  isFavorite: boolean;
}

const DashboardScreen = () => {
  const nav: any = useNavigation();
  const [advProducts, setAdvProducts] = React.useState([]);
  const [loadingAds, setLoadingAds] = React.useState(true);
  const [fbcategories, setCategories] = React.useState([]);
  const [loadingCategories, setLoadingCategories] = React.useState(true);
  const [fbproducts, setProducts] = React.useState<ProductTypes[]>([]);
  const [loadingProducts, setLoadingProducts] = React.useState(true);
  const [userFavorites, setUserFavorites] = React.useState<string[]>([]);
  useEffect(() => {
    try {
      const unsubscribe = getFiveCategoriesSnapshot((fetchedCategories) => {
        setCategories(fetchedCategories);
        getUserCart().then((cartItems) => {
          console.log("Cart items fetched successfully:", cartItems);
        });
      });
      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching categories: ", error);
    } finally {
      setTimeout(() => {
        setLoadingCategories(false);
      }, 1000);
    }
  }, []);
  useEffect(() => {
    try {
      setLoadingAds(true);
      const unsubscribe = getProductAdvertisementsSnapshot((fetchedAds) => {
        setAdvProducts(fetchedAds);
        setLoadingAds(false);
      });
      return () => unsubscribe();
    } catch (error) {
      setLoadingAds(false);
      console.error("Error fetching product advertisements: ", error);
    }
  }, []);
  useEffect(() => {
    try {
      const unsubscribe = getLatestProductsSnapshot((fetchedProducts) => {
        setProducts(fetchedProducts);
      });
      return () => unsubscribe();
    } catch (error) {
      console.error("Error in DashboardScreen useEffect: ", error);
    } finally {
      setTimeout(() => {
        setLoadingCategories(false);
      }, 1000);
    }
  }, [userFavorites]);
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
      <View style={styles.appBar}>
        <Image source={AppAssets.logo} style={styles.logo} />
        <View style={styles.searchNProfile}>
          <AppSvgs.Search />
          <Image source={AppAssets.profile} style={styles.profileImage} />
        </View>
      </View>
      <SizedBoxView height={24} />
      <ScrollView overScrollMode="never">
        {advProducts.length > 0 && <DashboardCarousel ads={advProducts} />}
        <SizedBoxView height={24} />
        {loadingCategories && fbcategories.length === 0 ? (
          // loading indicator
          <View style={{ alignItems: "center", marginTop: 16 }}>
            <AppText
              text="Loading categories..."
              customStyle={{ color: AppColors.secondary }}
            />
          </View>
        ) : !loadingCategories && fbcategories.length == 0 ? (
          <View style={{ alignItems: "center", marginTop: 16 }}>
            <AppText
              text="No categories available"
              customStyle={{ color: AppColors.secondary }}
            />
          </View>
        ) : (
          <View>
            <View style={styles.categoryHeadView}>
              <AppText
                text="Categories"
                customStyle={styles.categoryHeadText}
              />
              <TouchableOpacity
                onPress={() => {
                  nav.navigate("categories");
                }}
              >
                <AppText text="SEE ALL" customStyle={styles.seeAllText} />
              </TouchableOpacity>
            </View>
            <SizedBoxView height={12} />
            <FlatList
              data={fbcategories}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              overScrollMode="never"
              ItemSeparatorComponent={() => <SizedBoxView width={16} />}
              renderItem={({ item }) => (
                <CategoryComponent
                  item={item}
                  key={item.id}
                  onPress={() => {
                    nav.navigate("products", {
                      categoryId: item.id,
                    });
                  }}
                />
              )}
              keyExtractor={(item) => item.id}
            />
            <SizedBoxView height={24} />
          </View>
        )}

        <View style={styles.categoryHeadView}>
          <AppText
            text="Latest Products"
            customStyle={styles.categoryHeadText}
          />
          <TouchableOpacity
            onPress={() => {
              nav.navigate("products");
            }}
          >
            <AppText text="SEE ALL" customStyle={styles.seeAllText} />
          </TouchableOpacity>
        </View>
        <SizedBoxView height={12} />
        <FlatList
          data={fbproducts}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
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
      </ScrollView>
    </View>
  );
};
export default DashboardScreen;

const styles = StyleSheet.create({
  mainView: { paddingTop: 50, flex: 1, backgroundColor: AppColors.background },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
  logo: {
    resizeMode: "contain",
    height: 32,
    width: 104,
  },
  searchNProfile: {
    flexDirection: "row",
    gap: 16,
  },
  profileImage: {
    height: 32,
    width: 32,
    borderRadius: 8,
  },
  categoryHeadText: {
    fontFamily: AppFonts.JakartaBold,
    fontSize: 18,
    color: AppColors.secondary,
  },
  categoryHeadView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  seeAllText: {
    fontFamily: AppFonts.JakartaSemiBold,
    fontSize: 10,
    color: AppColors.primary,
  },
});
