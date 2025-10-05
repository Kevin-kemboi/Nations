import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { BsStar, BsStarFill } from "react-icons/bs";
import { MdCompareArrows } from "react-icons/md";

function CountryCard(props) {
  const { toggleFavorite, isFavorite, toggleCompare, inCompare, compareList } = useContext(AppContext);
  const favorite = isFavorite(props.name);
  const compared = inCompare(props.name);
  return (
      <div className="country-card" style={{position:'relative'}}>
        {/* Favorite toggle button */}
        <button
          aria-label={favorite? 'Remove from favorites' : 'Add to favorites'}
          onClick={() => toggleFavorite(props.name)}
          style={{
            position:'absolute', top:8, left:8, width:40, height:40, border:'none', cursor:'pointer',
            borderRadius:'50%', background:'rgba(0,0,0,0.35)', display:'flex', alignItems:'center', justifyContent:'center',
            color: favorite ? 'gold' : 'white', backdropFilter:'blur(4px)'
          }}
        >
          {favorite ? <BsStarFill size={20} /> : <BsStar size={20} />}
        </button>
        {/* Compare toggle button */}
        <button
          aria-label={compared? 'Remove from comparison' : 'Add to comparison'}
          disabled={!compared && compareList.length >= 3}
          onClick={() => toggleCompare(props.name)}
          style={{
            position:'absolute', top:8, right:8, width:40, height:40, border:'none', cursor: (!compared && compareList.length>=3) ? 'not-allowed':'pointer',
            borderRadius:'50%', background:'rgba(0,0,0,0.35)', display:'flex', alignItems:'center', justifyContent:'center',
            color: compared ? 'var(--accent-primary)' : 'white', backdropFilter:'blur(4px)',
            opacity: (!compared && compareList.length>=3) ? 0.5 : 1
          }}
        >
          <MdCompareArrows size={22} />
        </button>
        <Link to={`/${props.name}`} title={props.name} style={{textDecoration:'none', color:'inherit'}}>
          <div className="ctd-img">
            <img src={props.flag} alt={`${props.name} Flag`} />
          </div>

          <div className="ctd-info">
            <p className="ctd-title">{props.name}</p>
            <p className="ctd-desc">
              <strong>Population: </strong>
              {props.population ? (props.population).toLocaleString() : <span>--</span>}
            </p>
            <p className="ctd-desc">
              <strong>Region: </strong>
              {props.region ? props.region : <span>--</span>}
            </p>
            <p className="ctd-desc">
              <strong>Capital: </strong>
              {props.capital ? props.capital : <span>--</span>}
            </p>
          </div>
        </Link>
      </div>
  );
}

export default CountryCard;
