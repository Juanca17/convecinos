import axios from "axios";
import { FORECAST_WEATHER } from "./apiConstants.jsx";
export const fetchForecast = () => {
  return new Promise((resolve, rejects) => {
    axios.get(FORECAST_WEATHER).then(
      res => {
        let weatherInfo = res.data.list;
        resolve(weatherInfo);
      },
      err => {
        // eslint-disable-next-line no-console
        console.log("error en fetchWeather:", err);
        rejects();
      }
    );
  });
};
