import axios from "axios";
import { FIREBASE_API } from "../env";
export const Authenicate = async (mode, email, password) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${FIREBASE_API}`;
    const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true
    });
    const token = response.data.idToken;
    return token;
}
export const CreateUser = (email, password) => {
    return Authenicate('signUp', email, password)
}
export const LoginUser = (email, password) => {
    return Authenicate('signInWithPassword', email, password)
}