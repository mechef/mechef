// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import { connect } from '../state/RxState';
import menuActions from '../actions/menuActions';
import deliveryActions from '../actions/deliveryActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import Modal from './Modal';
import MenuList from './MenuList';
import MenuEdit from './MenuEdit';
import DefaultComponent from './DefaultComponent';
import { MenuObject, MeetupObject } from '../utils/flowTypes';
import { whiteColor, primaryColor, textColor, primaryBtnHoverColor } from '../utils/styleVariables';
import Spinner from '../components/Spinner';

type Props = {
  delivery: {
    meetupList: Array<MeetupObject>,
  },
  menu: {
    menuList: Array<MenuObject>,
    currentMenuId: string,
    isLoading: boolean,
  },
  fetchMenus$: any => Rx.Observable,
  setLoading$: boolean => Rx.Observable,
  createMenu$: (menu: MenuObject) => Rx.Observable,
  updateMenu$: (menu: MenuObject) => Rx.Observable,
  deleteMenu$: (menuId: string) => Rx.Observable,
  setCurrentMenuId$: (menuId: string) => Rx.Observable,
  setFields$: (menu: MenuObject) => Rx.Observable,
  uploadImage$: File => Rx.Observable,
  fetchDelivery$: any => Rx.Observable,
  setError$: ({ isShowModal: boolean, title: string, message: string }) => Rx.Observable,
  error: {
    title: string,
    message: string,
    isShowModal: bool,
  },
  global: {
    backArrow: {
      isShow: boolean,
      title: string,
    },
  },
  toggleBackArrow$: string => Rx.Observable,
}

export class MenuPage extends React.Component<Props> {
  componentWillMount() {
    this.props.setLoading$(true);
  }
  componentDidMount() {
    this.props.fetchMenus$();
  }
  render() {
    const {
      delivery: { meetupList },
      menu: { menuList, currentMenuId, updatedMenu, isLoading },
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
    const currentMenu = menuList && menuList.find(menu => menu._id === currentMenuId) || {};

    return (
      <div className="container">
        {
          error.isShowModal ?
            <Modal
              title={error.title}
              message={error.message}
              onCancel={() => setError$({ isShowModal: false, title: '', message: '' })}
            />
            : null
        }
        {
          isLoading ?
            <Spinner />
            :
            null
        }
        {
          // eslint-disable-next-line no-nested-ternary
          backArrow.isShow ?
            <MenuEdit
              menuList={menuList}
              updatedMenu={updatedMenu}
              currentMenu={currentMenu}
              onChangeField={setFields$}
              onCreateMenu={createMenu$}
              onUpdateMenu={updateMenu$}
              onDeleteMenu={menuId => deleteMenu$(menuId)}
              onUploadImage={uploadImage$}
              goBack={() => toggleBackArrow$('')}
              fetchDelivery={this.props.fetchDelivery$}
              deliveryList={meetupList}
            />
            :
            menuList && menuList.length ?
              <MenuList
                menuList={menuList}
                onEditMenu={(menuId) => {
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
              />
              : !isLoading ?
                <DefaultComponent
                  coverPhotoSrc="../static/img/menu_default.jpg"
                >
                  <div className="textSection">
                    <h2 className="title">Hello there!</h2>
                    <p className="description">Fill this place with your signature dishes, build your own menu!</p>
                  </div>
                  <button
                    className="addDish"
                    onClick={() => {
                      setCurrentMenuId$('');
                      toggleBackArrow$('Edit Menu');
                    }}
                  >
                    ADD DISH
                  </button>
                </DefaultComponent>
                : null
        }
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


const stateSelector = ({ delivery, menu, error, global }) => ({ delivery, menu, error, global });

const actionSubjects = {
  ...errorActions,
  ...menuActions,
  ...deliveryActions,
  ...globalActions,
};

export default connect(stateSelector, actionSubjects)(MenuPage);
