import axios from "axios";
import { ROBOFLOW_API, ROBOFLOW_URL } from "../env";

export const birdV2Api = async (imageData) => {
    try {
        const v2Resposne = await axios({
            method: "POST",
            url: ROBOFLOW_URL,
            params: {
                api_key: ROBOFLOW_API
            },
            data: imageData,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            responseType: 'json'
        })
        if (v2Resposne?.data?.predictions?.length != 0) {
            return v2Resposne?.data?.predictions[0].class;
        } else {
            return null;
        }
    } catch (error) {
        throw error
    }
}