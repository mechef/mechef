// @flow

import React from 'react';
import Rx from 'rxjs/Rx';
import { translate } from 'react-i18next';
import i18n from '../i18n';
import { connect } from '../state/RxState';
import menuActions from '../actions/menuActions';
import deliveryActions from '../actions/deliveryActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import Modal from './Modal';
import MenuList from './MenuList';
import MenuEdit from './MenuEdit';
import DefaultComponent from './DefaultComponent';
import type { MenuObject, MeetupObject } from '../utils/flowTypes';
import {
  whiteColor,
  primaryColor,
  textColor,
  primaryBtnHoverColor,
} from '../utils/styleVariables';
import Spinner from '../components/Spinner';

type Props = {
  delivery: {
    meetupList: Array<MeetupObject>,
  },
  menu: {
    menuList: Array<MenuObject>,
    updatedMenuFields: MenuObject,
    currentMenuId: string,
    isLoading: boolean,
  },
  fetchMenus$: any => Rx.Observable,
  setMenuLoading$: boolean => Rx.Observable,
  createMenu$: (menu: MenuObject) => Rx.Observable,
  updateMenu$: (menu: MenuObject) => Rx.Observable,
  deleteMenu$: (menuId: string) => Rx.Observable,
  setCurrentMenuId$: (menuId: string) => Rx.Observable,
  setFields$: (menu: MenuObject) => Rx.Observable,
  uploadImage$: File => Rx.Observable,
  fetchDelivery$: any => Rx.Observable,
  setError$: ({
    isShowModal: boolean,
    title: string,
    message: string,
  }) => Rx.Observable,
  error: {
    title: string,
    message: string,
    isShowModal: boolean,
  },
  global: {
    backArrow: {
      isShow: boolean,
      title: string,
    },
  },
  toggleBackArrow$: string => Rx.Observable,
  t: (key: string) => string,
};

export class MenuPage extends React.Component<Props> {
  componentWillMount() {
    this.props.setMenuLoading$(true);
  }
  componentDidMount() {
    this.props.fetchMenus$();
  }
  render() {
    const {
      delivery: { meetupList },
      menu: { menuList, currentMenuId, updatedMenuFields, isLoading },
      setError$,
      error,
      global: { backArrow },
      createMenu$,
      updateMenu$,
      deleteMenu$,
      setFields$,
      uploadImage$,
      toggleBackArrow$,
      setCurrentMenuId$,
    } = this.props;
    const currentMenu =
      (menuList && menuList.find(menu => menu._id === currentMenuId)) || {};
    const displayMenu = { ...currentMenu, ...updatedMenuFields };
    return (
      <div className="container">
        {error.isShowModal ? (
          <Modal
            title={error.title}
            message={error.message}
            onCancel={() =>
              setError$({ isShowModal: false, title: '', message: '' })
            }
          />
        ) : null}
        {isLoading ? <Spinner /> : null}
        {backArrow.isShow ? (
          <MenuEdit
            menuList={menuList}
            displayMenu={displayMenu}
            onChangeField={setFields$}
            onCreateMenu={() => createMenu$(updatedMenuFields)}
            onUpdateMenu={() =>
              updateMenu$({ _id: currentMenu._id, ...updatedMenuFields })
            }
            onDeleteMenu={menuId => deleteMenu$(menuId)}
            onUploadImage={uploadImage$}
            goBack={() => toggleBackArrow$('')}
            fetchDelivery={this.props.fetchDelivery$}
            deliveryList={meetupList}
            onFormError={() =>
              setError$({
                isShowModal: true,
                title: 'Form Error',
                message: 'Please make sure the data you fill in is correct!',
              })
            }
            t={this.props.t}
          />
        ) : menuList && menuList.length ? (
          <MenuList
            menuList={menuList}
            onEditMenu={menuId => {
              setCurrentMenuId$(menuId);
              toggleBackArrow$('Edit Menu');
            }}
            onDeleteMenu={menuId => deleteMenu$(menuId)}
            onTogglePublish={(menuId, publish) => {
              updateMenu$({
                _id: menuId,
                publish,
              });
            }}
            t={this.props.t}
          />
        ) : !isLoading ? (
          <DefaultComponent coverPhotoSrc="../static/img/menu_default.jpg">
            <div className="textSection">
              <h2 className="title">{this.props.t('hello_there')}</h2>
              <p className="description">
                {this.props.t('menu_empty_description')}
              </p>
            </div>
            <button
              className="addDish"
              onClick={() => {
                setCurrentMenuId$('');
                toggleBackArrow$('Edit Menu');
              }}
            >
              {this.props.t('add_dish')}
            </button>
          </DefaultComponent>
        ) : null}
        <style jsx>
          {`
            .container {
              margin: 0;
              padding-top: 49px
              padding-left: 19px;
              width: 100%;
              min-height: 792px;
              height: 100%;
              background-color: #f8f7f7;
            }

            .textSection {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding-top: 31px;
            }
            .title {
              font-family: 'Playball', cursive;
              font-size: 24px;
              color: ${textColor};
            }

            .description {
              width: 315px;
              display: flex;
              justify-content: center;
              line-height: 1.5;
              font-size: 16px;
              text-align: center;
              color: ${textColor};
            }
            .addDish {
              border: 0;
              padding: 0;
              margin-top: 70px;
              background-color: ${whiteColor};
              color: ${primaryColor};
              font-size: 16px;
              margin: auto;
              cursor: pointer;
              outline: none;
            }
            .addDish:hover {
              color: ${primaryBtnHoverColor};
            }
          `}
        </style>
      </div>
    );
  }
}

const stateSelector = ({ delivery, menu, error, global }) => ({
  delivery,
  menu,
  error,
  global,
});

const actionSubjects = {
  ...errorActions,
  ...menuActions,
  ...deliveryActions,
  ...globalActions,
};
const Extended = translate(['common'], { i18n, wait: process.browser })(
  MenuPage,
);
export default connect(
  stateSelector,
  actionSubjects,
)(Extended);
