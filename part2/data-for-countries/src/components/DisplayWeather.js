import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

const DisplayWeather = ({ city }) => {
  const [weather, setWeather] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
      )
      .then((res) => {
        const location = res.data[0];

        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${apiKey}`
          )
          .then((res) => {
            setWeather(res.data);
            setLoaded(true);
          });
      });
  }, [city]);

  if (loaded) {
    return (
      <>
        <h2>Weather in {city}</h2>

        <p>temperature {weather.main.temp} Celsius</p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt=""
        />
        <p>wind {weather.wind.speed} m/s</p>
      </>
    );
  }
};

export default DisplayWeather;
