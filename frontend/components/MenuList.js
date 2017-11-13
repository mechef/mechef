// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import { MenuObject } from '../utils/flowTypes';
import MenuItem from './MenuItem';
import { whiteColor, borderRadius, fontSize, lineHeight, placeholderTextColor, textColor } from '../utils/styleVariables';

type Props = {
  menuList: Array<MenuObject>,
  // eslint-disable-next-line react/no-unused-prop-types
  onTogglePublish: (menuId: string) => Rx.Observable,
  onEditMenu: (menuId: string) => Rx.Observable,
  onDeleteMenu: (menuId: string) => Rx.Observable,
}

const MenuList = (props: Props) => (
  <div className="wrapper">
    <div className="header">
      <span className="title">MENUS</span>
      <button className="addButton" onClick={() => props.onEditMenu('')}>
        <div className="plus" />
      </button>
    </div>
    {
      props.menuList.map(menu => (
        <div className="menuItemWrapper">
          <MenuItem
            dishName={menu.dishName}
            description={menu.description}
            thumbnailUrl={menu.thumbnailUrl}
            isPublish={menu.isPublish}
            onTogglePublish={() => props.onTogglePublish(menu._id)}
            onEdit={() => props.onEditMenu(menu._id)}
            onDelete={() => props.onDeleteMenu(menu._id)}
          />
        </div>
      ))
    }
    <style jsx>
      {`
        .wrapper {
          height: 791px;
          overflow: scroll;
        }

        .header {
          display: flex;
          padding-bottom: 22px;
          align-items: center;
        }
        .title {
          font-size: 18px;
          line-height: 1.11;
          letter-spacing: 0.5px;
          color: #4a4a4a;
        }
        .addButton {
          display: flex;
          width: 36px;
          height: 36px;
          margin-left: 20px;
          border-radius: 4px;
          background-color: ${whiteColor};
          cursor: pointer;
          outline: none;
          border: 0;
          outline: none;
        }

        .plus {
          margin: auto;
          background-image: url('../static/img/plus.png');
          background-size: contain;
          background-position: center;
          background-repeat:no-repeat;
          width: 18px;
          height: 18px;
          outline: none;
        }

        .addButton:hover .plus {
          background-image: url('../static/img/plus_hover.png');
        }

        .menuItemWrapper {
          margin-bottom: 16px;
        }
      `}
    </style>
  </div>
);


export default MenuList;
