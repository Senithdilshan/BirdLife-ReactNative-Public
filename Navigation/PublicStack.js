import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/Login/LoginScreen';
import { Colors } from '../constants/styles';
import SignupScreen from '../Screens/SignUp/SignupScreen';
import { Text } from 'react-native';
import { View } from 'react-native';
const Stack = createNativeStackNavigator();

const PublicStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} options={{
                headerTitle: () => <View style={{ flex: 1, alignItems: 'center', marginRight: 25 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Login</Text>
                </View>
            }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{
                headerTitle: () => <View style={{ flex: 1, alignItems: 'center', marginRight: 25 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Signup</Text>
                </View>
            }} />
        </Stack.Navigator>
    )
}

export default PublicStack;