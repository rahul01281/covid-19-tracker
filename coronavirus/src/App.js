import React, { useState, useEffect } from 'react';
import './App.css';
import { MenuItem, FormControl, Select } from "@material-ui/core";

function App() {

  const [ countries, setCountries ] = useState([]);
  const [ country, setCountry] = useState("worldwide");


  useEffect(() => {
    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries").then((response) => response.json()).then((data) => {
        const countries = data.map((country) => (
          {
            name : country.country,
            value: country.countryInfo.iso2,
            id: country.countryInfo._id
          }));

          setCountries(countries);
      });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    setCountry(countryCode);
  }


  return (
    <div className="app">
      <div className="app__header">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {
              countries.map((country) => (
                <MenuItem value={country.value} key={country.id} >{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>      
    </div>
  );
}

export default App;
