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
          height: 90px;
          width: 100%;
          background-color: #ffffff;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
        }
        .mechef-navbar-logo {
          height: 70px;
          width: 113px;
          margin: 13px 0px 7px 89px;
        }
        .mechef-navbar-collapse {
          display: inline-block;
          float: right;
        }
        .mechef-navbar-nav {
          display: inline-block;
          list-style: none;
          margin-right: 112px;
        }
        .mechef-navbar-nav li {
          font-family: AvenirNext;
          font-size: 15px;
          font-weight: 500;
          line-height: 1;
          letter-spacing: 0.6px;
          color: #4a4a4a;
          margin-top: 43px;
          margin-bottom: 32px;
          margin-left: 41px;
          display: inline-block;
          cursor: pointer;
        }
        .mechef-navbar-nav  li:hover{
          padding-bottom: 23px;
          border-bottom: 9px solid #8cc63f;
        }
        .mechef-navbar-nav  li.active{
          padding-bottom: 23px;
          border-bottom: 9px solid #8cc63f;
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
