import { Alert, Image, Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageIcon from '../../assets/Images/imageIcon.png'
import AudioIcon from '../../assets/Images/audioIcon.png'
import Button from '../UI/Buttons/Button'
import SaveButton from '../UI/Buttons/SaveBtn'
import { Colors } from '../../constants/styles'
import IconButton from '../UI/Buttons/IconButton'
import NetInfo from '@react-native-community/netinfo';

const SaveCard = ({ date, file, fileType, location, id, deleteRecord, checkRecord }) => {
    const onCheck = async () => {
        const netInfo = await NetInfo.fetch();
        if (!netInfo.isConnected || netInfo.details.strength < 50) {
            Alert.alert("No Internet Connection", "Please check your internet connection and try again");
            return;
        }
        await checkRecord(file);
    }
    const openMap = () => {
        const { lat, lng } = location;
        const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }
    const onDelete = async () => {
        await deleteRecord(id);
    }
    return (
        <View style={styles.root}>
            <View style={styles.dateContainer}>
                <Text style={styles.date}>{date}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Image source={fileType === 'image' ? { uri: file } : AudioIcon} style={styles.image} />
                <SaveButton onPress={onCheck} color={Colors.primary100} width={90}>Check</SaveButton>
                <SaveButton onPress={openMap} color={Colors.primary100} width={90}><IconButton color={Colors.error500} icon={"location"} size={32} onPress={openMap} /></SaveButton>
                <SaveButton onPress={onDelete} color={Colors.error500} width={47}><IconButton color={"white"} icon={"trash-bin"} size={24} onPress={onDelete} /></SaveButton>
            </View>
        </View>
    )
}

export default SaveCard

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 32,
        paddingHorizontal: 10,
        minWidth: '100%',
        marginVertical: 10,
    },
    dateContainer: {
        marginBottom: 10,
    },
    date: {
        color: 'gray',
        fontSize: 16,
        fontWeight: 'bold'
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 24,
    }
})