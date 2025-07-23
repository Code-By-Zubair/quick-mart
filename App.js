import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './src/views/Splash/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './src/navigations/Auth_stack';
import SizedBoxView from './src/components/sized_box_view';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" translucent={true} />
      <SizedBoxView height={50} />
      <AuthStackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
