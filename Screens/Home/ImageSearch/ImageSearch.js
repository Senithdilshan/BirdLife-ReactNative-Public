import { Alert, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import Button from '../../../components/UI/Buttons/Button';
import FASIconButton from '../../../components/UI/Buttons/FASIconButton';
import { launchCameraAsync, useCameraPermissions, PermissionStatus, launchImageLibraryAsync, useMediaLibraryPermissions } from 'expo-image-picker';
import { convertToBase64 } from '../../../Helpers/Base64Convert.helper';
import { birdV2Api } from '../../../util/BirdImagesAPI';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay'
import NetInfo from '@react-native-community/netinfo';
import { saveLocally } from '../../../Helpers/SaveLocally';
const ImageSearch = () => {
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [meadiaLibraryPermissionInformation, requestMeadiaLibraryPermission] = useMediaLibraryPermissions();

    const [pickedImage, setPickedImage] = useState();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    const verifyPermission = async () => {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionresponse = await requestPermission();
            return permissionresponse.granted;
        }
        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            const permissionresponse = await requestPermission();
            if (permissionresponse.status === PermissionStatus.DENIED) {
                Alert.alert('Insufficient Permissions!',
                    'You Need to grant camera permissions to use this feature.');
                return false;
            } else {
                return permissionresponse.granted;
            }

        }
        return true;
    }

    const verifyLibraryPermission = async () => {
        if (meadiaLibraryPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionresponse = await requestMeadiaLibraryPermission();
            return permissionresponse.granted;
        }
        if (meadiaLibraryPermissionInformation.status === PermissionStatus.DENIED) {
            const permissionresponse = await requestMeadiaLibraryPermission();
            if (permissionresponse.status === PermissionStatus.DENIED) {
                Alert.alert('Insufficient Permissions!',
                    'You Need to grant camera permissions to use this feature.');
                return false;
            } else {
                return permissionresponse.granted;
            }

        }
        return true;
    }
    const takeImageHandler = async () => {
        const hasPermisson = await verifyPermission();
        if (!hasPermisson) {
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        if (!image.canceled) {
            const netInfo = await NetInfo.fetch();
            if (!netInfo.isConnected || netInfo.details.strength < 50) {
                let connectedStatus = {
                    title: !netInfo.isConnected ? 'Poor Internet Connection' : 'No Internet Connection',
                    description: netInfo.isConnected ? 'Your internet connection is not strong enough. Would you like to save the image and try again later?' : 'You are not connected to the internet. Would you like to save the image and try again later?',
                }
                Alert.alert(
                    connectedStatus.title,
                    connectedStatus.description,
                    [
                        { text: 'No', style: 'cancel' },
                        { text: 'Yes', onPress: () => saveLocally(image.assets[0].uri, "image") }
                    ],
                    { cancelable: false }
                );
                return;
            }
            setPickedImage(image.assets[0].uri);
            setIsLoading(true);
            const base64 = await convertToBase64(image.assets[0].uri)
            const BirdName = await birdV2Api(base64);
            if (BirdName == null) {
                ToastAndroid.show('No exact match found!', ToastAndroid.SHORT);
            } else {
                const item = {
                    name: BirdName.split('-') // Split the string by hyphen
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                        .join(' '), // Join the words with spaces
                    nameFound: true
                }
                navigation.navigate('NameSearch', item);
            }
        }
        setIsLoading(false);
    }
    const selectImageHandler = async () => {
        const hasPermisson = await verifyLibraryPermission();
        if (!hasPermisson) {
            return;
        }
        const image = await launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.5,
        });
        if (!image.canceled) {
            const netInfo = await NetInfo.fetch();
            if (!netInfo.isConnected || netInfo.details.strength < 50) {
                let connectedStatus = {
                    title: !netInfo.isConnected ? 'Poor Internet Connection' : 'No Internet Connection',
                    description: netInfo.isConnected ? 'Your internet connection is not strong enough. Would you like to save the image and try again later?' : 'You are not connected to the internet. Would you like to save the image and try again later?',
                }
                Alert.alert(
                    connectedStatus.title,
                    connectedStatus.description,
                    [
                        { text: 'No', style: 'cancel' },
                        { text: 'Yes', onPress: () => saveLocally(image.assets[0].uri, "image") }
                    ],
                    { cancelable: false }
                );
                return;
            }
            setPickedImage(image.assets[0].uri);
            setIsLoading(true);
            const base64 = await convertToBase64(image.assets[0].uri)
            const BirdName = await birdV2Api(base64);
            if (BirdName == null) {
                ToastAndroid.show('No exact match found!', ToastAndroid.SHORT);
            } else {
                const item = {
                    name: BirdName.split('-') // Split the string by hyphen
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                        .join(' '), // Join the words with spaces
                    nameFound: true
                }
                navigation.navigate('NameSearch', item);
            }
        }
        setIsLoading(false);
    }
    return (
        <View style={styles.root}>
            <Spinner
                visible={isLoading}
                textStyle={styles.spinnerTextStyle}
            />
            <Button onPress={selectImageHandler}
            >Choose Image  <FASIconButton color={"white"} icon={"file-upload"} size={24} /></Button>
            <Text style={styles.text}>OR</Text>
            <Button onPress={takeImageHandler}
            >Open Camera  <FASIconButton color={"white"} icon={"camera"} size={24} />
            </Button>
        </View>
    )
}

export default ImageSearch;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'gray'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
})