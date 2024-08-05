import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants/styles'
import { Ionicons } from '@expo/vector-icons';
const SearchButton = ({ onPress, searchInput }) => {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={() => onPress(searchInput)}
        >
            <View style={styles.buttonIcon}>
                <Ionicons name='search' color={Colors.secondary500} size={28} />
            </View>
        </Pressable>
    )
}

export default SearchButton

const styles = StyleSheet.create({
    button: {
        marginLeft: 2,
        width: 60,
        height: 60,
        backgroundColor: Colors.primary100,
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
        borderColor: Colors.primary800
    },
    pressed: {
        opacity: 0.7,
    },
    buttonIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,

    },
})