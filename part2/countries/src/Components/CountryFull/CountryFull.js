import React, { useEffect, useState } from "react";
import axios from "axios";

import Weather from "../Weather/Weather";

const CountryFull = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY;

  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`
      )
      .then((response) => {
        const data = response.data;
        setWeather(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // let capitalWeather = '';

  // if (weather) {
  //   capitalWeather = (
  //   <h2>Weather in {country.capital}</h2>
  //     <p>
  //       <strong>temperature:</strong>
  //       {weather.main.temp}°C
  //     </p>
  //     <p>
  //       <strong>wind speed:</strong>
  //       {weather.wind.speed.value}
  //       {weather.wind.speed.unit}
  //     </p>
  //     );
  // }

  return (
    <div>
      <h1>{country.name}</h1>
      <br />
      <p>capital: {country.capital ? country.capital : "N/A"}</p>
      <p>population: {country.population}</p>
      <br />
      <h2>Languages</h2>
      <br />
      {country.languages.map((lang) => {
        return <li key={lang.iso639_2}>{lang.name}</li>;
      })}
      <br />
      <img
        src={country.flag}
        alt={"Flag of " + country.name}
        height="300px"
        width="200px"
      />
      <br />
      <div>
        <h2>Weather in {country.capital}</h2>
        <Weather weather={weather} />
      </div>
    </div>
  );
};

export default CountryFull;
