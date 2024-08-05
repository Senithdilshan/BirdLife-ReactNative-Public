import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Nodata from '../../../components/NoData/Nodata'
import Paper from '../../../assets/Images/paper.png'
import { deleteBirdById, fetchBirds } from '../../../util/SQLite.Database'
import Spinner from 'react-native-loading-spinner-overlay'
import SaveCard from '../../../components/SaveCard/SaveCard'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { convertToBase64 } from '../../../Helpers/Base64Convert.helper'
import { birdV2Api } from '../../../util/BirdImagesAPI'
import { AudioFileCovertAndUpload } from '../../../Helpers/AudioFileCovert.helper'

const SaveLater = () => {
    const [birdData, setBirdData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const [isConverting, setIsConverting] = useState(false);
    const [isPredicting, setIsPredicting] = useState(false);


    const changeConvertState = (state) => {
        setIsConverting(state);
    }

    const changePredictState = (state) => {
        setIsPredicting(state);
    }

    useFocusEffect(
        React.useCallback(() => {
            const getData = async () => {
                setIsLoading(true);
                try {
                    const data = await fetchBirds();
                    setBirdData(data);
                    // console.log(data);
                } catch (error) {
                    console.log(error);
                }
                setIsLoading(false);
            };

            getData();

            return () => {
                setBirdData([]);
            };
        }, [])
    );

    const deleteRecord = async (id) => {
        Alert.alert(
            'Warning !!',
            'Are you sure you want to delete this record?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            await deleteBirdById(id);
                            setBirdData(birdData.filter((data) => data.id !== id));
                        } catch (error) {
                            Alert.alert('Error', "Something went wrong");
                        }
                    },
                },
            ],
            { cancelable: false },
        )

    }

    const searchImage = async (data) => {
        setIsLoading(true);
        const base64 = await convertToBase64(data);
        const BirdName = await birdV2Api(base64);
        if (BirdName == null) {
            ToastAndroid.show('No exact match found!', ToastAndroid.SHORT);
        } else {
            const item = {
                name: BirdName.split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' '),
                nameFound: true
            }
            navigation.navigate('NameSearch', item);
        }
        setIsLoading(false);
    }

    const searchAudio = async (data) => {
        try {
            const response = await AudioFileCovertAndUpload(data, changeConvertState, changePredictState);
            if (response !== null) {
                const item = {
                    name: response,
                    nameFound: true
                }
                navigation.navigate('NameSearch', item);
            } else {
                Alert.alert('Error', 'Bird sound not clear enough to Predict');
            }
        } catch (error) {
            Alert.alert('Error', "Something went wrong");
        }
    }


    const renderCard = (itemData) => {
        const data = itemData?.item;
        return (
            <SaveCard
                date={data.date}
                file={data.file}
                fileType={data.fileType}
                location={data.location}
                deleteRecord={deleteRecord} id={data.id}
                checkRecord={data.fileType === 'image' ? searchImage : searchAudio}
            />
        )
    }
    return (
        <View style={styles.root}>
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <Spinner
                visible={isPredicting}
                textContent={'Predicting...'}
                textStyle={{ color: '#FFF' }}
            />
            <Spinner
                visible={isConverting}
                textContent={'Converting...'}
                textStyle={{ color: '#FFF' }}
            />
            {(!isLoading && birdData.length === 0) && <Nodata source={Paper} text={'No Saved Data found'} />}
            {birdData.length != 0 &&
                <View style={styles.card}>
                    <FlatList data={birdData} keyExtractor={(item) => item?.id}
                        renderItem={renderCard}
                    />
                </View>}
        </View>
    )
}

export default SaveLater

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    card: {
        flex: 1,
        marginHorizontal: 10,
    }
})

