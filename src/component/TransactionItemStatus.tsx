import { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MyColor } from '../colors/Colors'

interface StatusProps {
    status: string;
}

function isSuccess(status: string) {
    return status === 'SUCCESS'
}

const TransactionItemStatus = ({ status }: StatusProps) => {
    if (isSuccess(status)) {
        return (
            <View style={styles.containerStatusSuccess}>
                <Text style={styles.text12BW}>Berhasil</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.containerStatusPending}>
                <Text style={styles.text12B}>Pengecekan</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text12BW: {
        fontSize: 12,
        fontWeight: 'bold',
        color: MyColor.White,
    },
    text12B: {
        fontSize: 12,
        fontWeight: 'bold',
        color: MyColor.Black,
    },
    containerStatusSuccess: {
        backgroundColor: MyColor.OceanGreen,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 8,
    },
    containerStatusPending: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: MyColor.ChineseOrange,
    },
});

export default memo(TransactionItemStatus)