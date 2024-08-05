import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FASIconButton from '../UI/Buttons/FASIconButton'

const BirdLocation = ({ location }) => {
    return (

        <View style={styles.root}>
            <FASIconButton icon={"angle-right"} size={10} color={"white"} />
            <Text style={styles.text}>{location}</Text>
        </View>
    )
}

export default BirdLocation

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        paddingLeft: 20
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold'
    }
})