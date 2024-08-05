import axios from "axios";
import { BIRD_SOUND_URL } from "../env";

export const birdSoundAPI = async (formData) => {
    try {
        const Resposne = await axios.post(
            BIRD_SOUND_URL,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        )
        console.log("Api", Resposne?.data);
        return Resposne?.data
    } catch (error) {
        console.log(error);
        throw new error
    }
}