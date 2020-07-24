import React from "react";

const Weather = ({ weather }) => {
  console.log(weather);

  if (Object.keys(weather).length === 0) {
    return <p>Weather unavailable</p>;
  } else {
    return (
      <div>
        <p>
          <strong>temperature: </strong>
          {(weather.main.temp - 273.15).toFixed(2)}°C
        </p>
        <p>
          <strong>wind speed: </strong>
          {weather.wind.speed} m/s
        </p>
      </div>
    );
  }
};

export default Weather;
