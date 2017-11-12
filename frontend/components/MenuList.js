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
  onEditMenu: (meetupId: string) => Rx.Observable,
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
        <button key={menu._id} className="deliveryItem" onClick={() => props.onEditMenu(menu._id)}>
          <MenuItem
            dishName={menu.dishName}
            description={menu.description}
            thumbnailUrl={menu.thumbnailUrl}
            isPublish={menu.isPublish}
            onTogglePublish={() => props.onTogglePublish(menu._id)}
          />
        </button>
      ))
    }
    <style jsx>
      {`
        .wrapper {
          height: 791px;
          overflow: scroll;
        }

        .mapWrapper {
          width: 512px;
          height: 100px;
          margin-bottom: 12px;
        }

        .descriptionText {
          font-size: ${fontSize};
          line-height: ${lineHeight};
          color: ${placeholderTextColor};
          margin-bottom: 8px;
          margin-left: 21px;
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

        .deliveryItem {
          width: 512px;
          height: 226px;
          border: 0;
          border-radius: ${borderRadius};
          box-shadow: 0 5px 7px 0 rgba(201, 201, 201, 0.5);
          background-color: ${whiteColor};
          display: flex;
          flex-direction: column;
          margin-bottom: 12px;
          padding: 0;
          border-radius: 4px;
          background-color: #ffffff;
          cursor: pointer;
          outline: none;
          transition: all .2s ease-in-out;
        }

        .deliveryItem:hover {
          transform: scale(1.01);
        }

        .delivery-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-left: 21px;
        }
        .text {
          font-size: ${fontSize};
          font-weight: 500;
          line-height: ${lineHeight};
          color: ${textColor};
          padding-bottom: 12px;
        }
      `}
    </style>
  </div>
);


export default MenuList;
