import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

function Navbar() {
  // Theme toggling removed; default permanent dark mode

  return (
    <nav className="navbar-section" data-aos="fade-down">
      <h1 className="navbar-title">
        <Link to="/" title="Nations Hub">
          Nations Hub
        </Link>
      </h1>
      <div className="navbar-container">
        <Link to="/favorites" className="link" title="Favorites" aria-label="Favorites">
          <button className="navbar-btn" type="button">❤ Favorites</button>
        </Link>
        <Link to="/compare" className="link" title="Compare" aria-label="Compare">
          <button className="navbar-btn" type="button">⇄ Compare</button>
        </Link>
        <Link to="/analytics" className="link" title="Analytics" aria-label="Analytics">
          <button className="navbar-btn" type="button">📊 Analytics</button>
        </Link>
        <Link to="/Quiz" className="link">
        <button className="Quiz-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.835-.822 1.18-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452-.347 0-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.009-.767-.581-.64-1.89-.387-4.506l.066-.677c.072-.743.108-1.115.001-1.46-.107-.345-.346-.623-.822-1.18l-.434-.507c-1.677-1.96-2.515-2.941-2.223-3.882.293-.941 1.523-1.219 3.982-1.776l.636-.144c.7-.158 1.05-.237 1.33-.45.28-.213.46-.536.82-1.182l.328-.588Z"/>
          </svg>
          <span className="now">Start</span>
          <span className="play">Quiz</span>
        </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
