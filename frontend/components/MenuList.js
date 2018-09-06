// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import type { MenuObject } from '../utils/flowTypes';
import MenuItem from './MenuItem';
import {
  whiteColor,
  borderRadius,
  fontSize,
  lineHeight,
  placeholderTextColor,
  textColor,
} from '../utils/styleVariables';
import { IMAGE_URL } from '../utils/constants';

type Props = {
  menuList: Array<MenuObject>,
  onTogglePublish: (menuId: string, publish: boolean) => Rx.Observable,
  onEditMenu: (menuId: string) => Rx.Observable,
  onDeleteMenu: (menuId: string) => Rx.Observable,
};

const MenuList = (props: Props) => (
  <div className="wrapper">
    <div className="header">
      <span className="title">MENUS</span>
      <button className="addButton" onClick={() => props.onEditMenu('')}>
        <div className="plus" />
      </button>
    </div>
    {props.menuList.map(menu => (
      <div key={menu._id} className="menuItemWrapper">
        <MenuItem
          dishName={menu.dishName || ''}
          description={menu.description || ''}
          thumbnailUrl={
            menu.images && menu.images.length
              ? `${IMAGE_URL}/${menu.images[0]}`
              : ''
          }
          isPublish={menu.publish || false}
          onTogglePublish={() =>
            props.onTogglePublish(menu._id || '', !menu.publish)
          }
          onEdit={() => props.onEditMenu(menu._id || '')}
          onDelete={() => props.onDeleteMenu(menu._id || '')}
        />
      </div>
    ))}
    <style jsx>
      {`
        .header {
          display: flex;
          padding-bottom: 22px;
          align-items: center;
        }
        .title {
          font-size: 1.8rem;
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
          background-repeat: no-repeat;
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
