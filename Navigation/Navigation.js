import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthenticatedStack from './AuthenticatedStack';
import { AuthContext } from '../Store/Auth-context';
import PublicStack from './PublicStack';
import { StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Navigation = () => {
    const [isTryingLogin, setIsTryingLogin] = useState(true);
    const authCtx = useContext(AuthContext);
    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            if (storedToken) {
                authCtx.authenticate(storedToken)
            }

            setIsTryingLogin(false);
        }
        fetchToken();
    }, []);
    if (isTryingLogin) {
        return <Spinner
            visible={isTryingLogin}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
        />
    }
    return (
        <NavigationContainer>
            {!authCtx.isAuthenicatied ? <PublicStack /> : <AuthenticatedStack />}
        </NavigationContainer>
    )
}

export default Navigation;
const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
});