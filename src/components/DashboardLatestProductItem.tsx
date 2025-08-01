import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { AppSvgs } from "../assets/app_svgs";
import AppColors from "../constants/App_colors";
import AppText from "./AppText";
import { AppFonts } from "../assets/AppFonts";
import { ProductTypes } from "../types/ProductTypes";
import { AppAssets } from "../assets/app_assets";

const DashboardLatestProductItem = ({
  item,
  isFavorite,
  onFavTap,
  onPress = () => {},
}: {
  item: ProductTypes;
  isFavorite: boolean;
  onFavTap: () => void;
  onPress?: () => void;
}) => {
  const [selectedColor, setSelectedColor] = React.useState(item.colors[0]);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View
        style={{
          borderColor: AppColors.grey50,
          borderWidth: 1,
          borderRadius: 24,
          marginBottom: 16,
          paddingBottom: 10,
          marginRight: 16,
        }}
      >
        <ImageBackground
          source={
            item.images.length > 0
              ? { uri: item.images[0] }
              : AppAssets.imagePlaceholder
          }
          style={{
            height: 138,
            width: (Dimensions.get("window").width - 48) / 2,
            borderRadius: 24,
            overflow: "hidden",
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              backgroundColor: AppColors.secondary,
              borderRadius: 50,
              padding: 6,
              width: 30,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={onFavTap}
          >
            {isFavorite ? <AppSvgs.favouritefilled /> : <AppSvgs.Favourite />}
          </TouchableOpacity>
        </ImageBackground>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {item.colors.length > 0 && (
            <View>
              <View style={styles.container}>
                {item.colors
                  .slice(0, item.colors.length > 4 ? 3 : item.colors.length)
                  .map((color, index) => (
                    <View
                      key={index}
                      style={[
                        styles.circle,
                        {
                          backgroundColor: color,
                          marginLeft: index === 0 ? 0 : -6,
                          borderWidth: 0.5,
                          borderColor: AppColors.grey100,
                          elevation: 5,
                          shadowColor: "#000",
                        },
                      ]}
                    />
                  ))}
              </View>
              {item.colors.length > 3 && (
                <AppText
                  text={`+${item.colors.length - 3} more`}
                  customStyle={{
                    color: AppColors.secondary,
                    fontSize: 10,
                    marginLeft: 8,
                    textDecorationLine: "underline",
                  }}
                />
              )}
            </View>
          )}
        </View>
        <View style={{ width: (Dimensions.get("window").width - 48) / 2 }}>
          <AppText
            text={item.name}
            numberOfLines={1}
            customStyle={{
              fontSize: 14,
              color: AppColors.secondary,
              fontFamily: AppFonts.JakartaBold,
              paddingLeft: 10,
            }}
          />
        </View>

        <AppText
          text={`$${item?.price?.toString() ?? ""}`}
          customStyle={{
            fontSize: 12,
            color: AppColors.secondary,
            fontFamily: AppFonts.JakartaSemiBold,
            paddingLeft: 10,
          }}
        />
        {item.discountedPrice && (
          <AppText
            text={`$${item?.discountedPrice?.toString() ?? ""}`}
            customStyle={{
              fontSize: 10,
              color: AppColors.grey100,
              fontFamily: AppFonts.JakartaRegular,
              textDecorationLine: "line-through",
              paddingLeft: 10,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default DashboardLatestProductItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
