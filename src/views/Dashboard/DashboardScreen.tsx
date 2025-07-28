import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
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

export interface LatesProduct {
  image: ImageSourcePropType;
  colors: string[];
  title: string;
  price: string;
  discountedPrice: string;
  isFavorite: boolean;
}

const DashboardScreen = () => {
  const categories = [
    { label: "Electronics", emoji: "📱" },
    { label: "Fashion", emoji: "👜" },
    { label: "Furniture", emoji: "🛋️" },
    { label: "Industrial", emoji: "🚗" },
  ];
  const products = [
    {
      image: AppAssets.headphones,
      colors: ["#FF5733", "#33FF57", "#3357FF"],
      title: "Wireless Headphones",
      price: "$199.99",
      discountedPrice: "$149.99",
      isFavorite: false,
    },
    {
      image: AppAssets.glasses,
      colors: [
        "#FF5733",
        "#33FF57",
        "#3357FF",
        "#FF5733",
        "#33FF57",
        "#3357FF",
      ],
      title: "Stylish Sunglasses Stylish Sunglasses",
      price: "$89.99",
      discountedPrice: "$69.99",
      isFavorite: true,
    },
    {
      image: AppAssets.shoe,
      colors: ["#FF5733", "#33FF57", "#3357FF"],
      title: "Running Shoes",
      price: "$129.99",
      discountedPrice: "$99.99",
      isFavorite: false,
    },
  ];
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
        <DashboardCarousel />
        <SizedBoxView height={24} />
        <View style={styles.categoryHeadView}>
          <AppText text="Categories" customStyle={styles.categoryHeadText} />
          <TouchableOpacity onPress={() => {}}>
            <AppText text="SEE ALL" customStyle={styles.seeAllText} />
          </TouchableOpacity>
        </View>
        <SizedBoxView height={12} />
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          overScrollMode="never"
          ItemSeparatorComponent={() => <SizedBoxView width={16} />}
          renderItem={({ item, index }) => (
            <CategoryComponent item={item} key={index} onPress={() => {}} />
          )}
          keyExtractor={(index) => index.toString()}
        />
        <SizedBoxView height={24} />
        <View style={styles.categoryHeadView}>
          <AppText
            text="Latest Products"
            customStyle={styles.categoryHeadText}
          />
          <TouchableOpacity onPress={() => {}}>
            <AppText text="SEE ALL" customStyle={styles.seeAllText} />
          </TouchableOpacity>
        </View>
        <SizedBoxView height={12} />
        <FlatList
          data={products}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
          overScrollMode="never"
          renderItem={({ item, index }) => (
            <DashboardLatestProductItem item={item} key={index} />
          )}
          keyExtractor={(index) => index.toString()}
        />
      </ScrollView>
    </View>
  );
};
export default DashboardScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
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
