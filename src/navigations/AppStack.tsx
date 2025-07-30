import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStackNavigator from "./Auth_stack";
import BottomTabStack from "./BottomTabStack";
import ProductsScreen from "../views/Products/ProductsScreen";
import ProductDetailsScreen from "../views/Products/ProductDetailsScreen";

const AppStack = createNativeStackNavigator();
const AppStackNavigator = () => {
  const [user, setUser] = React.useState(true);

  return (
    <AppStack.Navigator
      id={undefined}
      initialRouteName={user ? "Home" : "AuthStack"}
    >
      <AppStack.Screen
        name="AuthStack"
        component={AuthStackNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Home"
        component={BottomTabStack}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="products"
        component={ProductsScreen}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="productDetails"
        component={ProductDetailsScreen}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
const styles = StyleSheet.create({});
