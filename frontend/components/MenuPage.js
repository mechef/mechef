// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import { connect } from '../state/RxState';
import menuActions from '../actions/menuActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import ErrorModal from './ErrorModal';
import MenuList from './MenuList';
import MenuEdit from './MenuEdit';
import MenuDefault from './MenuDefault';
import { MenuObject } from '../utils/flowTypes';

type Props = {
  menu: {
    menuList: Array<MenuObject>,
    currentMenuId: string,
  },
  fetchMenus$: any => Rx.Observable,
  createMenu$: (menu: MenuObject) => Rx.Observable,
  updateMenu$: (menu: MenuObject) => Rx.Observable,
  deleteMenu$: (menuId: string) => Rx.Observable,
  setCurrentMenuId$: (menuId: string) => Rx.Observable,
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
  componentDidMount() {
    // this.props.fetchMenus$();
  }
  render() {
    const {
      menu: { menuList, currentMenuId },
      setError$,
      error,
      global: { backArrow },
      createMenu$,
      updateMenu$,
      deleteMenu$,
      toggleBackArrow$,
      setCurrentMenuId$,
    } = this.props;
    return (
      <div className="container">
        {
          error.isShowModal ?
            <ErrorModal
              title={error.title}
              message={error.message}
              onCancel={() => setError$({ isShowModal: false, title: '', message: '' })}
            />
            : null
        }
        {
          // eslint-disable-next-line no-nested-ternary
          backArrow.isShow ?
            <MenuEdit
              menuList={menuList}
              currentMenuId={currentMenuId}
              onCreateMenu={createMenu$}
              onUpdateMenu={updateMenu$}
              onDeleteMenu={menuId => deleteMenu$(menuId)}
              goBack={() => toggleBackArrow$('')}
            />
            :
            menuList && menuList.length ?
              <MenuList
                menuList={menuList}
                onEditMenu={(menuId) => {
                  setCurrentMenuId$(menuId);
                  toggleBackArrow$('Edit Menu');
                }}
                onTogglePublish={(menuId) => {
                  console.log('menuId:', menuId);
                }}
              />
              : <MenuDefault
                onClick={() => {
                  setCurrentMenuId$('');
                  toggleBackArrow$('Edit Menu');
                }}
              />
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
          `}
        </style>
      </div>
    );
  }
}


const stateSelector = ({ menu, error, global }) => ({ menu, error, global });

const actionSubjects = {
  ...errorActions,
  ...menuActions,
  ...globalActions,
};

export default connect(stateSelector, actionSubjects)(MenuPage);
