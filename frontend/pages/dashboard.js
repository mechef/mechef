import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { connect } from '../state/RxState';
import DashboardPageRouter from '../components/DashboardPageRouter';
import globalActions from '../actions/globalActions';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Move asPath to the store
    this.state = {
      asPath: props.asPath,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      asPath: nextProps.asPath,
    });
  }

  render() {
    const { global: { backArrow }, toggleBackArrow$ } = this.props;
    return (
      <div className="dashboard">
        <input type="checkbox" id="dashboard-header__menu-toggle" hidden />
        <div className="dashboard__left">
          <div className="dashboard-sidebar">
            <div className="dashboard-sidebar__inner">
              <img src="../static/logo.png" alt="logo" />
              <ul className="dashboard-sidebar__menu">
                <li><Link href="/dashboard"><a>HOME</a></Link></li>
                <li><Link href="/menu"><a>MENU</a></Link></li>
                <li><Link href="/order"><a>ORDERS</a></Link></li>
                <li><a role="link" tabIndex="-1" onClick={() => Router.push('/dashboard', '/dashboard/ingredient')}>INGREDIENTS</a></li>
                <li><a role="link" tabIndex="-1" onClick={() => Router.push('/dashboard', '/dashboard/shipping')}>SHIPPING</a></li>
                <li><Link href="/account"><a>ACCOUNT</a></Link></li>
                <li><Link href="/setting"><a>SETTINGS</a></Link></li>
              </ul>
              <ul className="dashboard-sidebar__footer">
                <li><a>Service Agreement</a></li>
                <li><a>Privacy Policy</a></li>
                <li><a>Service</a></li>
                <li><a>About us</a></li>
                <li><a>Contact us</a></li>
                <li><a>Version 1.0</a></li>
                <li><a>@Mechef 2017</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="dashboard__right">
          <div className="dashboard-header">
            <div className="dashboard-header__wrapper">
              {
                backArrow && backArrow.isShow ?
                  <div className="dashboard-header__menu" onClick={() => toggleBackArrow$('')}>
                    <i className="fa fa-arrow-left fa-arrow-leftx2 dashboard-header__icon" aria-hidden="true" />
                    <span className="dashboard-header__title" >{backArrow.title}</span>
                  </div>
                  :
                  <label htmlFor="dashboard-header__menu-toggle" className="dashboard-header__menu">
                    <i className="fa fa-bars dashboard-header__icon" aria-hidden="true" />
                    <span className="dashboard-header__title" >MENU</span>
                  </label>
              }
              <div className="dashboard-header__user-profile">
                <div className="dashboard-header__user-head" />
                <div className="dashboard-header__user-head" />
                <div className="dashboard-header__user-head" />
              </div>
            </div>
          </div>
          <DashboardPageRouter pathname={this.state.asPath} />
        </div>
        <style jsx>
          {`
              * {
                -webkit-transition: .25s ease-in-out;
                -moz-transition: .25s ease-in-out;
                -o-transition: .25s ease-in-out;
                transition: .25s ease-in-out;
              }
              body {
                margin: 0px;
                background-color: #f8f7f7;
              }
              .dashboard {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
              }
              .dashboard__left {
                width: 240px;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
              }
              .dashboard__right {
                -webkit-box-flex: 5;
                -ms-flex: 5;
                flex: 5;
              }
              @media all and (max-width: 600px) {
                .dashboard__left {
                  -webkit-box-flex: 1;
                  -ms-flex: 1;
                  flex: 1;
                }
              }
              .dashboard-sidebar {
                background-color: #252525;
                width: 100%;
              }

              .dashboard-sidebar__inner {
                padding: 28px 36px;
              }

              .dashboard-sidebar__menu {
                list-style-type: none;
                padding: 0px;
              }
              .dashboard-sidebar__menu > li {
                width: 108px;
                height: 50px;
              }

              .dashboard-sidebar__menu > li > a {
                line-height: 50px;
                width: 75.9px;
                height: 19px;
                font-family: AvenirNext;
                font-size: 14px;
                letter-spacing: 1px;
                color: #ffffff;
              }

              .dashboard-sidebar__footer {
                list-style-type: none;
                padding: 0px;
              }

              .dashboard-sidebar__footer > li {
                height: 32px;
              }

              .dashboard-sidebar__footer > li > a{
                line-height: 32px;
                height: 16px;
                font-family: AvenirNext;
                font-size: 12px;
                letter-spacing: 0.9px;
                color: #9b9b9b;
              }

              .dashboard-header {
                height: 90px;
                background-color: #ffffff;
              }

              .dashboard-header__wrapper {
                padding-left:20px;
                padding-top: 38px;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                justify-content: space-between;
              }

              .dashboard-header__icon {
                width: 16px;
                height: 14.2px;
                color: #3e9f40;
              }

              .dashboard-header__title {
                margin-left: 24px;
                width: 55px;
                height: 20px;
                font-family: OpenSans;
                font-size: 18px;
                line-height: 30px;
                letter-spacing: 0.5px;
                color: #4a4a4a;
              }

              #dashboard-header__menu-toggle:checked ~ .dashboard__right {
                width: 100%;
              }

              #dashboard-header__menu-toggle:checked ~ .dashboard__left {
                margin-left: -240px;
              }

              .dashboard-header__user-profile {
                margin-right: 40.2px;
                width: 130px;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                justify-content: space-between;
              }
              @media all and (max-width: 600px) {
                .dashboard-header__user-profile {
                  display: none;
                }
              }
              .dashboard-header__user-head {
                width: 30px;
                height: 30px;
                background-color: #d8d8d8;
                border-radius: 50%;
              }

              /* home.css  */

              .dashboard-content__title {
                margin-bottom: 30px;
                font-family: AvenirNext;
                font-size: 18px;
                line-height: 1.11;
                letter-spacing: 0.5px;
                text-align: left;
                color: #4a4a4a;
              }

              .dashboard-content__header {
                width: 100%;
                height: 240px;
                background-image: url('../static/pancake.jpg');
                background-size: cover;
                background-position: center;
                position: relative;
              }

              .dashboard-content__header:after {
                content: '';
                position: absolute;
                top: 200px;
                left: 20px;
                background-image: url('../static/avatar.jpg');
                background-size: cover;
                background-position: center;
                width: 80px;
                height: 80px;
                border-radius: 40px;
              }
            `}
        </style>
      </div>
    );
  }
}

Dashboard.propTypes = {
  asPath: PropTypes.string.isRequired,
  global: PropTypes.shape({
    backArrow: PropTypes.shape({
      isShow: PropTypes.bool,
      title: PropTypes.string,
    })
  }),
};

Dashboard.defaultProps = {
  global: {
    backArrow: {
      isShow: false,
      title: '',
    },
  }
};

const DashboardWrapper = connect(({ global }) => ({ global }), { ...globalActions })(Dashboard);

DashboardWrapper.getInitialProps = async ({ asPath }) => ({ asPath });

export default DashboardWrapper;
