import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AppColors from "../constants/App_colors";

interface BuilderTypes {
  colors: string[];
  selectedColor: string;
  handleSelectedColor: (color: string) => void;
}

const ProductsColorBuilder = ({
  colors,
  handleSelectedColor,
}: BuilderTypes) => {
  const [selectColor, setSelectColor] = React.useState<string>(colors[0]);
  return (
    <View style={styles.builderView}>
      {colors.map((color, index) => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            handleSelectedColor(color);
            setSelectColor(color);
          }}
          key={index}
        >
          <View
            key={index}
            style={{
              width: 32,
              height: 32,
              borderRadius: 50,
              backgroundColor: color,
              marginRight: 4,
              borderWidth: selectColor === color ? 2 : 1,
              borderColor:
                selectColor === color ? AppColors.primary : AppColors.grey50,
              elevation: 2,
            }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProductsColorBuilder;

const styles = StyleSheet.create({
  builderView: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 4,
  },
});
