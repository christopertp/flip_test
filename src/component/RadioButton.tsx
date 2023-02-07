import { memo } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { MyColor } from '../colors/Colors';

interface RadioProps {
    onPress: any;
    selected: boolean;
    children: any;
}

const RadioButton = ({ onPress, selected, children }: RadioProps) => {
    return (
        <View style={styles.radioButtonContainer}>
            <TouchableOpacity onPress={onPress} style={styles.radioButton}>
                {selected ? <View style={styles.radioButtonIcon} /> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.radioButtonText}>{children}</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    radioButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5
    },
    radioButton: {
        height: 30,
        width: 30,
        marginVertical: 8,
        backgroundColor: MyColor.White,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: MyColor.TerraCotta,
        alignItems: "center",
        justifyContent: "center"
    },
    radioButtonIcon: {
        height: 15,
        width: 15,
        borderRadius: 10,
        backgroundColor: MyColor.TerraCotta,
    },
    radioButtonText: {
        fontSize: 16,
        marginLeft: 16
    },
});




export default memo(RadioButton);