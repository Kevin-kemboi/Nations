import React, { useContext, useMemo } from "react";
import CountryCard from "./CountryCard";
import { SearchContext } from "../Pages/Home";

function Filterdata() {
  let renderedContent;
  const { userInput, regionChoice, apiData, activePopulationRange, languageChoice, sortBy } = useContext(SearchContext);

  const filtered = useMemo(() => {
    if (!apiData) return [];
    return apiData.filter(country => {
      // Name filter (startsWith for performance & intentional design)
      if (userInput && !country.name.common.toLowerCase().startsWith(userInput.toLowerCase())) return false;
      // Region filter
      if (regionChoice && country.region !== regionChoice) return false;
      // Population filter
      if (activePopulationRange && activePopulationRange.length === 2) {
        const pop = country.population || 0;
        if (pop < activePopulationRange[0] || pop > activePopulationRange[1]) return false;
      }
      // Language filter
      if (languageChoice) {
        const langs = country.languages ? Object.values(country.languages) : [];
        if (!langs.includes(languageChoice)) return false;
      }
      return true;
    }).sort((a,b) => {
      if (sortBy === 'name_asc') return a.name.common.localeCompare(b.name.common);
      if (sortBy === 'pop_desc') return b.population - a.population;
      if (sortBy === 'pop_asc') return a.population - b.population;
      return 0;
    });
  }, [apiData, userInput, regionChoice, activePopulationRange, languageChoice, sortBy]);

  renderedContent = filtered.map((country, index) => (
    <CountryCard
      key={index}
      flag={country.flags.png}
      name={country.name.common}
      population={country.population}
      region={country.region}
      capital={country.capital}
    />
  ));

  if (renderedContent.length === 0) {
    renderedContent = (
      <div
        style={{
          color: "red",
          fontSize: "20px",
          textAlign: "center",
          letterSpacing: "0.7px",
        }}
      >
        <p>
          Not Country found matching your input or filter, please try something
          different.
        </p>
      </div>
    );
  }

  return renderedContent;
}

export default Filterdata;
