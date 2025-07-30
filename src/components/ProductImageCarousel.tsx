import {
  Animated,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import AppColors from "../constants/App_colors";
import { ExpandingDot } from "react-native-animated-pagination-dots";
import { AppAssets } from "../assets/app_assets";
import { toggleFavoriteProduct } from "../data/services/FireStoreService";
import { useNavigation } from "@react-navigation/native";
import { ProductTypes } from "../types/ProductTypes";
import { AppSvgs } from "../assets/app_svgs";

interface ProductImageCarouselProps {
  productDetails: ProductTypes;
}
const width = Dimensions.get("window").width;

const ProductImageCarousel = ({
  productDetails,
}: ProductImageCarouselProps) => {
  const nav: any = useNavigation();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const currentPage = React.useRef(0);
  const flatRef: any = React.useRef<Animated.FlatList>(null);
  const [isFavourite, setIsFavourite] = React.useState(
    productDetails.isFavorite || false
  );
  const onViewableItemsChanged = React.useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      currentPage.current = viewableItems[0].index;
    }
  });
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (flatRef.current) {
        const nextIndex =
          (currentPage.current + 1) % productDetails.images.length;
        flatRef.current.scrollToIndex({ index: nextIndex, animated: true });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <View style={styles.firstPortion}>
      <View style={styles.backBtnRow}>
        <AppSvgs.ArrowBack
          onPress={() => {
            nav.goBack();
          }}
        />
        <TouchableOpacity
          style={styles.favBtn}
          onPress={() => {
            setIsFavourite(!isFavourite);
            toggleFavoriteProduct(productDetails.id);
          }}
        >
          {isFavourite ? <AppSvgs.favouritefilled /> : <AppSvgs.Favourite />}
        </TouchableOpacity>
      </View>
      <FlatList
        data={productDetails.images}
        ref={flatRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        overScrollMode={"never"}
        keyExtractor={(item, index) => item + index}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewableItemsChanged.current}
        renderItem={({ item }) => (
          <Image
            source={item !== "" ? { uri: item } : AppAssets.imagePlaceholder}
            style={{ width: width }}
            resizeMode="cover"
          />
        )}
      />
      <ExpandingDot
        data={productDetails.images}
        expandingDotWidth={6}
        scrollX={scrollX}
        activeDotColor={AppColors.primary}
        inActiveDotColor={AppColors.grey100}
        inActiveDotOpacity={0.6}
        dotStyle={styles.dotStyle}
        containerStyle={styles.dotContainerStyle}
      />
    </View>
  );
};

export default ProductImageCarousel;

const styles = StyleSheet.create({
  firstPortion: {
    width: width,
    height: "35.5%",
  },
  backBtnRow: {
    paddingHorizontal: 16,
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  favBtn: {
    backgroundColor: AppColors.secondary,
    borderRadius: 50,
    padding: 6,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  dotContainerStyle: {
    position: "absolute",
    backgroundColor: AppColors.primary50,
    padding: 5,
    borderRadius: 10,
    alignSelf: "center",
    marginHorizontal: 16,
    bottom: 40,
  },
});
