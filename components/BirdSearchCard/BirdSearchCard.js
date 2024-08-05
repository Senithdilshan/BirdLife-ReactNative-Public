import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/styles';
import { birdsMockData } from '../../constants/MockData';
import birdSearchImage from '../../assets/Images/BirdSearch.jpeg'
const BirdSearchCard = ({ onPress, name }) => {
    return (
        <Pressable
            android_ripple={{ color: '#ccc' }}
            style={({ pressed }) => [styles.root, pressed && styles.pressed]}
            onPress={onPress}
        >
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <Image source={birdSearchImage} style={styles.image} />
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{name}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default BirdSearchCard;

const styles = StyleSheet.create({
    root: {
        margin: 5,
        width: 320,
        borderRadius: 8,
        backgroundColor: Colors.primary100,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.35,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 16,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    pressed: {
        // opacity: 0.7,
    },
    container: {
        padding: 20
    },
    innerContainer: {
        flexDirection: 'row'
    },
    image: {
        width: 75,
        height: 75
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    title: {
        color: Colors.secondary500,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        margin: 8,
    },
})