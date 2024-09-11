import axios from 'axios';
import { from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const getWeatherByCity = (city) => {
  return from(axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`)).pipe(
    catchError(error => {
      const errorMessage = error.response?.data?.message || error.message;
      alert(`Error fetching weather data: ${errorMessage}`);
      return throwError(error);
    })
  );
};
