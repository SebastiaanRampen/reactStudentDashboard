import React from "react";
import Charts from "../Charts/Charts";
import "./home.css";

export default function Home() {
  return (
    <div>
      <div className="container">
        <div className="logo">
          <label aria-current="page" className="logo-block ">
            <img
              src="https://global-uploads.webflow.com/5ee34869dd28cd4237e2a5f2/5f030fe26dc9fc19df8dc16a_Winc-logo-objects.svg"
              alt="Logo of Winc Academy"
              className="navigation-logo"
            />
            <div className="navigation-logo-text">
              WINC&nbsp;
              <span className="navigation-logo-text-normal">Academy</span>
            </div>
            <div>
              <span className="TitleText">Student Dashboard</span>
            </div>
          </label>
        </div>
      </div>
      <Charts />
    </div>
  );
}
