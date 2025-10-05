import React, { useEffect, useState } from 'react';
import Spinner from '../Components/Spinner';

// Simple analytics dashboard: top 10 by population, region distribution, average population
function Analytics() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    let cancelled=false;
    async function load() {
      setLoading(true);
      try {
        const cache = JSON.parse(localStorage.getItem('nh_all_countries_cache_v1'));
        if (cache && cache.data) {
          if (!cancelled) setData(cache.data);
        } else {
          const res = await fetch('https://restcountries.com/v3.1/all?fields=name,region,population');
          const json = await res.json();
          localStorage.setItem('nh_all_countries_cache_v1', JSON.stringify({data:json, ts:Date.now()}));
          if (!cancelled) setData(json);
        }
      } catch(e) { /* ignore */ }
      finally { if (!cancelled) setLoading(false); }
    }
    load();
    return () => { cancelled=true; };
  }, []);

  if (loading) return <Spinner />;

  const top10 = [...data].sort((a,b)=>b.population-a.population).slice(0,10);
  const regionCounts = data.reduce((acc,c)=>{acc[c.region]=(acc[c.region]||0)+1; return acc;},{});
  const maxRegion = Math.max(...Object.values(regionCounts));
  const maxTopPop = top10[0]?.population || 1;
  const avgPop = Math.round(data.reduce((s,c)=>s+c.population,0)/data.length);

  return (
    <section className="country-details-section" data-aos="fade-up" style={{paddingTop:'2rem'}}>
      <h2 style={{marginBottom:'1.5rem'}}>Global Analytics</h2>
      <div style={{display:'grid', gap:'2rem', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))'}}>
        <div style={{background:'var(--nav-bg-color)', padding:'1.25rem', borderRadius:'var(--radius-xl)', border:'1px solid var(--border-color)'}}>
          <h3 style={{marginBottom:'0.75rem'}}>Average Population</h3>
          <p style={{fontSize:'var(--font-size-2xl)', fontWeight:600}}>{avgPop.toLocaleString()}</p>
        </div>
        <div style={{background:'var(--nav-bg-color)', padding:'1.25rem', borderRadius:'var(--radius-xl)', border:'1px solid var(--border-color)'}}>
          <h3 style={{marginBottom:'0.75rem'}}>Region Distribution</h3>
          <ul style={{listStyle:'none', padding:0, margin:0, fontSize:'var(--font-size-sm)', lineHeight:1.5, display:'flex', flexDirection:'column', gap:'0.5rem'}}>
            {Object.entries(regionCounts).sort((a,b)=>b[1]-a[1]).map(([region,count]) => (
              <li key={region} style={{display:'flex', flexDirection:'column', gap:4}}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <span><strong>{region || 'Unknown'}</strong></span>
                  <span>{count}</span>
                </div>
                <div style={{height:8, background:'var(--bg-tertiary)', borderRadius:4, overflow:'hidden'}}>
                  <div style={{width:`${(count/maxRegion)*100}%`, background:'var(--accent-primary)', height:'100%'}}></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div style={{background:'var(--nav-bg-color)', padding:'1.25rem', borderRadius:'var(--radius-xl)', border:'1px solid var(--border-color)'}}>
          <h3 style={{marginBottom:'0.75rem'}}>Top 10 by Population</h3>
          <ul style={{listStyle:'none', padding:0, margin:0, fontSize:'var(--font-size-sm)', lineHeight:1.4, display:'flex', flexDirection:'column', gap:'0.5rem'}}>
            {top10.map(c => (
              <li key={c.name.common} style={{display:'flex', flexDirection:'column', gap:4}}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <span><strong>{c.name.common}</strong></span>
                  <span>{c.population.toLocaleString()}</span>
                </div>
                <div style={{height:8, background:'var(--bg-tertiary)', borderRadius:4, overflow:'hidden'}}>
                  <div style={{width:`${(c.population/maxTopPop)*100}%`, background:'var(--accent-secondary)', height:'100%'}}></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Analytics;
