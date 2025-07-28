import { View, Text } from "react-native";
import React from "react";

// prop for height and width
interface SizedBoxProps {
  height?: number;
  width?: number;
}

const SizedBoxView = ({ height, width }: SizedBoxProps) => {
  return <View style={{ height, width, backgroundColor: "white" }}></View>;
};

export default SizedBoxView;
