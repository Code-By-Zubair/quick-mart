
import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SizedBoxView from './src/components/sized_box_view';
import AppStackNavigator from './src/navigations/AppStack';
import Toast from 'react-native-toast-message';
import { toastConfig } from './ToastConfig';

export default function App() {

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle='dark-content' backgroundColor={'transparent'} translucent={true} />
      <NavigationContainer>

        <AppStackNavigator />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </View>
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
