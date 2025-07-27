// toastConfig.ts
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { AppAssets } from "./src/assets/app_assets";

export const toastConfig = {
  success: ({ text1 }: any) => (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={AppAssets.check} style={styles.icon} />
      </View>
      <Text style={styles.message}>{text1}</Text>
    </View>
  ),
  error: ({ text1 }: any) => (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: "#FF3B30" }]}>
        <Image source={AppAssets.error} style={styles.icon} />
      </View>
      <Text style={styles.message}>{text1}</Text>
    </View>
  ),
  info: ({ text1 }: any) => (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: "#007AFF" }]}>
        <Image source={AppAssets.info} style={styles.icon} />
      </View>
      <Text style={styles.message}>{text1}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 14,
    marginHorizontal: 20,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 20,
  },
  iconContainer: {
    backgroundColor: "#17D7A0",
    borderRadius: 10,
    padding: 8,
    marginRight: 12,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "white",
  },
  message: {
    flex: 1,
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
});
