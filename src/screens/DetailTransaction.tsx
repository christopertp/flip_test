import React, { useContext, } from 'react'
import { View, Text, TouchableOpacity, Clipboard, Alert, StyleSheet } from 'react-native'
import { FunctionContext } from '../context/GlobalState';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClone } from '@fortawesome/free-regular-svg-icons/faClone'

import { ITransactionItem } from '../interface/TransactionItem';
import { MyColor } from '../colors/Colors';
import TransactionDetailItem from '../component/TransactionDetailItem';


function DetailTransaction(props: any) {
    const { formatDate, formatThousand, formatUpperCase } = useContext<any>(FunctionContext)
    const { id, data } = props.route.params
    const transactionData: ITransactionItem = data

    function copyTransactionIDToClipboard(text: string) {
        Alert.alert('Transaction ID Copied', `Transaction ID : ${text}`,);
        Clipboard.setString(text);
    };


    return (
        <View style={styles.wrapperTransactionDetail}>
            <View style={styles.containerTransactionID}>
                <Text style={styles.textIDTransaction}>ID TRANSAKSI: #{id}</Text>
                <TouchableOpacity onPress={() => { copyTransactionIDToClipboard(id) }}  >
                    <FontAwesomeIcon icon={faClone} size={20} color={MyColor.ChineseOrange} />
                </TouchableOpacity>

            </View>
            <View style={styles.containerTransaction}>
                <Text style={styles.textTransaction}>DETAIL TRANSAKSI</Text>
                <TouchableOpacity onPress={() => { props.navigation.pop() }} style={styles.containerClose}>
                    <Text style={styles.textClose}>Tutup</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerBank}>
                <Text style={styles.textBank}>{`${formatUpperCase(transactionData.sender_bank)} ➔ ${formatUpperCase(transactionData.beneficiary_bank)}`}</Text>
                <View style={styles.containerTransactionDetail}>

                    <TransactionDetailItem title={formatUpperCase(transactionData.beneficiary_name)} text={transactionData.account_number} />
                    <TransactionDetailItem title={'NOMINAL'} text={`Rp${formatThousand(transactionData.amount)}`} />
                    <TransactionDetailItem title={'BERITA TRANSFER'} text={transactionData.remark} />
                    <TransactionDetailItem title={'KODE UNIK'} text={transactionData.unique_code} />
                    <TransactionDetailItem title={'WAKTU DIBUAT'} text={`${formatDate(transactionData.created_at)}`} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    textBank: {
        fontSize: 18,
        fontWeight: 'bold',
        color: MyColor.Black,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    containerBank: {
        backgroundColor: MyColor.White,
        borderColor: MyColor.BrightGray,
        borderTopWidth: 2,
    },
    containerTransactionDetail: {
        flex: 1,
        flexGrow: 2,
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        columnGap: 8,
        rowGap: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        display: 'flex',
        minHeight: 200,
        backgroundColor: MyColor.White
    },
    textClose: {
        fontSize: 16,
        fontWeight: 'bold',
        color: MyColor.ChineseOrange,
    },
    containerTransaction: {
        backgroundColor: MyColor.White,
        flexDirection: 'row',
        borderColor: MyColor.AntiFlashWhite,
        borderTopWidth: 1,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textTransaction: {
        fontSize: 16,
        fontWeight: 'bold',
        color: MyColor.Black,
    },
    textIDTransaction: {
        fontSize: 16,
        fontWeight: 'bold',
        color: MyColor.Black,
        paddingVertical: 16,
        marginRight: 4,
    },
    containerTransactionID: {
        backgroundColor: MyColor.White,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    wrapperTransactionDetail: {
        backgroundColor: MyColor.MintCream
    },
    containerClose: {
        paddingHorizontal: 18,
        paddingVertical: 18
    }
});

export default DetailTransaction;