import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/styles'

const BirdSubDetails = ({ name, details, type }) => {
    return (
        <>
            <View style={[styles.subDetails, { flexDirection: type }]}>
                <View style={type === 'row' ? styles.nameContainer : styles.colNameContainer}>
                    <Text style={styles.textName}>{name}</Text>
                </View>
                {
                    type === 'row' &&
                    <View>
                        <Text style={styles.textName}>{" : "}</Text>
                    </View>
                }
                <View>
                    <Text style={type === 'row' ? styles.textDetail : styles.colTextDetail}>{details}</Text>
                </View>
            </View>
        </>
    )
}

export default BirdSubDetails

const styles = StyleSheet.create({
    subDetails: {
        paddingLeft: 40
    },
    nameContainer: {
        flexDirection: 'row',
        width: 125
    },
    colNameContainer: {
        flexDirection: 'row',
    },
    detailContainer: {},
    textName: {
        fontSize: 15,
        color: Colors.secondary500,
        fontWeight: 'bold'
    },
    textDetail: {
        paddingLeft: 5,
        fontSize: 15,
        fontWeight: 'bold'
    },
    colTextDetail: {
        fontSize: 15,
        fontWeight: 'bold'
    },
})