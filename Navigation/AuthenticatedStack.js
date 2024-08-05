import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BirdDetails from '../Screens/BirdDetails/BirdDetails';
import { Colors } from '../constants/styles';
import AuthenticatedBottomTab from './AuthenticatedBottomTab';
const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen name='BottomTab' component={AuthenticatedBottomTab} options={{ headerShown: false }} />
            <Stack.Screen name="BirdDetails" component={BirdDetails} options={{
                title: 'Bird Details',
            }} />
        </Stack.Navigator>
    )
}

export default AuthenticatedStack;