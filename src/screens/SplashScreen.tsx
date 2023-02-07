import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { StackActions } from '@react-navigation/native';
import { MyColor } from '../colors/Colors';

function SplashScreen(props: any) {
    useEffect(() => {
        setTimeout(() => {
            props.navigation.dispatch(StackActions.replace('Home'));
        }, 3000);
    }, [])


    return (
        <View style={styles.wrapperSplash}>
            <View style={styles.containerSplash}>
                <Text style={styles.h1}>FLIP</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 36,
        fontWeight: 'bold',
        letterSpacing:6,
        color: MyColor.White,
    },
    wrapperSplash: {
        flex: 1,
    },
    containerSplash: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: MyColor.ChineseOrange
    }
});

export default SplashScreen;