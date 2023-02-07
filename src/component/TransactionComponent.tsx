import { memo, useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { MyColor } from '../colors/Colors';
import { FunctionContext } from '../context/GlobalState';
import { StatusTransactionType } from '../interface/StatusTransactionType';
import { ITransactionItem } from '../interface/TransactionItem';
import TransactionItemStatus from './TransactionItemStatus';

interface TransactionItemProps {
    item: string
    transaction: any
    navigation: any
}

function isSuccess(status: StatusTransactionType) {
    return status === 'SUCCESS'
}

function statusColor(status: StatusTransactionType) {
    return isSuccess(status) ? MyColor.OceanGreen : MyColor.ChineseOrange
}

const TransactionComponent = ({ item, transaction, navigation }: TransactionItemProps) => {
    const { formatDate, formatThousand, formatUpperCase } = useContext<any>(FunctionContext)
    const transactionItem: ITransactionItem = transaction[item]
    const statusColorValue = statusColor(transactionItem.status)

    return (
        <TouchableOpacity
            onPress={() => { navigation.navigate('DetailTransaction', { id: item, data: transactionItem }) }}
            style={[
                styles.containerTransactionItemLeftLine, {
                    backgroundColor: statusColorValue,
                }
            ]}
        >
            <View style={styles.containerTransactionItem}>
                <View style={styles.containerF1}>
                    <Text style={styles.text18B}>{`${formatUpperCase(transactionItem.sender_bank)} ➔ ${formatUpperCase(transactionItem.beneficiary_bank)}`}</Text>
                    <Text style={styles.text14B}>{formatUpperCase(transactionItem.beneficiary_name)}</Text>
                    <Text style={styles.text14B}>{`Rp${formatThousand(transactionItem.amount)} • ${formatDate(transactionItem.created_at)}`}</Text>
                </View>
                <View style={styles.containerStatus}>
                    <TransactionItemStatus status={transactionItem.status} />
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    text14B: {
        fontSize: 14,
        fontWeight: 'bold',
        color: MyColor.Black,
    },
    text18B: {
        fontSize: 18,
        fontWeight: 'bold',
        color: MyColor.Black,
    },
    containerStatus: {
        display: 'flex',
        justifyContent: 'center'
    },
    containerF1: {
        flex: 1,
    },
    containerTransactionItemLeftLine: {
        borderRadius: 4,
        marginVertical: 6,
    },

    containerTransactionItem: {
        backgroundColor: MyColor.White,
        marginLeft: 8,
        borderBottomRightRadius: 4,
        borderTopRightRadius: 4,
        display: 'flex',
        paddingHorizontal: 12,
        paddingVertical: 8,
        flexDirection: 'row'
    },
});


export default memo(TransactionComponent)