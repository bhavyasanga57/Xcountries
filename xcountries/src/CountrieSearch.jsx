import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./CountrieSearch.css";

const CountryCard = ({ data }) => {
  return (
    <div className="countryCard">
      <img src={data.flags.svg} alt={data.name.common} />
      <h2>{data.name.common}</h2>
    </div>
  );
};

const CountrieSearch = () => {
  const [countryData, setCountryData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch country data from API
  const fetchCountryData = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountryData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching country data:", error);
      setLoading(false);
      setError("Failed to fetch country data. Please try again later.");
    }
  };

  // Memoized filtered data based on search text
  const filteredData = useMemo(
    () =>
      countryData.filter((country) =>
        country.name.common.toLowerCase().includes(searchText.toLowerCase())
      ),
    [countryData, searchText]
  );

  useEffect(() => {
    fetchCountryData();
  }, []);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && (
        <div>
          <div className="inputWrapper">
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              placeholder="Search countries..."
            />
          </div>
          <div className="wrapper">
            {filteredData.length === 0 ? (
              <div>No countries found.</div>
            ) : (
              filteredData.map((country) => (
                <CountryCard key={country.name.common} data={country} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrieSearch;
