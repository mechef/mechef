// @flow

import React from "react";

type Props = {
  selectedItem: string
};

const Header = (props: Props) => (
  <nav className="mechef-navbar">
    <img
      className="mechef-navbar-logo"
      src="../static/svg/mechef_logo.svg"
      alt="logo"
    />
    <div className="mechef-navbar-collapse">
      <ul className="mechef-navbar-nav">
        <li className={props.selectedItem === "about" ? "active" : ""}>
          HOW IT WORKS
        </li>
        <li className={props.selectedItem === "join" ? "active" : ""}>
          JOIN NOW
        </li>
      </ul>
    </div>
    <style jsx>
      {`
        .mechef-navbar {
          display: flex;
          justify-content: space-between;
          width: 100%;
          height: 88px;
          background-color: #ffffff;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
        }
        .mechef-navbar-logo {
          height: 43px;
          margin-left: 89px;
          margin-top: auto;
          margin-bottom: auto;
        }
        .mechef-navbar-nav {
          display: flex;
          margin: 0;
          height: 100%;
          padding-right: 110px;
          list-style: none;
        }
        .mechef-navbar-nav li {
          display: flex;
          align-items: center;
          margin-left: 40px;
          font-size: 15px;
          font-weight: 500;
          line-height: 1;
          letter-spacing: 0.6px;
          color: #4a4a4a;
          cursor: pointer;
          border-bottom: 9px solid rgba(0, 0, 0, 0);
        }
        .mechef-navbar-nav li:hover {
          border-bottom-color: #8cc63f;
        }
        .mechef-navbar-nav li.active {
          border-bottom-color: #8cc63f;
        }
        @media screen and (max-width: 768px) {
          .mechef-navbar-collapse {
            display: none;
          }
        }
      `}
    </style>
  </nav>
);

Header.defaultProps = {
  selectedItem: ""
};

export default Header;
