// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import {
  primaryColor,
  primaryBtnHoverColor,
  badgeBackgroundColor,
  btnTextColor,
  lineHeight,
} from '../utils/styleVariables';

type Props = {
  itemCount?: number,
  onCartClicked: () => Rx.Observable,
};

const CartButton = ({ itemCount = 0, onCartClicked }: Props) => (
  <div className="cartButtonContainer">
    <button
      type="button"
      className="cartButton"
      onClick={onCartClicked}
    >
      MY CART
    </button>
    {
      itemCount > 0 ?
        <div className="itemCountBadge">
          {itemCount > 99 ? '99+' : itemCount }
        </div> :
        ''
    }
    <style jsx>
      {`
        .cartButtonContainer {
          position: relative;
        }

        .cartButton {
          outline: none;
          border: 0;
          border-radius: 32px;
          height: 30px;
          padding: 0 24px;
          cursor: pointer;
          font-size: 12px;
          line-height: ${lineHeight};
          background-color: ${primaryColor};
          color: ${btnTextColor};
        }
        .cartButton:hover {
          background-color: ${primaryBtnHoverColor};
        }

        .itemCountBadge {
          position: absolute;
          top: -10px;
          right: -6px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: nowrap;
          color: ${btnTextColor};
          background-color: ${badgeBackgroundColor};
          border-radius: 50%;
          font-size: 11px;
          width: 24px;
          height: 24px;
        }
      `}
    </style>
  </div>
);

export default CartButton;
