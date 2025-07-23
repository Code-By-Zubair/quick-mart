
import { Dimensions, GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppColors from '../constants/App_colors';
import { AppAssets } from '../assets/app_assets';
import { AppSvgs } from '../assets/app_svgs';

// prop for item
interface OnboardCardProps {
    item: {
        image: any;
        heading: string;
        description: string;
    };
    currentPage: number;
    handlePrevFunc: CallableFunction;
    skipFunc?: CallableFunction;

}

const OnboardCard = ({ item, currentPage, handlePrevFunc, skipFunc }: OnboardCardProps) => {
    const { width } = Dimensions.get('window');
    return (
        <View style={{ width: width }} >
            <View style={styles.imageBgContainer}>
                <View style={styles.logoSkipView}>
                    {currentPage === 0 ? <Image style={styles.logo}
                        source={AppAssets.logo}
                    /> : <TouchableOpacity activeOpacity={0.5} onPress={() => handlePrevFunc()}>
                        <AppSvgs.ArrowBack />
                    </TouchableOpacity>}
                    {currentPage != 2 && <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => skipFunc}>
                        <Text style={styles.skipText}>
                            Skip
                        </Text>
                    </TouchableOpacity>}

                </View>
                <Image style={styles.onboardImg}
                    source={item.image}
                ></Image>
            </View>
            <Text style={styles.onboardHeading}>{item.heading}</Text>
            <Text style={styles.onboardDesc}>{item.description}</Text>

        </View>
    )
}

export default OnboardCard

const styles = StyleSheet.create({
    logoSkipView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    logo: {
        width: 110,
        resizeMode: 'contain',
        height: 32,
    },
    skipText: {
        color: AppColors.primary,
        fontSize: 14,
        fontWeight: '500',
    },
    imageBgContainer: {
        width: '90%',
        backgroundColor: AppColors.primary50,
        paddingTop: 20,
        paddingHorizontal: 18,
        alignSelf: 'center',
        borderRadius: 32,
        marginBottom: 24,
    },
    onboardImg: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    onboardHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: AppColors.secondary,
        width: '85%',
        textAlign: 'center',
        alignSelf: 'center',
        marginBottom: 16,
    },
    onboardDesc: {
        fontSize: 14,
        fontWeight: '400',
        color: AppColors.grey150,
        width: '85%',
        textAlign: 'center',
        alignSelf: 'center',
        marginBottom: 24,
    },


})