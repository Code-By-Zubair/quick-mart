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
import SizedBoxView from "./sized_box_view";
import { ProductAdvertisementType } from "../types/ProductAdvertisement";
import FastImage from "react-native-fast-image";
import { AppAssets } from "../assets/app_assets";
import { LinearGradient } from "expo-linear-gradient";

// DashboardCarouselProps props
interface DashboardCarouselProps {
  ads: ProductAdvertisementType[];
}

const DashboardCarousel = ({ ads }: DashboardCarouselProps) => {
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
        const nextIndex = (currentPage.current + 1) % ads.length;
        flatRef.current.scrollToIndex({ index: nextIndex, animated: true });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.carouselCard}>
      <Animated.FlatList
        ref={flatRef}
        data={ads}
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
        renderItem={({
          item,
        }: {
          item: ProductAdvertisementType;
          index: number;
        }) => (
          <ImageBackground
            source={
              item.image != ""
                ? { uri: item.image }
                : AppAssets.imagePlaceholder
            }
            style={styles.backgroundImage}
          >
            <LinearGradient
              colors={["transparent", AppColors.secondary]}
              style={styles.gradientStyling}
            >
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
                  text={item.discount}
                  customStyle={{
                    fontSize: 10,
                    color: AppColors.white,
                    fontFamily: AppFonts.JakartaBold,
                  }}
                />
              </View>
              <SizedBoxView height={6} />
              <AppText
                text={item.subHeading}
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
            </LinearGradient>
          </ImageBackground>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <ExpandingDot
        data={ads}
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
  },
  gradientStyling: {
    width: Dimensions.get("window").width - 32,
    height: 148,
    resizeMode: "cover",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
});
