

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppColors from '../constants/App_colors';

// props for the button
interface AppButtonProps {
    title: string;
    onPress: () => void;
}

const AppButton = ({ title, onPress }: AppButtonProps) => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.onboardButton} onPress={onPress}>
            <Text style={styles.titleText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default AppButton

const styles = StyleSheet.create({
    onboardButton: {
        height: 60,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: AppColors.secondary,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    titleText: {
        color: AppColors.white,
        fontSize: 14,
        fontWeight: '600',
    }
})