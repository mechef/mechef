import PropTypes from 'prop-types';

const Header = props => (
  <nav className="mechef-navbar">
    <img className="mechef-navbar-logo" src="../static/food.png" alt="logo" />
    <div className="mechef-navbar-collapse">
      <ul className="mechef-navbar-nav">
        <li className={props.selectedItem === 'about' ? 'active' : ''}>HOW IT WORKS</li>
        <li className={props.selectedItem === 'join' ? 'active' : ''}>JOIN NOW</li>
      </ul>
    </div>
    <style jsx>
      {`
        .mechef-navbar {
          display: flex;
          justify-content: space-between;
          width: 100%;
          height: 90px;
          background-color: #ffffff;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
        }
        .mechef-navbar-logo {
          height: 70px;
          width: 113px;
          margin: 13px 0px 7px 89px;
        }
        .mechef-navbar-nav {
          display: flex;
          padding-top: 43px;
          padding-right: 110px;
          list-style: none;
        }
        .mechef-navbar-nav li {
          margin-left: 40px;
          padding-bottom: 23px;
          font-family: AvenirNext;
          font-size: 15px;
          font-weight: 500;
          line-height: 1;
          letter-spacing: 0.6px;
          color: #4a4a4a;
          cursor: pointer;
        }
        .mechef-navbar-nav li:hover {
           border-bottom: 9px solid #8cc63f;
        }
        .mechef-navbar-nav li.active {
           border-bottom: 9px solid #8cc63f;
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

Header.propTypes = {
  selectedItem: PropTypes.string,
};

Header.defaultProps = {
  selectedItem: '',
};

export default Header;
