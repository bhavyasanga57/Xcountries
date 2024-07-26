import { useEffect, useState } from "react";
import "./CountrieSearch.css";

function Countries() {
    const [countries, setCountries] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("https://restcountries.com/v3.1/all");
          const data = await response.json();
          setCountries(data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div className="container">
        {countries.map((c) => (
          <div key={c.cca3} className="card">
            <img
              src={c.flags.png}
              alt={`Flag of ${c.name.common}`}
              className="image"
            />
            <h2>{c.name.common}</h2>
          </div>
        ))}
      </div>
    );
  }
  
  export default Countries;