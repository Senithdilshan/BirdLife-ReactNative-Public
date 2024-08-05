import moment from "moment";
import * as Location from 'expo-location';
import { Alert } from "react-native";
import { insertBird } from "../util/SQLite.Database";
import { BirdData } from "../Models/BirdData";

export const saveLocally = async (data, type) => {
    let location;

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
    }

    const deviceLocation = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = deviceLocation.coords;
    location = { lat: latitude, lng: longitude };
    const date = moment().format('YYYY-MMM-DD HH:mm');
    const birdDetails = new BirdData(date, data, type, location);
    try {
        await insertBird(birdDetails);
        // console.log(birdDetails);
        Alert.alert('Success', 'Bird details saved sucessfully!');
    } catch (error) {
        Alert.alert('Error', "Something went wrong");
    }
}