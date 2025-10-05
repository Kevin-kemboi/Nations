// Global application context for cross-page features: favorites, comparison list, cache metadata
// This file introduces new functionality without altering existing business logic.
import React, { createContext, useCallback, useEffect, useState } from 'react';

export const AppContext = createContext();

const FAVORITES_KEY = 'nh_favorites_v1';
const COMPARE_KEY = 'nh_compare_v1';
const CACHE_META_KEY = 'nh_cache_meta_v1';

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || []; } catch { return []; }
  });
  const [compareList, setCompareList] = useState(() => {
    try { return JSON.parse(localStorage.getItem(COMPARE_KEY)) || []; } catch { return []; }
  });
  const [cacheMeta, setCacheMeta] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CACHE_META_KEY)) || {}; } catch { return {}; }
  });
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Persist changes
  useEffect(() => { localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem(COMPARE_KEY, JSON.stringify(compareList)); }, [compareList]);
  useEffect(() => { localStorage.setItem(CACHE_META_KEY, JSON.stringify(cacheMeta)); }, [cacheMeta]);

  // Network status listeners
  useEffect(() => {
    const goOnline = () => setIsOffline(false);
    const goOffline = () => setIsOffline(true);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  const toggleFavorite = useCallback((name) => {
    setFavorites(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  }, []);

  const isFavorite = useCallback((name) => favorites.includes(name), [favorites]);

  const toggleCompare = useCallback((name) => {
    setCompareList(prev => prev.includes(name)
      ? prev.filter(n => n !== name)
      : (prev.length >= 3 ? [...prev.slice(1), name] : [...prev, name])
    );
  }, []);

  const inCompare = useCallback((name) => compareList.includes(name), [compareList]);

  const clearCompare = useCallback(() => setCompareList([]), []);

  const updateCacheMeta = useCallback((meta) => {
    setCacheMeta(prev => ({ ...prev, ...meta }));
  }, []);

  return (
    <AppContext.Provider value={{
      favorites,
      toggleFavorite,
      isFavorite,
      compareList,
      toggleCompare,
      inCompare,
      clearCompare,
      cacheMeta,
      updateCacheMeta,
      isOffline
    }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;