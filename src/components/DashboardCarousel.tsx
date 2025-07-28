import {
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { ExpandingDot } from "react-native-animated-pagination-dots";
import AppColors from "../constants/App_colors";
import { AppFonts } from "../assets/AppFonts";
import AppText from "./AppText";
import { AppAssets } from "../assets/app_assets";
import SizedBoxView from "./sized_box_view";
// interface for the carousel component
interface CarouselItem {
  image: string;
  discountText: string;
  categoryText: string;
  title: string;
}

const DashboardCarousel = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const currentPage = React.useRef(0);
  const flatRef = React.useRef<Animated.FlatList>(null);
  const onViewableItemsChanged = React.useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      currentPage.current = viewableItems[0].index;
    }
  });
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (flatRef.current) {
        const nextIndex = (currentPage.current + 1) % data.length;
        flatRef.current.scrollToIndex({ index: nextIndex, animated: true });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  const data: CarouselItem[] = [
    {
      image: AppAssets.headphones,
      discountText: "30% OFF",
      categoryText: "On Headphones",
      title: "Exclusive Sales",
    },
    {
      image: AppAssets.headphones,
      discountText: "20% OFF",
      categoryText: "On Speakers",
      title: "Limited Time Offer",
    },
    {
      image: AppAssets.headphones,
      discountText: "15% OFF",
      categoryText: "On Accessories",
      title: "Best Deals",
    },
    {
      image: AppAssets.headphones,
      discountText: "25% OFF",
      categoryText: "On Gadgets",
      title: "Hot Sales",
    },
  ];
  return (
    <View style={styles.carouselCard}>
      <Animated.FlatList
        ref={flatRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        overScrollMode={"never"}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        renderItem={({ item, index }) => (
          <ImageBackground source={item.image} style={styles.backgroundImage}>
            <View
              style={{
                backgroundColor: AppColors.secondary,
                padding: 6,
                alignItems: "center",
                borderRadius: 8,
                paddingHorizontal: 12,
              }}
            >
              <AppText
                text={item.discountText}
                customStyle={{
                  fontSize: 10,
                  color: AppColors.white,
                  fontFamily: AppFonts.JakartaBold,
                }}
              />
            </View>
            <SizedBoxView height={6} />
            <AppText
              text={item.categoryText}
              customStyle={{
                fontSize: 12,
                color: AppColors.white,
                fontFamily: AppFonts.JakartaRegular,
              }}
            />

            <AppText
              text={item.title}
              customStyle={{
                fontSize: 24,
                color: AppColors.white,
                fontFamily: AppFonts.JakartaBold,
              }}
            />
          </ImageBackground>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <ExpandingDot
        data={data}
        expandingDotWidth={6}
        scrollX={scrollX}
        activeDotColor={AppColors.primary}
        inActiveDotColor={AppColors.grey100}
        inActiveDotOpacity={0.6}
        dotStyle={{
          width: 6,
          height: 6,
          borderRadius: 5,
          marginHorizontal: 3,
        }}
        containerStyle={{
          position: "absolute",
          backgroundColor: AppColors.primary50,
          padding: 5,
          borderRadius: 10,
          alignSelf: "flex-end",
          marginHorizontal: 16,
          bottom: 12,
        }}
      ></ExpandingDot>
    </View>
  );
};

export default DashboardCarousel;

const styles = StyleSheet.create({
  carouselCard: {
    width: Dimensions.get("window").width - 32,
    height: 148,
    borderRadius: 24,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  backgroundImage: {
    width: Dimensions.get("window").width - 32,
    height: 148,
    resizeMode: "cover",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
});
