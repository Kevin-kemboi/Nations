import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import { Link } from 'react-router-dom';
import Spinner from '../Components/Spinner';

// Favorites page: shows cached favorite countries offline-capable
function Favorites() {
  const { favorites, toggleFavorite, isOffline } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const stored = JSON.parse(localStorage.getItem('nh_all_countries_cache_v1'));
        if (stored && stored.data) {
          // Use local cached data to avoid refetch
          const filtered = stored.data.filter(c => favorites.includes(c.name.common));
          if (!cancelled) setCountries(filtered);
        } else if (favorites.length) {
          // Fallback fetch minimal fields only for favorites
            const responses = await Promise.all(favorites.map(f => fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(f)}?fullText=true`)));
            const jsons = await Promise.all(responses.map(r => r.ok ? r.json() : []));
            const flat = jsons.map(a => a[0]).filter(Boolean);
            if (!cancelled) setCountries(flat);
        }
      } catch (e) {
        // ignore
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [favorites]);

  if (loading) return <Spinner />;

  return (
    <section className="main-body-section" data-aos="fade-up">
      <div style={{width:'100%'}}>
        <h2 style={{marginBottom:'1rem'}}>Your Favorites {isOffline && <span style={{fontSize:'0.75rem', color:'var(--accent-warning)'}}>(Offline)</span>}</h2>
        {favorites.length === 0 && <p style={{color:'var(--text-muted)'}}>You haven't added any favorites yet. Visit the home page and tap the star icon on a country.</p>}
        <div className="main-body-container">
          {countries.map(country => (
            <div key={country.cca3} className="country-card" style={{position:'relative'}}>
              <button
                aria-label="Remove from favorites"
                onClick={() => toggleFavorite(country.name.common)}
                style={{
                  position:'absolute', top:8, right:8, background:'rgba(0,0,0,0.4)',
                  border:'none', borderRadius:'50%', width:36, height:36, cursor:'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center', color:'gold'
                }}
              >★</button>
              <Link to={`/${country.name.common}`} title={country.name.common} style={{textDecoration:'none', color:'inherit'}}>
                <div className="ctd-img"><img src={country.flags.png} alt={country.name.common} /></div>
                <div className="ctd-info">
                  <p className="ctd-title">{country.name.common}</p>
                  <p className="ctd-desc"><strong>Region:</strong> {country.region}</p>
                  <p className="ctd-desc"><strong>Population:</strong> {country.population.toLocaleString()}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Favorites;
