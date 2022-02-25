import axios from 'axios';

async function NASAgetPicture(date) {
    const reponse = await axios.get("https://api.nasa.gov/planetary/apod?", {
        params: {
            api_key: process.env.VUE_APP_NASA_API_KEY,
            date: date,
        }
    });
    return reponse.data;
}

async function NASAgetRoverPicture(date, cam) {
    const reponse = await axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?", {
        params: {
            api_key: process.env.VUE_APP_NASA_API_KEY,
            earth_date: date,
            camera: cam,
        }
    });
    return reponse.data;
}

async function NASAGetAsteroidInfo(date) {
    const reponse = await axios.get("https://api.nasa.gov/neo/rest/v1/feed?", {
        params: {
            api_key: process.env.VUE_APP_NASA_API_KEY,
            start_date: date,
            end_date: date,
        }
    });
    return reponse.data;
}

export {
    NASAgetPicture,
    NASAgetRoverPicture,
    NASAGetAsteroidInfo,
}