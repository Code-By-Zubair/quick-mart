import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SizedBoxView from './src/components/sized_box_view';
import AppStackNavigator from './src/navigations/AppStack';
import Toast from 'react-native-toast-message';
import { toastConfig } from './ToastConfig';

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar style="auto" translucent={true} />
      <SizedBoxView height={50} />
      <AppStackNavigator />
      <Toast config={toastConfig} />
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
