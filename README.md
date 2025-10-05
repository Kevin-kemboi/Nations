# 🌍 Nations Hub

[![Author: Kevin](https://img.shields.io/badge/Author-Kevin-3b82f6)](https://github.com/Kevin-kemboi) ![License: MIT](https://img.shields.io/badge/License-MIT-green) ![Status](https://img.shields.io/badge/Status-Active-success) ![Built With](https://img.shields.io/badge/Built%20with-React-61dafb?logo=react&logoColor=white)

Modern, offline‑friendly, dark‑themed world countries explorer + quizzes + analytics dashboard.

---

## 📖 Overview

Nations Hub is an interactive geography platform that lets you explore data about every country, play knowledge quizzes, compare nations side‑by‑side, and view dynamic analytics. It now includes advanced filtering, favorites, comparison, offline caching, CSV export, and a fully modern dark UI layer.

## ✨ Feature Highlights

### Core

- 🔎 Smart Search (instant, prefix-based)
- 🌐 Region & Sub‑Region browsing
- 🏳️ Flag and identity data
- 🧾 Country detail pages (population, currencies, languages, borders, domains, native names, etc.)

### Advanced Additions

- ⭐ Favorites (persistent via LocalStorage, offline-ready)
- ⇄ Comparison (compare up to 3 countries; export as CSV)
- 📊 Analytics Dashboard (top populations, region distribution bars, average population)
- 🧠 Multiple Quiz Modes (capital, region, language, currency, reach-the-country)
- 🧰 Advanced Filters: population range sliders, language selection, region filtering, sorting (name/population)
- 📥 Offline Caching: Country list cached locally for instant reloads and basic offline resilience
- 🕶️ Enforced Dark Mode (light mode neutralized for consistent brand feel)
- 📄 CSV Export (comparison data)

### UX / UI

- Modern design tokens (spacing, typography scale, shadows, transitions)
- Accessible focus states & keyboard-friendly controls
- Responsive grid & adaptive layouts
- Animated interactions (AOS fade transitions)

## 🧱 Architecture Overview

| Layer | Responsibility |
|-------|----------------|
| React Context (`AppContext`) | Global favorites, compare list, cache meta, offline state |
| Search Context (Home) | Per-session filtering & search state |
| REST Countries API | Data source (selective field fetching for performance) |
| LocalStorage | Persistent UI state (favorites, compare, cached dataset) |

## 📂 Directory Structure (partial)

```text
src/
  App.js            # Routing + global providers
  Context/
    AppContext.js   # Favorites, compare, cache meta
  Pages/            # Home, CountryDetails, Favorites, Compare, Analytics, Quiz
  Components/       # Reusable UI (Navbar, Filter, CountryCard, Spinner, etc.)
  Styles/           # Modular CSS files (modern design system)
```

## 🌐 Data Source

Uses the public [REST Countries API](https://restcountries.com/) with selective field queries to reduce payload size (e.g. `?fields=name,flags,population,region,capital`).

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/Kevin-kemboi/Nations.git
cd Nations

# Install deps
npm install

# Run dev server (usually http://localhost:3000 or next available port)
npm start

# Production build
npm run build
```

## 🧪 Available Scripts

| Script | Purpose |
|--------|---------|
| `npm start` | Dev server with live reload |
| `npm run build` | Production build (minified) |
| `npm test` | Run test runner (if tests added) |

## ⚙️ Configuration & Environment

Currently no custom `.env` required. (If you later add rate-limited proxies or analytics, document env variables here.)

## 🗃 Caching Strategy

- On first load, all countries are fetched & cached in `localStorage (nh_all_countries_cache_v1)`.
- Subsequent loads hydrate UI immediately from cache while refetching in background.
- Offline detection updates UI state (e.g. Favorites page label).

## 🧩 Key Components

| Component | Purpose |
|-----------|---------|
| `CountryCard` | Displays summary + favorite + compare actions |
| `Filter` | Search + region + population range + language + sort controls |
| `Compare` | Side-by-side comparison with export |
| `Analytics` | Aggregated stats & visual bar indicators |
| `Favorites` | Offline-capable list of starred countries |
| `Spinner` | Accessible loading indicator |

## 🔐 Accessibility (A11y)

- Uses semantic buttons & links
- Focus-visible ring with high contrast
- Color contrast meets WCAG AA in dark theme
- Hover not required for core operations (keyboard friendly)

## 🧮 Performance Considerations

- Field-scoped API queries reduce overfetching
- Memoized filtering & sorting (`useMemo` in `Filterdata`)
- Local caching eliminates repeat network latency
- No heavy chart libraries (CSS-based bars for analytics)

## 🧭 Roadmap Ideas

- PWA service worker for full offline mode
- Debounced fuzzy search
- Saved filter presets
- Theming refactor (accessible system-level option)
- Quiz difficulty levels & scoring persistence
- Download favorites as JSON/CSV

## 🤝 Contributing

Contributions welcome!

```bash
git checkout -b feature/awesome-thing
# implement
git commit -m "feat: add awesome thing"
git push origin feature/awesome-thing
```

Open a Pull Request with description + screenshots (if UI changes).

## 🧾 License

MIT © Kevin. See [LICENSE](LICENSE).

## 🙌 Acknowledgements

- [REST Countries API](https://restcountries.com/)
- Open source ecosystem maintainers

## 📬 Contact

Questions / suggestions: [Kevin-kemboi](https://github.com/Kevin-kemboi)

---

_Built with curiosity, coffee, and clean component composition._

