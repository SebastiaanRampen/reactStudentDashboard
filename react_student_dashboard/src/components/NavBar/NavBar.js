import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav-wrapper red darken-3">
      <div className="container">
        {/* <a className="brand-logo">Evaluation</a> */}
        <span className="brand-logo">Evaluation</span>
        <ul className="right">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/datasheet">Datasheet</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
