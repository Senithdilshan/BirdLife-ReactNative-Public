
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react'
import { Ionicons } from '@expo/vector-icons';
import NameSearch from '../Screens/Home/NameSearch/NameSearch';
import ImageSearch from '../Screens/Home/ImageSearch/ImageSearch';
import SoundSearch from '../Screens/Home/SoundSearch/SoundSearch';
import { Colors } from '../constants/styles';
import SaveLater from '../Screens/Home/SaveLater/SaveLater';
import { AuthContext } from '../Store/Auth-context';
import IconButton from '../components/UI/Buttons/IconButton';

const BottomTab = createBottomTabNavigator();

const AuthenticatedBottomTab = () => {
    const authCtx = useContext(AuthContext);
    return (
        <BottomTab.Navigator screenOptions={() => ({
            headerStyle: { backgroundColor: Colors.primary800 },
            headerTintColor: Colors.secondary500,
            tabBarStyle: { backgroundColor: Colors.primary800 },
            tabBarActiveTintColor: Colors.secondary500,
            headerRight: ({ tintColor }) => <IconButton icon={'exit'} color={tintColor} size={24} onPress={authCtx.logout} />
        })}>
            <BottomTab.Screen name='NameSearch' component={NameSearch} options={{
                title: 'Feather Finder',
                tabBarLabel: 'Search',
                tabBarIcon: ({ color, size }) => (<Ionicons name='search' color={color} size={size} />)
            }} />

            <BottomTab.Screen name='ImageSearch' component={ImageSearch} options={{
                title: 'Snap & Identify',
                tabBarLabel: 'Capture',
                tabBarIcon: ({ color, size }) => (<Ionicons name='camera' color={color} size={size} />)
            }} />

            <BottomTab.Screen name='SoundSearch' component={SoundSearch} options={{
                title: 'Chirp Tracker',
                tabBarLabel: 'Listen',
                tabBarIcon: ({ color, size }) => (<Ionicons name='mic' color={color} size={size} />)
            }} />
            <BottomTab.Screen name='SaveLater' component={SaveLater} options={({ navigation }) => ({
                title: 'Saved',
                tabBarLabel: 'Saved',
                tabBarIcon: ({ color, size }) => (<Ionicons name='save' color={color} size={size} />)
            })} />
        </BottomTab.Navigator>
    )
}

export default AuthenticatedBottomTab;