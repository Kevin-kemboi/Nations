import React, { useContext } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { SearchContext } from "../Pages/Home";
import "../Styles/Filter.css";

function Filter() {
  const { userInput, setUserInput, regionChoice, setRegionChoice, populationRange, activePopulationRange, setActivePopulationRange, languageChoice, setLanguageChoice, sortBy, setSortBy, availableLanguages } =
    useContext(SearchContext);

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleRegionChoice = (event) => {
    const selectedRegion = event.target;
    const value = selectedRegion.getAttribute("value");
    setRegionChoice(value);
  };

  return (
    <section className="filter-results-container">
      <div className="filter-input" data-aos="fade-right">
        <input
          type="text"
          placeholder="Search for a country ..."
          id="countryNameInput"
          value={userInput}
          onChange={handleUserInput}
          name="Country Name"
          title="Search for a country by name"
        />
        <BiSearchAlt id="searchIcon" title="Search Icon" />
      </div>
      <div className="custom-dropdown" data-aos="fade-left">
        <div className="selected-option" title="Filter by region">
          {regionChoice === "" ? "Filter by Region" : regionChoice}
        </div>
        <ul
          className={`options`}
          onClick={handleRegionChoice}
        >
          <li title="All" value="">All</li>
          <li title="Africa" value="Africa">Africa</li>
          <li title="Americas" value="Americas">Americas</li>
          <li title="Asia" value="Asia">Asia</li>
          <li title="Europe" value="Europe">Europe</li>
          <li title="Oceania" value="Oceania">Oceania</li>
        </ul>
      </div>
      {/* Population Range Slider */}
      {populationRange[1] > 0 && (
        <div style={{display:'flex', flexDirection:'column', gap:4, minWidth:220}} data-aos="fade-left">
          <label htmlFor="populationRange" style={{fontSize:'var(--font-size-xs)', color:'var(--text-muted)'}}>Population Range</label>
          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            <input
              type="range"
              id="populationRange"
              min={populationRange[0]}
              max={populationRange[1]}
              value={activePopulationRange[0]}
              onChange={(e)=> setActivePopulationRange([Number(e.target.value), activePopulationRange[1]])}
              style={{flex:1}}
              aria-label="Minimum population"
            />
            <input
              type="range"
              min={populationRange[0]}
              max={populationRange[1]}
              value={activePopulationRange[1]}
              onChange={(e)=> setActivePopulationRange([activePopulationRange[0], Number(e.target.value)])}
              style={{flex:1}}
              aria-label="Maximum population"
            />
          </div>
          <div style={{display:'flex', justifyContent:'space-between', fontSize:'var(--font-size-xs)', color:'var(--text-secondary)'}}>
            <span>{activePopulationRange[0].toLocaleString()}</span>
            <span>{activePopulationRange[1].toLocaleString()}</span>
          </div>
        </div>
      )}
      {/* Language Filter */}
      {availableLanguages.length > 0 && (
        <div className="custom-dropdown" data-aos="fade-left" style={{minWidth:180}}>
          <div className="selected-option" title="Filter by language">
            {languageChoice === "" ? "Any Language" : languageChoice}
          </div>
          <ul className="options" onClick={(e)=>{
            const v = e.target.getAttribute('value');
            setLanguageChoice(v);
          }}>
            <li value="" title="Any">Any</li>
            {availableLanguages.slice(0,80).map(l => (
              <li key={l} value={l}>{l}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Sorting */}
      <div className="custom-dropdown" data-aos="fade-left" style={{minWidth:180}}>
        <div className="selected-option" title="Sort results">
          {sortBy === 'name_asc' ? 'Name A→Z' : sortBy === 'pop_desc' ? 'Population ↓' : 'Population ↑'}
        </div>
        <ul className="options" onClick={(e)=>{
          const v = e.target.getAttribute('value');
            setSortBy(v);
        }}>
          <li value="name_asc">Name A→Z</li>
            <li value="pop_desc">Population High→Low</li>
            <li value="pop_asc">Population Low→High</li>
        </ul>
      </div>
    </section>
  );
}

export default Filter;
