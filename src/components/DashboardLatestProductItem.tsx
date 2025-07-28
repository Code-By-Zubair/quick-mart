import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { AppSvgs } from "../assets/app_svgs";
import AppColors from "../constants/App_colors";
import { LatesProduct } from "../views/Dashboard/DashboardScreen";
import AppText from "./AppText";
import { AppFonts } from "../assets/AppFonts";

const DashboardLatestProductItem = ({ item }: { item: LatesProduct }) => {
  const [selectedColor, setSelectedColor] = React.useState(item.colors[0]);
  const [isfavorite, setIsFavorite] = React.useState(item.isFavorite);

  return (
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
        source={item.image}
        style={{
          height: 138,
          width: (Dimensions.get("window").width - 48) / 2,
          //   marginRight: 16,
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
          onPress={() => {
            setIsFavorite(!isfavorite);
          }}
        >
          {isfavorite ? <AppSvgs.favouritefilled /> : <AppSvgs.Favourite />}
        </TouchableOpacity>
      </ImageBackground>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={styles.container}>
          {item.colors.slice(0, 3).map((color, index) => (
            <TouchableOpacity
              onPress={() => setSelectedColor(color)}
              activeOpacity={0.7}
              key={index}
              style={[
                styles.circle,
                {
                  backgroundColor: color,
                  marginLeft: index === 0 ? 0 : -6,
                  borderWidth: color === selectedColor ? 3 : 0,
                  borderColor:
                    color === selectedColor ? "#2196F3" : "transparent",
                  elevation: color === selectedColor ? 5 : 0,
                  shadowColor: color === selectedColor ? "#2196F3" : "#000",
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
      <View style={{ width: (Dimensions.get("window").width - 48) / 2 }}>
        <AppText
          text={item.title}
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
        text={item.price}
        customStyle={{
          fontSize: 12,
          color: AppColors.secondary,
          fontFamily: AppFonts.JakartaSemiBold,
          paddingLeft: 10,
        }}
      />
      {item.discountedPrice && (
        <AppText
          text={item.discountedPrice}
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
