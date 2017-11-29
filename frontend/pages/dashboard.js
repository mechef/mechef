// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';
import Router from 'next/router';

import { connect } from '../state/RxState';
import DashboardPageRouter from '../components/DashboardPageRouter';
import globalActions from '../actions/globalActions';
import { primaryColor, transparent, btnTextColor, textHintColor } from '../utils/styleVariables';

type Props = {
  url: {
    query: {
      page?: string,
    },
    pathname: string,
  },
  global: {
    backArrow: {
      isShow: boolean,
      title: string,
    },
  },
  toggleBackArrow$: string => Rx.Observable,
  showSpinner$: boolean => Rx.Observable,
}

type State = {
  page: string,
}

class Dashboard extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      page: props.url.query.page || 'home',
    };
    this.navigate = this.navigate.bind(this);
  }

  componentDidMount() {
    this.props.showSpinner$(false);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      page: nextProps.url.query.page,
    });
  }

  navigate: Function;

  navigate(path: string) {
    Router.push(`/dashboard?page=${path}`);
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
              <img src="../static/svg/mechef_logo_white.svg" alt="logo" />
              <ul className="dashboard-sidebar__menu">
                <li className={this.state.page === 'home' ? 'active' : ''} role="menuitem" onClick={() => this.navigate('home')}>HOME</li>
                <li className={this.state.page === 'menu' ? 'active' : ''} role="menuitem" onClick={() => this.navigate('menu')}>MENU</li>
                <li className={this.state.page === 'order' ? 'active' : ''} role="menuitem" tabIndex="-1" onClick={() => this.navigate('order')}>ORDERS</li>
                <li className={this.state.page === 'ingredient' ? 'active' : ''} role="menuitem" tabIndex="-1" onClick={() => this.navigate('ingredient')}>INGREDIENTS</li>
                <li className={this.state.page === 'shipping' ? 'active' : ''} role="menuitem" tabIndex="-1" onClick={() => this.navigate('shipping')}>SHIPPING</li>
                <li className={this.state.page === 'account' ? 'active' : ''} role="menuitem" tabIndex="-1" onClick={() => this.navigate('account')}>ACCOUNT</li>
                <li className={this.state.page === 'settings' ? 'active' : ''} role="menuitem" tabIndex="-1" onClick={() => this.navigate('setting')}>SETTINGS</li>
              </ul>
              <ul className="dashboard-sidebar__footer">
                <li>Service Agreement</li>
                <li>Privacy Policy</li>
                <li>Service</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Version 1.0</li>
                <li>@Mechef 2017</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="dashboard__right">
          <div className="dashboard-header">
            <div className="dashboard-header__wrapper">
              {
                backArrow && backArrow.isShow ?
                  <div className="dashboard-header__menu">
                    <div className="backArrow" role="button" tabIndex="-1" onClick={() => toggleBackArrow$('')} />
                    <span className="dashboard-header__title" >{backArrow.title}</span>
                  </div>
                  :
                  <div className="menuWrapper">
                    <label htmlFor="dashboard-header__menu-toggle" className="dashboard-header__menu">
                      <div className="drawerMenu" />
                    </label>
                    <span className="dashboard-header__title" >MENU</span>
                  </div>
              }
              <div className="dashboard-header__user-profile">
                <div className="dashboard-header__user-head" />
                <div className="dashboard-header__user-head" />
                <div className="dashboard-header__user-head" />
              </div>
            </div>
          </div>
          <DashboardPageRouter query={this.state.page} />
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

              .dashboard-sidebar__inner > img {
                padding-left: 45px;
                padding-bottom: 50px;
                width: 30%;
              }

              .dashboard-sidebar__menu {
                list-style-type: none;
                padding: 0px;
              }
              .dashboard-sidebar__menu > li {
                padding-left: 36px;
                outline: none;
                width: 100%;
                height: 50px;
                cursor: pointer;
                line-height: 50px;
                font-size: 14px;
                font-weight: 500;
                letter-spacing: 1px;
                color: ${btnTextColor};
                border-left: 9px solid ${transparent};
              }
              .dashboard-sidebar__menu > li:hover {
                border-left-color: ${primaryColor};
              }
              .dashboard-sidebar__menu > li.active {
                border-left-color: ${primaryColor};
              }

              .dashboard-sidebar__footer {
                list-style-type: none;
                padding: 0px;
              }

              .dashboard-sidebar__footer > li {
                height: 32px;
                padding-left: 45px;
                line-height: 32px;
                font-size: 12px;
                letter-spacing: 0.9px;
                color: ${textHintColor}
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

              .dashboard-header__title {
                margin-left: 24px;
                height: 20px;
                font-size: 18px;
                color: #4a4a4a;
              }

              .dashboard-header__menu {
                display: flex;
                padding-left: 8px;
                padding-right: 8px;
              }

              .menuWrapper {
                display: flex;
              }

              .drawerMenu {
                background-image: url('../static/img/drawer.png');
                background-size: contain;
                background-position: center;
                background-repeat:no-repeat;
                width: 20px;
                height: 20px;
                cursor: pointer;
              }

              .drawerMenu:hover {
                background-image: url('../static/img/drawer_hover.png');
              }

              .backArrow {
                background-image: url('../static/img/back.png');
                background-size: contain;
                background-position: center;
                background-repeat:no-repeat;
                width: 20px;
                height: 20px;
                cursor: pointer;
                outline: none;
              }

              .backArrow:hover {
                background-image: url('../static/img/back_hover.png');
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
