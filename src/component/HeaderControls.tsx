import { memo } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown'
import { MyColor } from '../colors/Colors'

export const SEARCH_PLACEHOLDER = "Cari nama, bank, atau nominal"

interface HeaderControlsProps {
    sortByType: any
    setVisible: any
    textSearch: any
    setTextSearch: any
}

const HeaderControls = ({ sortByType, setVisible, textSearch, setTextSearch }: HeaderControlsProps) => {
    return (
        <View style={styles.containerHeaderControls}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color={MyColor.QuickSilver} />
            <TextInput
                style={styles.containerTextSearch}
                placeholder={SEARCH_PLACEHOLDER}
                onChangeText={newText => setTextSearch(newText)}
                defaultValue={textSearch}
            ></TextInput>

            <TouchableOpacity onPress={() => setVisible(true)} style={styles.containerSortBy}>
                <Text style={styles.textSortBy}>{sortByType}</Text>
                <FontAwesomeIcon icon={faAngleDown} size={20} color={MyColor.ChineseOrange} />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    containerHeaderControls: {
        backgroundColor: MyColor.White,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 6,
        marginHorizontal: 6,
        marginVertical: 6,
    },
    containerTextSearch: {
        height: 40,
        flex: 1,
        marginHorizontal: 4,
    },
    containerSortBy: {
        paddingHorizontal: 2,
        paddingVertical: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textSortBy: {
        fontWeight:'bold',
        color: MyColor.ChineseOrange,
    }
});

export default memo(HeaderControls)