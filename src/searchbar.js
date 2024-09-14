import React, { useState, useEffect } from "react";
import './searchbar.css'
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [countries, setCountries] = useState([]);

  // Fetch country data from the JSON file
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("../public/countries.json"); // Path to your JSON file
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountries();
  }, []);

  // Handle input change and dynamically filter suggestions
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter countries based on the search term for both country and capital
    if (value.length > 0) {
      const filteredSuggestions = countries.filter(
        (item) =>
          item.country.toLowerCase().includes(value.toLowerCase()) ||
          item.capital.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle click on a suggestion
  const handleSuggestionClick = (suggestion) => {
    // Update the search input with the selected suggestion
    setSearchTerm(`${suggestion.country} - ${suggestion.capital}`);
    // Clear suggestions once a suggestion is clicked
    setSuggestions([]);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by country or capital..."
        value={searchTerm}
        onChange={handleInputChange}
        className="search-input"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => handleSuggestionClick(item)}>
              {item.country} - {item.capital}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
