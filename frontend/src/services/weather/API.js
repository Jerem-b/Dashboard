import axios from 'axios';

async function WEATHERGetCurrentPollution(lat, lon)
{
  const reponse = await axios.get("http://api.openweathermap.org/data/2.5/air_pollution?", {
        params: {
            appid: process.env.VUE_APP_WEATHER_API_KEY,
            lat: lat,
            lon: lon,
        }
    });
    return reponse.data;
}

async function WEATHERGetCurrentWeather(city)
{
  const reponse = await axios.get("http://api.openweathermap.org/data/2.5/weather?", {
        params: {
            appid: process.env.VUE_APP_WEATHER_API_KEY,
            q: city,
            units: "metric",
        }
    });
    return reponse.data;
}

export {
  WEATHERGetCurrentPollution,
  WEATHERGetCurrentWeather
}