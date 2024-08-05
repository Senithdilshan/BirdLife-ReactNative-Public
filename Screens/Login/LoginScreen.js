import { useContext, useState } from 'react';
import AuthContent from '../../components/Auth/AuthContent';
import { LoginUser } from '../../util/Auth';
import { Alert, StyleSheet } from 'react-native';
import { AuthContext } from '../../Store/Auth-context';
import Spinner from 'react-native-loading-spinner-overlay';
import { View } from 'react-native';

const LoginScreen = () => {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const authCtx = useContext(AuthContext);
    const loginHandler = async ({ email, password }) => {
        setIsAuthenticating(true);
        try {
            const token = await LoginUser(email, password);
            authCtx.authenticate(token);
        } catch (error) {
            Alert.alert(
                'Authentication Failed!',
                'Please check your credentials');
            setIsAuthenticating(false);
        }

    }
    return (
        <View>
            <Spinner
                visible={isAuthenticating}
                textContent={'Logging you in...'}
                textStyle={styles.spinnerTextStyle}
            />
            <AuthContent isLogin onAuthenticate={loginHandler} />
        </View>
    )
}

export default LoginScreen;
const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
});