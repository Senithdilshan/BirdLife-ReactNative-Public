import * as FileSystem from 'expo-file-system';

export const convertToBase64 = async (uri) => {
    try {
        const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        return base64;
    } catch (error) {
        console.error("Error converting to base64: ", error);
        return null;
    }
};