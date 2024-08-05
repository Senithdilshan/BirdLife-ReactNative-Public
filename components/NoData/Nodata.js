import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/styles'

const Nodata = ({ source, text }) => {
    return (
        <View style={styles.noDataTextContainer}>
            <Image source={source} style={styles.nodataImage} />
            <Text style={styles.nodataText}>{text}</Text>
        </View>
    )
}

export default Nodata

const styles = StyleSheet.create({
    noDataTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5
    },
    nodataImage: {
        width: 200,
        height: 200,
    },
    indoText: {
        color: Colors.primary500,
        fontSize: 16,
        alignItems: 'center',
        marginTop: 32,
        textAlign: 'center'

    }
})