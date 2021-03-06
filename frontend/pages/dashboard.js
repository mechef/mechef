// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';
import Router from 'next/router';
import Link from 'next/link';
import { translate } from 'react-i18next';
import { withRouter } from 'next/router';
import i18n from '../i18n';
import { connect } from '../state/RxState';
import DashboardPageRouter from '../components/DashboardPageRouter';
import globalActions from '../actions/globalActions';
import type { AccountObject } from '../utils/flowTypes';
import {
  primaryColor,
  transparent,
  btnTextColor,
  textHintColor,
  whiteColor,
} from '../utils/styleVariables';

type Props = {
  router: {
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
  t: (key: string) => string,
  account: {
    currentAccount: AccountObject,
  },
};

type State = {
  page: string,
};

const pageTitle = {
  home: 'HOME',
  menu: 'MENU',
  order: 'ORDER',
  ingredient: 'INGREDIENT',
  shipping: 'DELIVERY',
  account: 'ACCOUNT',
};

class Dashboard extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      page:
        props.router.query && props.router.query.page
          ? props.router.query.page
          : 'home',
    };
    this.navigate = this.navigate.bind(this);
    this.toggleSideBarRef = React.createRef();
  }

  toggleSideBarRef: { current: null | HTMLInputElement };

  componentDidMount() {
    this.props.showSpinner$(false);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.router.query && nextProps.router.query.page) {
      this.setState({
        page: nextProps.router.query.page,
      });
    }
  }

  navigate: Function;

  navigate(path: string) {
    Router.push(`/dashboard?page=${path}`);
    if (this.props.global.backArrow.isShow) {
      this.props.toggleBackArrow$('');
    }
    if (
      window.matchMedia('(max-width: 540px)').matches &&
      this.toggleSideBarRef.current
    ) {
      this.toggleSideBarRef.current.checked = true;
    }
  }

  render() {
    const {
      global: { backArrow },
      toggleBackArrow$,
    }: Props = this.props;
    return (
      <div className="dashboard">
        <input
          ref={this.toggleSideBarRef}
          type="checkbox"
          id="dashboard-header__menu-toggle"
          hidden
        />
        <div className="dashboard__left">
          <div className="dashboard-sidebar">
            <div className="dashboard-sidebar__inner">
              <div
                role="button"
                onClick={() => {
                  this.navigate('home');
                }}
                onKeyPress={() => {}}
                tabIndex="0"
              >
                <img src="../static/svg/mechef_logo_white.svg" alt="logo" />
              </div>
              <ul className="dashboard-sidebar__menu">
                <li
                  className={this.state.page === 'home' ? 'active' : ''}
                  role="menuitem"
                  onClick={() => this.navigate('home')}
                >
                  {this.props.t('home')}
                </li>
                <li
                  className={this.state.page === 'menu' ? 'active' : ''}
                  role="menuitem"
                  onClick={() => this.navigate('menu')}
                >
                  {this.props.t('menu')}
                </li>
                <li
                  className={this.state.page === 'order' ? 'active' : ''}
                  role="menuitem"
                  tabIndex="-1"
                  onClick={() => this.navigate('order')}
                >
                  {this.props.t('order')}
                </li>
                <li
                  className={this.state.page === 'ingredient' ? 'active' : ''}
                  role="menuitem"
                  tabIndex="-1"
                  onClick={() => this.navigate('ingredient')}
                >
                  {this.props.t('ingredients')}
                </li>
                <li
                  className={this.state.page === 'shipping' ? 'active' : ''}
                  role="menuitem"
                  tabIndex="-1"
                  onClick={() => this.navigate('shipping')}
                >
                  {this.props.t('delivery')}
                </li>
                <li
                  className={this.state.page === 'account' ? 'active' : ''}
                  role="menuitem"
                  tabIndex="-1"
                  onClick={() => this.navigate('account')}
                >
                  {this.props.t('account')}
                </li>
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
              {backArrow && backArrow.isShow ? (
                <div className="dashboard-header__menu">
                  <div
                    className="backArrow"
                    role="button"
                    tabIndex="-1"
                    onClick={() => toggleBackArrow$('')}
                  />
                  <span className="dashboard-header__title">
                    {backArrow.title}
                  </span>
                </div>
              ) : (
                <div className="menuWrapper">
                  <label
                    htmlFor="dashboard-header__menu-toggle"
                    className="dashboard-header__menu"
                  >
                    <div className="drawerMenu" />
                  </label>
                  <span className="dashboard-header__title">
                    {pageTitle[this.state.page]}
                  </span>
                </div>
              )}
              <div className="dashboard-header__user-profile">
                <Link
                  prefetch
                  href={{
                    pathname: `/kitchen/${
                      this.props.account.currentAccount.kitchenName
                        ? encodeURIComponent(
                            this.props.account.currentAccount.kitchenName,
                          )
                        : ''
                    }`,
                  }}
                >
                  <button className="dashboard-header__preview">
                    <img src="../static/svg/preview_icon.svg" />
                    <span className="preview-text">Preview</span>
                  </button>
                </Link>
                <div className="dashboard-header__user-head" />
              </div>
            </div>
          </div>
          <DashboardPageRouter query={this.state.page} />
        </div>
        <style jsx>
          {`
            * {
              transition: 0.25s ease-in-out;
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
              position: fixed;
              z-index: 99;
              min-height: 792px;
              height: 100%;
            }

            .dashboard__right {
              flex: 5;
              min-height: 100%;
              width: calc(100% - 240px);
              left: 240px;
              position: absolute;
            }
            .dashboard-sidebar {
              width: 100%;
            }

            .dashboard-sidebar__inner {
              padding-top: 28px;
              padding-bottom: 28px;
            }

            .dashboard-sidebar__inner div {
              width: 75px;
              margin-left: 45px;
              margin-bottom: 50px;
              cursor: pointer;
              outline: none;
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
              font-size: 1.4rem;
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
              font-size: 1.2rem;
              letter-spacing: 0.9px;
              color: ${textHintColor};
            }

            .dashboard-header {
              height: 90px;
              background-color: #ffffff;
              width: calc(100% - 240px);
              position: fixed;
              z-index: 99;
            }

            .dashboard-header__wrapper {
              padding-left: 20px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 100%;
            }

            .dashboard-header__title {
              margin-left: 24px;
              height: 20px;
              font-size: 1.8rem;
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
              background-repeat: no-repeat;
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
              background-repeat: no-repeat;
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
              left: 0;
            }

            #dashboard-header__menu-toggle:checked ~ .dashboard__left {
              margin-left: -240px;
            }

            #dashboard-header__menu-toggle:checked
              ~ .dashboard__right
              > .dashboard-header {
              width: 100%;
            }

            .dashboard-header__user-profile {
              display: flex;
              margin-right: 50px;
            }

            .dashboard-header__preview {
              background-color: ${primaryColor};
              width: 110px;
              height: 30px;
              border-radius: 32px;
              color: ${whiteColor};
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 1.2rem;
              cursor: pointer;
              outline: none;
              border: 0;
            }

            .preview-text {
              margin-left: 4px;
            }

            @media all and (max-width: 768px) {
              .dashboard-header__user-profile {
                display: none;
              }
              .dashboard-header {
                width: 100%;
              }
            }
            .dashboard-header__user-head {
              width: 30px;
              height: 30px;
              background-color: #d8d8d8;
              border-radius: 50%;
              margin-left: 16px;
            }

            /* home.css  */

            .dashboard-content__title {
              margin-bottom: 30px;
              font-size: 1.8rem;
              line-height: 1.11;
              letter-spacing: 0.5px;
              text-align: left;
              color: #4a4a4a;
            }

            .dashboard-content__header {
              width: 100%;
              height: 240px;
              background-image: url('../static/img/pancake.jpg');
              background-size: cover;
              background-position: center;
              position: relative;
            }

            .dashboard-content__header:after {
              content: '';
              position: absolute;
              top: 200px;
              left: 20px;
              background-image: url('../static/img/avatar.jpg');
              background-size: cover;
              background-position: center;
              width: 80px;
              height: 80px;
              border-radius: 40px;
            }

            @media (max-width: 540px) {
              .dashboard__right {
                width: 100%;
                left: 0;
              }
              .dashboard__left {
                top: 90px;
              }
            }
          `}
        </style>
      </div>
    );
  }
}

const Extended = translate(['common'], {
  i18n,
  wait: typeof window !== 'undefined',
})(Dashboard);

const DashboardWrapper = connect(
  ({ global, account }) => ({ global, account }),
  {
    ...globalActions,
  },
)(Extended);

export default withRouter(DashboardWrapper);
