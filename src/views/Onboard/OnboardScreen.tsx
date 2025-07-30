import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import AppColors from "../../constants/App_colors";
import AppButton from "../../components/app_button";
import { useNavigation } from "@react-navigation/native";
import { ExpandingDot } from "react-native-animated-pagination-dots";
import { AppSvgs } from "../../assets/app_svgs";
import SizedBoxView from "../../components/sized_box_view";
import { OnboardData, onBoardDataType } from "./OnboardData";
import OnboardCard from "../../components/OnboardCard";
import AppText from "../../components/AppText";
import { AppFonts } from "../../assets/AppFonts";

const OnboardScreen = () => {
  const nav: any = useNavigation();

  const [currentPage, setCurrentPage] = React.useState(0);
  const onBoardData = OnboardData;
  useEffect(() => {
    const unsubscribe = nav.addListener("focus", () => {
      setCurrentPage(0);
      if (flatRef.current) {
        flatRef.current.scrollToIndex({ index: 0, animated: false });
      }
    });

    return unsubscribe;
  }, [nav]);
  const handleNext = () => {
    if (flatRef.current && currentPage < onBoardData.length - 1) {
      flatRef.current.scrollToIndex({
        index: currentPage + 1,
        animated: true,
      });
      setCurrentPage(currentPage + 1);
    } else {
      nav.navigate("login");
    }
  };
  const handlePrev = () => {
    if (flatRef.current && currentPage > 0) {
      flatRef.current.scrollToIndex({
        index: currentPage - 1,
        animated: true,
      });
      setCurrentPage(currentPage - 1);
    }
  };

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatRef = React.useRef<Animated.FlatList>(null);
  return (
    <View style={styles.mainView}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ justifyContent: "space-between", flex: 1 }}>
          <Animated.FlatList
            data={onBoardData}
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            overScrollMode={"never"}
            contentContainerStyle={{ flexGrow: 1 }}
            ref={flatRef}
            renderItem={({
              item,
              index,
            }: {
              item: onBoardDataType;
              index: number;
            }) => {
              return (
                <OnboardCard
                  item={item}
                  currentPage={currentPage}
                  handlePrevFunc={handlePrev}
                  skipFunc={() => {
                    nav.reset({
                      index: 0,
                      routes: [{ name: "login" }],
                    });
                  }}
                />
              );
            }}
          />

          <View style={{ marginBottom: 30 }}>
            {currentPage != 2 ? (
              <AppButton title="Next" onPress={() => handleNext()} />
            ) : (
              <View
                style={{
                  marginBottom: 30,
                  paddingHorizontal: 30,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.loginBtn}
                  onPress={() => {
                    nav.reset({ index: 0, routes: [{ name: "login" }] });
                  }}
                >
                  <AppText text="Login" customStyle={styles.loginText} />
                </TouchableOpacity>
                <SizedBoxView width={8} />
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.getStartedBtn}
                  onPress={() => {}}
                >
                  {/* <Text style={styles.getStartedText}>Get Started</Text> */}
                  <AppText
                    text="Get Started"
                    customStyle={styles.getStartedText}
                  />
                  <SizedBoxView width={8} />
                  <AppSvgs.ArrowNext />
                </TouchableOpacity>
              </View>
            )}

            <ExpandingDot
              data={onBoardData}
              expandingDotWidth={10}
              scrollX={scrollX}
              activeDotColor={AppColors.primary}
              inActiveDotColor={AppColors.grey100}
              inActiveDotOpacity={0.6}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 3,
              }}
              containerStyle={{
                position: "static",
                backgroundColor: AppColors.primary50,
                padding: 5,
                borderRadius: 10,
              }}
            ></ExpandingDot>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OnboardScreen;

const styles = StyleSheet.create({
  mainView: { paddingTop: 50, flex: 1, backgroundColor: AppColors.background },
  loginBtn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    flex: 1,
    height: 60,
    borderColor: AppColors.grey50,
    borderWidth: 1,
  },
  loginText: {
    color: AppColors.secondary,
    fontSize: 14,
    fontFamily: AppFonts.JakartaSemiBold,
  },
  getStartedBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    flex: 1,
    height: 60,
    backgroundColor: AppColors.secondary,
  },
  getStartedText: {
    color: AppColors.white,
    fontSize: 14,
    fontFamily: AppFonts.JakartaSemiBold,
  },
});
