import { useContext, useState } from 'react';
import AuthContent from '../../components/Auth/AuthContent';
import { CreateUser } from '../../util/Auth';
import { Alert, StyleSheet } from 'react-native';
import { AuthContext } from '../../Store/Auth-context';
import Spinner from 'react-native-loading-spinner-overlay';
import { View } from 'react-native';

const SignupScreen = () => {
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const authCtx = useContext(AuthContext);

    const signUpHandler = async ({ email, password }) => {
        setIsAuthenticating(true);
        try {
            const token = await CreateUser(email, password);
            authCtx.authenticate(token);
        } catch (error) {
            Alert.alert('Signup Failed!');
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
            <AuthContent onAuthenticate={signUpHandler} />
        </View>
    )
}

export default SignupScreen;

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
});