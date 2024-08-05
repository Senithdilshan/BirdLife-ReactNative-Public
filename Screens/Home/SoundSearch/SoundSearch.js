import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Button, Alert, Pressable, Text, Animated, Easing } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/styles';
import { AudioFileCovertAndUpload } from '../../../Helpers/AudioFileCovert.helper';
import { AndroidOutputFormat } from 'expo-av/build/Audio';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { saveLocally } from '../../../Helpers/SaveLocally';
import Spinner from 'react-native-loading-spinner-overlay';

const SoundSearch = () => {
    const [recording, setRecording] = useState();
    const borderAnimation = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const [isConverting, setIsConverting] = useState(false);
    const [isPredicting, setIsPredicting] = useState(false);


    const changeConvertState = (state) => {
        setIsConverting(state);
    }

    const changePredictState = (state) => {
        setIsPredicting(state);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            { recording && startAnimation(); }
        }, 3000);

        return () => clearInterval(interval);
    }, [recording]);
    const startAnimation = () => {
        borderAnimation.setValue(0);
        Animated.timing(borderAnimation, {
            toValue: 1,
            duration: 3000,
            easing: Easing.inOut(Easing.circle),
            useNativeDriver: false,
        }).start();
    };

    const stopAnimation = () => {
        Animated.timing(borderAnimation).stop();
        borderAnimation.setValue(0);
    };
    const animatedBorderStyle = {
        backgroundColor: borderAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [Colors.error500, Colors.primary100],
        }),
    };

    const startRecording = async () => {
        try {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Access Denied', 'Permission to access microphone was denied');
                return;
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            // console.log('Starting recording..');
            startAnimation();
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            setRecording(recording);
            // console.log('Recording started');
        } catch (err) {
            Alert.alert('Error', 'Something went wrong');
        }
    }

    const stopRecording = async () => {
        setRecording(undefined);
        stopAnimation();
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync(
            {
                allowsRecordingIOS: false,
            }
        );
        const uri = await recording.getURI();
        const netInfo = await NetInfo.fetch();
        if (!netInfo.isConnected || netInfo.details.strength < 50) {
            let connectedStatus = {
                title: !netInfo.isConnected ? 'Poor Internet Connection' : 'No Internet Connection',
                description: netInfo.isConnected ? 'Your internet connection is not strong enough. Would you like to save the Recording and try again later?' : 'You are not connected to the internet. Would you like to save the Recording and try again later?',
            }
            Alert.alert(
                connectedStatus.title,
                connectedStatus.description,
                [
                    { text: 'No', style: 'cancel' },
                    { text: 'Yes', onPress: () => saveLocally(uri, "audio") }
                ],
                { cancelable: false }
            );
            return;
        } else {
            try {
                const response = await AudioFileCovertAndUpload(uri, changeConvertState, changePredictState);
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
    }

    return (
        <View style={styles.container}>
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
            {recording ? (
                <Animated.View style={[styles.button, animatedBorderStyle]}>
                    <Pressable
                        style={({ pressed }) => [styles.innerButton, pressed && styles.pressed]}
                        onPress={stopRecording}
                    >
                        <Ionicons name={"stop-circle"} color={"white"} size={100} />
                    </Pressable>
                </Animated.View>
            ) : (
                <Animated.View style={[styles.button, animatedBorderStyle]}>
                    <Pressable
                        style={({ pressed }) => [styles.innerButton, pressed && styles.pressed]}
                        onPress={startRecording}
                    >
                        <Ionicons name={"mic"} color={"white"} size={100} />
                    </Pressable>
                </Animated.View>
            )}
        </View>
    );
}

export default SoundSearch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 200,
        height: 200,
        margin: 8,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerButton: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    pressed: {
        opacity: 0.7,
    },
});