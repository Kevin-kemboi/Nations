import React, { useState, createContext, useEffect } from "react";
import Filter from "../Components/Filter";
import Fetch from "../Components/Fetch";

export const SearchContext = createContext();

function Home() {
  const [apiData, setApiData] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [apiError, setApiError] = useState(null);
  const [regionChoice, setRegionChoice] = useState("");
  // Advanced filters
  const [populationRange, setPopulationRange] = useState([0, 0]); // [min, max]
  const [activePopulationRange, setActivePopulationRange] = useState([0, 0]);
  const [languageChoice, setLanguageChoice] = useState("");
  const [sortBy, setSortBy] = useState("name_asc");
  const [availableLanguages, setAvailableLanguages] = useState([]);

  // Derive min/max population & languages once data loads
  useEffect(() => {
    if (apiData && apiData.length) {
      const populations = apiData.map(c => c.population).filter(Boolean);
      const min = Math.min(...populations);
      const max = Math.max(...populations);
      setPopulationRange([min, max]);
      if (activePopulationRange[0] === 0 && activePopulationRange[1] === 0) {
        setActivePopulationRange([min, max]);
      }
      // Collect languages
      const langSet = new Set();
      apiData.forEach(c => {
        if (c.languages) Object.values(c.languages).forEach(l => langSet.add(l));
      });
      setAvailableLanguages(Array.from(langSet).sort((a,b)=>a.localeCompare(b)));
    }
  }, [apiData]);

  return (
    <SearchContext.Provider
      value={{
        userInput, setUserInput,
        regionChoice, setRegionChoice,
        apiData, setApiData,
        apiError, setApiError,
        populationRange, activePopulationRange, setActivePopulationRange,
        languageChoice, setLanguageChoice,
        sortBy, setSortBy,
        availableLanguages
      }}
    >
      <div className="home-page">
        <Filter />
        <Fetch />
      </div>
    </SearchContext.Provider>
  );
}

export default Home;
