import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import AppColors from "../../constants/App_colors";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { ProductTypes } from "../../types/ProductTypes";
import { AppAssets } from "../../assets/app_assets";
import { AppSvgs } from "../../assets/app_svgs";
import {
  addProductToCart,
  toggleFavoriteProduct,
} from "../../data/services/FireStoreService";
import { ExpandingDot } from "react-native-animated-pagination-dots";
import AppText from "../../components/AppText";
import { AppFonts } from "../../assets/AppFonts";
import { getRandomColor } from "../../utils/HelperFunctions";
import { Rating, AirbnbRating } from "react-native-ratings";
import ReadMore from "@fawazahmed/react-native-read-more";
import ProductsColorBuilder from "../../components/ProductsColorBuilder";
import ProductQuantityComponent from "../../components/ProductQuantityComponent";
import SizeBuilder from "../../components/SizeBuilder";
import ProductImageCarousel from "../../components/ProductImageCarousel";

type ProductDetailsRouteParams = {
  productDetails: ProductTypes;
};

const width = Dimensions.get("window").width;
const ProductDetailsScreen = () => {
  const route =
    useRoute<RouteProp<{ params: ProductDetailsRouteParams }, "params">>();
  const productDetails: ProductTypes = route?.params?.productDetails;

  const nav: any = useNavigation();

  let selectedColor =
    productDetails.colors && productDetails.colors.length > 0
      ? productDetails.colors[0]
      : null;
  let productQuantity = 1;
  let selectedSize =
    productDetails.sizes && productDetails.sizes.length > 0
      ? productDetails.sizes[0]
      : null;

  const TagsRenderItem = useCallback(
    ({ tag, index }: { tag: string; index: number }) => {
      return (
        <View
          key={index}
          style={{
            backgroundColor: getRandomColor(),
            padding: 6,
            borderRadius: 8,
          }}
        >
          <AppText
            text={tag}
            customStyle={{
              color: AppColors.white,
              fontSize: 10,
              fontFamily: AppFonts.JakartaSemiBold,
            }}
          />
        </View>
      );
    },
    []
  );
  return (
    <View style={styles.mainView}>
      {productDetails && (
        <ProductImageCarousel productDetails={productDetails} />
      )}
      <View style={styles.secondPortion}>
        <ScrollView
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.tagsMainView}>
            {productDetails.tags.map((tag, index) =>
              TagsRenderItem({ tag, index })
            )}
          </View>
          <View style={styles.productNameView}>
            <View style={{ width: "70%" }}>
              <AppText
                text={productDetails.name}
                customStyle={{
                  fontSize: 18,
                  fontFamily: AppFonts.JakartaBold,
                  color: AppColors.secondary,
                }}
              />
            </View>

            <View>
              <AppText
                text={`$${productDetails.price}`}
                customStyle={{
                  fontSize: 18,
                  fontFamily: AppFonts.JakartaBold,
                  color: AppColors.secondary,
                }}
              />
              {productDetails.discountedPrice && (
                <AppText
                  text={`$${productDetails.discountedPrice}`}
                  customStyle={{
                    fontSize: 14,
                    fontFamily: AppFonts.JakartaRegular,
                    color: AppColors.grey150,
                    textDecorationLine: "line-through",
                  }}
                />
              )}
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Rating
              ratingImage={AppAssets.start}
              ratingBackgroundColor={AppColors.grey100}
              ratingCount={5}
              imageSize={20}
              readonly
              startingValue={productDetails.rating}
              style={{ alignSelf: "flex-start", marginRight: 2 }}
            />
            {productDetails.rating && (
              <AppText
                text={`${productDetails.rating} `}
                customStyle={{
                  fontSize: 10,
                  fontFamily: AppFonts.JakartaSemiBold,
                  color: AppColors.secondary,
                }}
              />
            )}
            {productDetails.reviews && (
              <AppText
                text={`(${productDetails.reviews} reviews)`}
                customStyle={{
                  fontSize: 10,
                  fontFamily: AppFonts.JakartaSemiBold,
                  color: AppColors.secondary,
                }}
              />
            )}
          </View>
          <ReadMore
            numberOfLines={3}
            seeMoreText="Read more"
            seeLessText="Read less"
            seeMoreStyle={styles.seeMore}
            seeLessStyle={styles.seeMore}
            style={styles.productDescription}
          >
            {productDetails.description ||
              "No description available for this product."}
          </ReadMore>

          {productDetails.colors && productDetails.colors.length > 0 && (
            <View style={{ marginTop: 12 }}>
              <AppText text="Color" customStyle={styles.heading} />
              <ProductsColorBuilder
                colors={productDetails.colors}
                selectedColor={selectedColor}
                handleSelectedColor={(color: string) => {
                  selectedColor = color;
                }}
              />
            </View>
          )}
          {productDetails.sizes && productDetails.sizes.length > 0 && (
            <View style={{ marginTop: 12 }}>
              <AppText text="Size" customStyle={styles.heading} />
              <SizeBuilder
                sizes={productDetails.sizes}
                onPressed={(val) => {
                  selectedSize = val;
                }}
              />
            </View>
          )}
          <AppText
            text="Quantity"
            customStyle={[styles.heading, { marginTop: 12 }]}
          />
          <ProductQuantityComponent
            incrementPressed={(value) => {
              productQuantity = value;
            }}
            decrementPressed={(value) => {
              productQuantity = value;
            }}
          />
        </ScrollView>
        <View style={styles.buttonsMainView}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buyNowButton}
            onPress={() => {
              console.log(
                `Add to cart pressed with quantity: ${productQuantity}`
              );
            }}
          >
            <AppText
              text="Buy Now"
              customStyle={[styles.buttonText, { color: AppColors.secondary }]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.addToCartButton}
            onPress={async () => {
              await addProductToCart(
                productDetails.id,
                selectedColor,
                selectedSize,
                productQuantity
              );
            }}
          >
            <AppText text="Add To Cart" customStyle={styles.buttonText} />
            <AppSvgs.CartWhite />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: { flex: 1, backgroundColor: AppColors.background },
  secondPortion: {
    height: "68%",
    backgroundColor: AppColors.background,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 16,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 6,
    paddingTop: 24,
  },
  tagsMainView: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingBottom: 6,
  },
  productNameView: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom: 12,
  },
  seeMore: {
    fontSize: 14,
    fontFamily: AppFonts.JakartaRegular,
    color: AppColors.primary,
  },
  productDescription: {
    fontSize: 14,
    fontFamily: AppFonts.JakartaRegular,
    color: AppColors.grey150,
  },
  heading: {
    fontSize: 12,
    fontFamily: AppFonts.JakartaSemiBold,
  },
  buttonsMainView: { flexDirection: "row", gap: 8, bottom: 20 },
  buttonText: {
    color: AppColors.white,
    fontSize: 14,
    fontFamily: AppFonts.JakartaSemiBold,
  },
  buyNowButton: {
    flex: 1,
    height: 60,
    backgroundColor: AppColors.white,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderColor: AppColors.grey50,
    borderWidth: 1,
  },
  addToCartButton: {
    flex: 1,
    height: 60,
    backgroundColor: AppColors.secondary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderColor: AppColors.grey50,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
  },
});
export default ProductDetailsScreen;
