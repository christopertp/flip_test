import { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MyColor } from '../colors/Colors'

interface TransactionDetailItemProps {
    title: string;
    text: any;
}

const TransactionDetailItem = ({ title, text }: TransactionDetailItemProps) => {
    return (
        <View style={styles.detailGridItem}>
            <Text style={styles.text18B}>{title}</Text>
            <Text style={styles.text18N}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    detailGridItem: {
        flex: 1,
        flexBasis: 130,
        flexDirection: 'column',
    },
    text18N: {
        fontSize: 18,
        fontWeight: 'normal',
        color: MyColor.Black,
    },
    text18B: {
        fontSize: 18,
        fontWeight: 'bold',
        color: MyColor.Black,
    },
});

export default memo(TransactionDetailItem)