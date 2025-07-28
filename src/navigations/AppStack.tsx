import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStackNavigator from "./Auth_stack";
import HomeStackNavigator from "./HomeStack";

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
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
const styles = StyleSheet.create({});
