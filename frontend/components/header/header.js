import Link from 'next/link';
import Logo from './food.svg';

const HEADER = () => (
  <div>
    <Link href="/index">
      <nav className="navbar">
        <div className="navbar-logo">
          <Logo />
        </div>
        <div className="navbar-collapse" id="myNavbar">
          <ul className="navbar-nav">
            <li>HOW IT WORKS</li>
            <li>JOIN NOW</li>
          </ul>
        </div>
      </nav>
    </Link>
    <style jsx>
      {`
        .navbar {
          height: 90px;
          background-color: #ffffff;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
        }
        .navbar-logo {
          display: inline-block;
          height: 70px;
          width: 113px;
          margin: 13px 0px 7px 89px;
        }
        .navbar-collapse {
          display: inline-block;
          float: right;
        }
        .navbar-nav {
          display: inline-block;
          list-style: none;
          margin-right: 112px;
        }
        .navbar-nav li {
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
        .navbar-nav  li:hover{
          padding-bottom: 23px;
          border-bottom: 9px solid #8cc63f;
        }
        .navbar-nav  li:active{
          padding-bottom: 23px;
          border-bottom: 9px solid #8cc63f;
        }
        .mainContent {
          height: 100%;
          background-image: url("main-background.jpg");
        }
      `}
    </style>
  </div>
);

export default HEADER;
