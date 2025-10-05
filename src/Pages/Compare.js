import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import Spinner from '../Components/Spinner';
import { Link } from 'react-router-dom';

// Comparison page: compare up to 3 countries side by side (population, region, capital, area, currencies, languages)
function Compare() {
  const { compareList, clearCompare } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const responses = await Promise.all(compareList.map(name => fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`)));
        const jsons = await Promise.all(responses.map(r => r.ok ? r.json() : []));
        const flat = jsons.map(a => a[0]).filter(Boolean);
        if (!cancelled) setData(flat);
      } catch(e) { /* ignore */ }
      finally { if (!cancelled) setLoading(false); }
    }
    if (compareList.length) load(); else { setData([]); setLoading(false); }
    return () => { cancelled = true; };
  }, [compareList]);

  if (loading) return <Spinner />;

  const exportCSV = () => {
    if (!data.length) return;
    const headers = ['Name','Population','Region','Capital','Area','Currencies','Languages'];
    const rows = data.map(c => [
      c.name.common,
      c.population,
      c.region,
      (c.capital||[]).join(' / '),
      c.area,
      c.currencies ? Object.values(c.currencies).map(x=>x.name).join(' / ') : '',
      c.languages ? Object.values(c.languages).join(' / ') : ''
    ]);
    const csv = [headers, ...rows].map(r => r.map(v => '"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n');
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'country-comparison.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="country-details-section" data-aos="fade-up" style={{paddingTop:'2rem'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
        <h2>Country Comparison</h2>
        <div style={{display:'flex', gap:'0.5rem'}}>
          {data.length > 0 && <button onClick={exportCSV} className="navbar-btn" type="button">Export CSV</button>}
          {compareList.length > 0 && <button onClick={clearCompare} className="navbar-btn" type="button">Clear</button>}
        </div>
      </div>
      {compareList.length === 0 && <p style={{color:'var(--text-muted)'}}>Add countries to compare from the home list using the compare icon.</p>}
      <div style={{display:'grid', gridTemplateColumns:`repeat(${data.length || 1}, minmax(240px, 1fr))`, gap:'1.5rem'}}>
        {data.map(country => (
          <div key={country.cca3} style={{background:'var(--nav-bg-color)', border:'1px solid var(--border-color)', borderRadius:'var(--radius-xl)', padding:'1rem', boxShadow:'var(--shadow-md)'}}>
            <Link to={`/${country.name.common}`} style={{textDecoration:'none'}}>
              <div style={{borderRadius:'var(--radius-lg)', overflow:'hidden', height:140, marginBottom:'0.75rem'}}>
                <img src={country.flags.png} alt={country.name.common} style={{width:'100%', height:'100%', objectFit:'cover'}} />
              </div>
              <h3 style={{fontSize:'var(--font-size-lg)', marginBottom:'0.5rem'}}>{country.name.common}</h3>
            </Link>
            <ul style={{listStyle:'none', padding:0, margin:0, fontSize:'var(--font-size-sm)', lineHeight:1.4}}>
              <li><strong>Population:</strong> {country.population.toLocaleString()}</li>
              <li><strong>Region:</strong> {country.region}</li>
              <li><strong>Capital:</strong> {country.capital && country.capital.join(', ')}</li>
              <li><strong>Area:</strong> {country.area?.toLocaleString()} km²</li>
              <li><strong>Currencies:</strong> {country.currencies && Object.values(country.currencies).map(c=>c.name).join(', ')}</li>
              <li><strong>Languages:</strong> {country.languages && Object.values(country.languages).join(', ')}</li>
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Compare;
