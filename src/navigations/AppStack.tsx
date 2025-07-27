

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthStackNavigator from './Auth_stack';



const AppStack = createNativeStackNavigator();
const AppStackNavigator = () => {
    return (
        <AppStack.Navigator id={undefined}>
            <AppStack.Screen
                name='AuthStack' component={AuthStackNavigator} options={{ headerShown: false }} />
            <AppStack.Screen
                name='Home' component={View} options={{ headerShown: false }} />
        </AppStack.Navigator>
    )
}


export default AppStackNavigator
const styles = StyleSheet.create({})