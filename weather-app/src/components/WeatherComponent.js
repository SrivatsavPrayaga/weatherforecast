import React, { useState } from 'react';
import { getWeatherByCity } from './WeatherService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const WeatherComponent = () => {
  const [city, setCity] = useState('visakhapatnam');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = () => {
    if (city) {
      getWeatherByCity(city).subscribe({
        next: (response) => {
          console.log('Fetched data:', response.data); // Log the data to inspect it
          setWeatherData(response.data);
        },
        error: (error) => console.error('Error:', error)
      });
    }
  };

  return (
    <div className="container">
      <h1>Weather in your city</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button className="btn btn-primary" onClick={fetchWeather}>Search</button>
      </div>
      {weatherData && weatherData.list ? (
        <div className="mt-4">
          {weatherData.list.slice(0, 5).map((forecast, index) => (
            <div key={index} className="card mb-2">
              <div className="card-body">
                <h5 className="card-title">Date: {forecast.dt_txt.split(' ')[0]}</h5>
                <p className="card-text">Min Temperature: {forecast.main.temp_min}°C</p>
                <p className="card-text">Max Temperature: {forecast.main.temp_max}°C</p>
                <p className="card-text">Pressure: {forecast.main.pressure} hPa</p>
                <p className="card-text">Humidity: {forecast.main.humidity}%</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default WeatherComponent;
