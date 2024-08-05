import { birdSoundAPI } from "../util/BirdSoundAPI";
import uuid from 'react-native-uuid';
import { convertM4aToMp3 } from "./FileConverter";
import { getCommonName } from "./GetBirdRealName.helper";

export const AudioFileCovertAndUpload = async (uri, changeConvertState, changePredictState) => {
    console.log("uri", uri);
    try {
        changeConvertState(true);
        const mp3Uri = await convertM4aToMp3(uri);
        changeConvertState(false);
        console.log("mp3Uri", mp3Uri);
        const mp3File = {
            uri: mp3Uri,
            name: `file-${uuid.v4()}.mp3`, // Use the same unique filename
            type: 'audio/mp3'
        };

        const formData = new FormData();
        formData.append('file', mp3File);
        changePredictState(true);
        const response = await birdSoundAPI(formData);
        changePredictState(false);
        if (response?.probability > 0.5) {
            const birdName = getCommonName(response?.predicted_class)
            console.log("birdName", birdName);
            return birdName;
        }
        else {
            return null;
        }
    } catch (error) {
        changeConvertState(false);
        changePredictState(false);
        throw new error
    }
}

