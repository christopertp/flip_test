import React, { useState, useEffect, useMemo } from 'react'
import { View, Text, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native'
import RadioButton from '../component/RadioButton'
import TransactionComponent from '../component/TransactionComponent'

import { MyColor } from '../colors/Colors';
import { ITransactionItem } from '../interface/TransactionItem';
import HeaderControls from '../component/HeaderControls'
import useControlEffect from '../hooks/useControlEffect';

export const SORT_BY_DEFAULT = 'URUTKAN';
export const SORT_BY_AZ = 'Nama A-Z';
export const SORT_BY_ZA = 'Nama Z-A';
export const SORT_BY_MOST_RECENT = 'Terbaru';
export const SORT_BY_EARLIEST_DATE = 'Terlama';
export const ENDPOINT_TRANSACTION_LIST = 'https://recruitment-test.flip.id/frontend-test'


function Home(props: any) {
    const [transactions, setTransaction] = useState<any>([])
    const [transactionsModifed, setTransactionsModifed] = useState<any>([])
    const [isVisible, setVisible] = useState(false);
    const [textSearch, setTextSearch] = useState('');
    const [sortByType, setSortByType] = useState<any>(SORT_BY_DEFAULT);

    const LIST_SORT_TYPE = [
        {
            valueData: SORT_BY_DEFAULT,
            valueText: SORT_BY_DEFAULT,
        },
        {
            valueData: SORT_BY_AZ,
            valueText: 'Nama A-Z',
        },
        {
            valueData: SORT_BY_ZA,
            valueText: 'Nama Z-A',
        },
        {
            valueData: SORT_BY_MOST_RECENT,
            valueText: 'Tanggal Terbaru',
        },
        {
            valueData: SORT_BY_EARLIEST_DATE,
            valueText: 'Tanggal Terlama',
        },
    ]

    useEffect(() => {
        getData()
    }, [])

    // custom useEffect for control header
    useControlEffect(applySortBy, sortByType)
    useControlEffect(onSearching, textSearch)

    function getData() {
        fetch(ENDPOINT_TRANSACTION_LIST, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => {
                setTransaction(json)
                setTransactionsModifed(json)
            })
            .catch(error => {
                console.error(error);
            });
    }

    function onSetSortBy(value: string) {
        setSortByType(value)
        setVisible(false)
    }

    function isSortBySelected(value: string) {
        return sortByType === value
    }

    // search transaction by sender bank, beneficiary bank, beneficiary name and amount
    function onSearching(value: string) {
        if (value.length > 1) {
            let alteredTransaction: [] = [];
            Object.keys(transactions).filter(function (key) {
                return (
                    transactions[key].beneficiary_bank.toLowerCase().includes(value.toLowerCase())
                    || transactions[key].sender_bank.toLowerCase().includes(value.toLowerCase())
                    || transactions[key].beneficiary_name.toLowerCase().includes(value.toLowerCase())
                    || transactions[key].amount.toString().includes(value.toLowerCase())
                )
            })
                .map((objKey) => {
                    alteredTransaction = {
                        ...alteredTransaction,
                        [objKey]: { ...transactions[objKey] }
                    }
                }, {});


            setTransactionsModifed(alteredTransaction);
        } else {
            setTransactionsModifed(transactions)
        }
    }

    // modified list to corresponding sort value
    function applySortBy(sortByValue: String) {
        const copyOfTransaction: { [key: string]: ITransactionItem } = transactions
        switch (sortByValue) {
            case SORT_BY_DEFAULT: {
                setTransactionsModifed(copyOfTransaction)
                break;
            }
            case SORT_BY_AZ: {
                let alteredTransaction: [] = [];
                Object.keys(copyOfTransaction).sort(function (a, b) {
                    let x = copyOfTransaction[a].beneficiary_name.toLowerCase();
                    let y = copyOfTransaction[b].beneficiary_name.toLowerCase();
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                })
                    .map((objKey) => {
                        alteredTransaction = {
                            ...alteredTransaction,
                            [objKey]: { ...copyOfTransaction[objKey] }
                        }
                    }, {});

                setTransactionsModifed(alteredTransaction);
                break;
            }
            case SORT_BY_ZA: {
                let alteredTransaction: [] = [];
                Object.keys(copyOfTransaction).sort(function (a, b) {
                    let x = copyOfTransaction[a].beneficiary_name.toLowerCase();
                    let y = copyOfTransaction[b].beneficiary_name.toLowerCase();
                    if (x > y) { return -1; }
                    if (x < y) { return 1; }
                    return 0;
                })
                    .map((objKey) => {
                        alteredTransaction = {
                            ...alteredTransaction,
                            [objKey]: { ...copyOfTransaction[objKey] }
                        }
                    }, {});
                setTransactionsModifed(alteredTransaction)
                break;
            }
            case SORT_BY_EARLIEST_DATE: {
                let alteredTransaction: [] = [];
                const temp = Object.keys(copyOfTransaction).sort(function (a, b) {
                    let x = Date.parse(copyOfTransaction[a].created_at);
                    let y = Date.parse(copyOfTransaction[b].created_at);
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                })
                    .map((objKey) => {
                        alteredTransaction = {
                            ...alteredTransaction,
                            [objKey]: { ...copyOfTransaction[objKey] }
                        }
                    }, {});

                setTransactionsModifed(alteredTransaction)
                break;
            }
            case SORT_BY_MOST_RECENT: {
                let alteredTransaction: [] = [];
                Object.keys(copyOfTransaction).sort(function (a, b) {
                    let x = Date.parse(copyOfTransaction[a].created_at);
                    let y = Date.parse(copyOfTransaction[b].created_at);
                    if (x > y) { return -1; }
                    if (x < y) { return 1; }
                    return 0;
                })
                    .map((objKey) => {
                        alteredTransaction = {
                            ...alteredTransaction,
                            [objKey]: { ...copyOfTransaction[objKey] }
                        }
                    }, {});

                setTransactionsModifed(alteredTransaction)
                break;
            }
        }
    }

    const renderEmptyContainer = useMemo(() => {
        return (
            <View style={styles.containerEmptyList}>
                <Text style={styles.text20NQS}>Transaksi Kosong</Text>
            </View>
        )
    }, [])

    return (
        <View style={styles.wrapperTransactions}>
            <HeaderControls sortByType={sortByType} setVisible={setVisible} textSearch={textSearch} setTextSearch={setTextSearch} />
            <FlatList
                data={Object.keys(transactionsModifed)}
                style={styles.containerList}
                ListEmptyComponent={renderEmptyContainer}
                renderItem={({ item }) => (<TransactionComponent item={item} transaction={transactionsModifed} navigation={props.navigation} />)}
            >
            </FlatList>
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={isVisible}
                onRequestClose={() => { setVisible(false) }}>
                <TouchableOpacity
                    style={styles.wrapperOptions}
                    activeOpacity={1}
                    onPressOut={() => { setVisible(false) }}
                >
                    <View style={styles.containerRadioItems}>
                        {
                            LIST_SORT_TYPE.map(option => {
                                return (
                                    <RadioButton
                                        onPress={() => { onSetSortBy(option.valueData) }}
                                        selected={isSortBySelected(option.valueData)}
                                        key={option.valueData}
                                    >
                                        <Text style={styles.text20N}>{option.valueText}</Text>
                                    </RadioButton>
                                )
                            })
                        }
                    </View>
                </TouchableOpacity>
            </Modal>
        </View >
    );
}

const styles = StyleSheet.create({
    text20N: {
        fontSize: 20,
        fontWeight: 'normal',
        color: MyColor.Black,
    },
    text20NQS: {
        fontSize: 20,
        fontWeight: 'normal',
        color: MyColor.QuickSilver,
    },
    wrapperTransactions: {
        backgroundColor: MyColor.MintCream,
        flex: 1,
    },
    containerList: {
        paddingHorizontal: 6
    },
    containerRadioItems: {
        backgroundColor: MyColor.White,
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingVertical: 18,
        borderRadius: 8,
        elevation: 1,
    },
    wrapperOptions: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: MyColor.Black6,
    },
    containerEmptyList: {
        flex: 1,
        paddingVertical: "60%",
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default Home;