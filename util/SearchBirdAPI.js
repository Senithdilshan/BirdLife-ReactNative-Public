import axios from "axios";
import { createClient } from 'pexels';
import { API_NINJA_APIKEY, API_NINJA_BASE_URL, PEXELS_API_KEY } from "../env";
export const SearchBird = async (name) => {
    try {
        const response = await axios({
            method: 'get',
            url: API_NINJA_BASE_URL + name,
            headers: { 'X-Api-Key': API_NINJA_APIKEY },
            responseType: 'json'
        });
        const filteredObjects = response?.data?.filter(obj => obj.taxonomy.class === 'Aves');
        return filteredObjects;
        // console.log(response.data);
    } catch (error) {
        throw error;
    }
}

export const GetBirdImageBySearchPexals = async (name) => {
    try {
        const client = createClient(PEXELS_API_KEY);
        const query = name;
        const BirdPhoto = await client.photos.search({ query, per_page: 1 });
        const birdPhotoUrl = BirdPhoto?.photos[0]?.src?.original;
        return birdPhotoUrl;
    } catch (error) {
        throw error;
    }
}

