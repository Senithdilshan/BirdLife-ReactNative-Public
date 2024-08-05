import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext({
    token: '',
    isAuthenicatied: false,
    authenticate: () => { },
    logout: () => { },
})

const AuthContextProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState();
    const authenticate = (token) => {
        setAuthToken(token);
        AsyncStorage.setItem('token', token);
    }
    const logout = () => {
        setAuthToken(null);
        AsyncStorage.removeItem('token');
    }
    const value = {
        token: authToken,
        isAuthenicatied: !!authToken,
        authenticate: authenticate,
        logout: logout
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;