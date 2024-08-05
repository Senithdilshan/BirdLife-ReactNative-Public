import { Alert, FlatList, Keyboard, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Search from '../../../components/Search/Search'
import BirdSearchCard from '../../../components/BirdSearchCard/BirdSearchCard'
import Nodata from '../../../components/NoData/Nodata'
import { SearchBird } from '../../../util/SearchBirdAPI'
import { useNavigation, useRoute } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import NoData from '../../../assets/Images/NoData.png'

const NameSearch = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [birdData, setBirdData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [apiTextValue, setapiTextValue] = useState(null)

    useEffect(() => {
        const checkParams = async () => {
            if (route?.params?.name) {
                setapiTextValue(route?.params?.name);
                await getbirdData(route?.params?.name);
            } else {
                setapiTextValue(null);
            }
        }
        checkParams();
    }, [route, getbirdData])

    const onChangeSearch = async () => {
        setBirdData([]);
    }
    const getbirdData = async (event) => {
        setIsLoading(true);
        Keyboard.dismiss();
        if (event.length === 0) {
            ToastAndroid.show('Please provide a search term to proceed.', ToastAndroid.SHORT);
        } else {
            try {
                const BirdsData = await SearchBird(event);
                if (BirdsData.length === 0) {
                    if (route?.params?.nameFound) {
                        Alert.alert("Success", `Bird identified: ${route?.params?.name}. We couldn't find additional details.`)
                    } else {
                        ToastAndroid.show('No exact match found!', ToastAndroid.SHORT);
                    }
                } else {
                    setBirdData(BirdsData);
                    ToastAndroid.show('Results retrieved successfully !', ToastAndroid.SHORT);
                }
            } catch (error) {
                ToastAndroid.show('Failed to retrieve data !', ToastAndroid.SHORT);
            }
        }
        setIsLoading(false);
    }
    const onSearch = async (event) => {
        getbirdData(event);
    }
    const renderSearchBirdItem = (itemData) => {
        const item = itemData?.item;
        const onClickCard = () => {
            navigation.navigate('BirdDetails', item);
        }
        return <BirdSearchCard {...item} onPress={onClickCard} />
    }
    return (
        <View style={styles.root}>
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View>
                <Search onSearch={onSearch} onChangeSearch={onChangeSearch} apiTextValue={apiTextValue} />
            </View>
            {birdData.length != 0 ?
                <View style={styles.flatlist}>
                    <FlatList data={birdData} keyExtractor={(item) => item?.name}
                        renderItem={renderSearchBirdItem}
                    />
                </View>
                :
                <Nodata source={NoData} text={'Search Your Bird Here'} />
            }

        </View>
    )
}

export default NameSearch

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    flatlist: {
        flex: 1
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
})