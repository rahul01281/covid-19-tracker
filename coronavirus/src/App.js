import React, { useState, useEffect } from 'react';
import './App.css';
import { MenuItem, FormControl, Select, Menu } from "@material-ui/core";

function App() {

  const [ countries, setCountries ] = useState([]);
  

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


  return (
    <div className="app">
      <div className="app__header">
        <h1>Covid-19 Tracker</h1>
        <FormControl class="app__dropdown">
          <Select variant="outlined" value="abc">
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
