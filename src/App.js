// App.js
import { useState, useEffect } from "react";
import "./App.css";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://crio-location-selector.onrender.com/countries");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = async (event) => {
    const country = event.target.value;
    setSelectedCountry(country);

    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`);
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleStateChange = async (event) => {
    const state = event.target.value;
    setSelectedState(state);

    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
  };

  return (
    <div className="location-selector">
      <h1>Select Location</h1>

      <div className="dropdown-row">
        <label>
          {/* Select Country: */}
          <select value={selectedCountry} onChange={handleCountryChange}>
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>

        <label>
          {/* Select State: */}
          <select
            value={selectedState}
            onChange={handleStateChange}
            disabled={!selectedCountry}
          >
            <option value="" disabled={!selectedCountry}>
              {selectedCountry ? "Select State" : "Select Country First"}
            </option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>

        <label>
          {/* Select City: */}
          <select
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedCountry || !selectedState}
          >
            <option value="" disabled={!selectedCountry || !selectedState}>
              {selectedCountry && selectedState
                ? "Select City"
                : "Select Country and State First"}
            </option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>
      </div>

      {selectedCity && (
        <p>{`You selected ${selectedCity}, ${selectedState}, ${selectedCountry}`}</p>
      )}
    </div>
  );
};

export default LocationSelector;
