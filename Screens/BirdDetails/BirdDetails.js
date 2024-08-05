import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import birdSearchImage from '../../assets/Images/BirdSearch.jpeg'
import AllBirdDetails from '../../components/AllBirdDetails/AllBirdDetails';
import { GetBirdImageBySearchPexals } from '../../util/SearchBirdAPI';
import Spinner from 'react-native-loading-spinner-overlay';
import FullScreenImageModal from '../../components/Modals/FullScreenImageModal';

const BirdDetails = ({ route, navigation }) => {
    const BirdDetails = route.params;
    const [birdPhotoUrl, setBirdPhotoUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const getImageUrl = async () => {
            const url = await GetBirdImageBySearchPexals(BirdDetails.name);
            setBirdPhotoUrl(url);
            setIsLoading(false);
        }
        getImageUrl();
    }, [])

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    return (
        <View style={styles.root}>
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <Pressable onPress={toggleModal} style={styles.imageContainer}>
                <Image source={birdPhotoUrl ? { uri: birdPhotoUrl } : birdSearchImage} style={styles.image} />
                <Text style={styles.birdName}>{BirdDetails.name}</Text>
            </Pressable>
            <FullScreenImageModal isVisible={isModalVisible} onClose={toggleModal} imageUrl={birdPhotoUrl} />
            <View style={styles.scroll}>
                <AllBirdDetails birdDetails={BirdDetails} />
            </View>
        </View>
    )
}

export default BirdDetails;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20
    },
    scroll: {
        flex: 1
    },
    imageContainer: {
        alignItems: "center",
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderColor: 'white',
        borderWidth: 1
    },
    birdName: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
})