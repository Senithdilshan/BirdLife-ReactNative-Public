import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BirdDetailSubtitles = ({ children }) => {
    return (
        <View style={styles.root}>
            <Text style={styles.text}>{children}</Text>
        </View>
    )
}

export default BirdDetailSubtitles

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
    },
    text: {
        paddingLeft: 5,
        fontSize: 20,
        fontWeight: "bold",

    }
})