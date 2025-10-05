import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import CountryDetails from "./Pages/CountryDetails";
import Quiz from "./Pages/Quiz";
import NotFound from "./Pages/NotFound";
import { AppProvider } from "./Context/AppContext"; // New global provider
import Favorites from "./Pages/Favorites"; // New page
import Compare from "./Pages/Compare"; // New page
import Analytics from "./Pages/Analytics"; // New page
import AOS from "aos";
import "./App.css";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      offset: 50,
      duration: 500,
    });
  }, []);

  return (
    <Router basename="/">
      <AppProvider>
  <div className="App darkMode"> {/* Forced default dark mode */}
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/:country" element={<CountryDetails />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;
