// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';
import Link from 'next/link';
import Router from 'next/router';

import { connect } from '../state/RxState';
import DashboardPageRouter from '../components/DashboardPageRouter';
import globalActions from '../actions/globalActions';

type Props = {
  asPath: string,
  global: {
    backArrow: {
      isShow: boolean,
      title: string,
    },
  },
  toggleBackArrow$: string => Rx.Observable,
}

type State = {
  asPath: string,
}

class Dashboard extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    // TODO: Move asPath to the store
    this.state = {
      asPath: props.asPath,
    };
    this.navigate = this.navigate.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      asPath: nextProps.asPath,
    });
  }

  navigate: Function;

  navigate(path: string) {
    Router.push('/dashboard', `/dashboard/${path}`);
    if (this.props.global.backArrow.isShow) {
      this.props.toggleBackArrow$('');
    }
  }

  render() {
    const { global: { backArrow }, toggleBackArrow$ }: Props = this.props;
    return (
      <div className="dashboard">
        <input type="checkbox" id="dashboard-header__menu-toggle" hidden />
        <div className="dashboard__left">
          <div className="dashboard-sidebar">
            <div className="dashboard-sidebar__inner">
              <img src="../static/logo.png" alt="logo" />
              <ul className="dashboard-sidebar__menu">
                <li className={this.state.asPath === '/dashboard/home' ? 'active' : ''}><Link href="/dashboard"><a>HOME</a></Link></li>
                <li className={this.state.asPath === '/dashboard/menu' ? 'active' : ''}><Link href="/menu"><a>MENU</a></Link></li>
                <li className={this.state.asPath === '/dashboard/order' ? 'active' : ''}><a role="link" tabIndex="-1" onClick={() => this.navigate('order')}>ORDERS</a></li>
                <li className={this.state.asPath === '/dashboard/ingredient' ? 'active' : ''}><a role="link" tabIndex="-1" onClick={() => this.navigate('ingredient')}>INGREDIENTS</a></li>
                <li className={this.state.asPath === '/dashboard/shipping' ? 'active' : ''}><a role="link" tabIndex="-1" onClick={() => this.navigate('shipping')}>SHIPPING</a></li>
                <li className={this.state.asPath === '/dashboard/account' ? 'active' : ''}><a role="link" tabIndex="-1" onClick={() => this.navigate('account')}>ACCOUNT</a></li>
                <li className={this.state.asPath === '/dashboard/settings' ? 'active' : ''}><Link href="/setting"><a>SETTINGS</a></Link></li>
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
                  <div role="button" tabIndex="-1" className="dashboard-header__menu" onClick={() => toggleBackArrow$('')}>
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
                transition: .25s ease-in-out;
              }
              body {
                margin: 0px;
              }
              .dashboard {
                display: flex;
              }
              .dashboard__left {
                width: 240px;
                display: flex;
                background-color: #252525;
              }
              .dashboard__right {
                flex: 5;
                height: 100%;
              }
              @media all and (max-width: 600px) {
                .dashboard__left {
                  flex: 1;
                }
              }
              .dashboard-sidebar {
                width: 100%;
                min-height: 882px;
                height: 100%;
              }

              .dashboard-sidebar__inner {
                padding-top: 28px;
                padding-bottom: 28px;
              }

              .dashboard-sidebar__menu {
                list-style-type: none;
                padding: 0px;
              }
              .dashboard-sidebar__menu > li {
                padding-left: 36px;
                width: 108px;
                height: 50px;
                cursor: pointer;
              }
              .dashboard-sidebar__menu > li:hover {
                border-left: 9px solid #8cc63f;
              }
              .dashboard-sidebar__menu > li.active {
                border-left: 9px solid #8cc63f;
              }
              .dashboard-sidebar__menu > li > a {
                line-height: 50px;
                width: 75.9px;
                height: 19px;
                font-family: AvenirNext;
                font-size: 14px;
                letter-spacing: 1px;
                color: #ffffff;
                text-decoration: none;
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
                display: flex;
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

              .dashboard-header__menu {
                padding-left: 8px;
                padding-right: 8px;
              }

              .dashboard-header__menu:hover {
                border-radius: 4px;
                background: #3f9f40;
                cursor: pointer;
              }

              .dashboard-header__menu:hover > i, .dashboard-header__menu:hover > span {
                color: #ffffff;
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
                display: flex;
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

const DashboardWrapper = connect(({ global }) => ({ global }), { ...globalActions })(Dashboard);

export default DashboardWrapper;
