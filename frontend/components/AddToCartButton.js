// @flow
import * as React from 'react';

import {
  addToCartButtonHeight,
  addToCartButtonWidth,
  primaryColor,
  primaryBtnHoverColor,
  btnTextColor,
  borderRadius,
  fontSize,
} from '../utils/styleVariables';

type Props = { onAddToCartClick: Function };

const AddToCartButton = ({ onAddToCartClick }: Props) => (
  <div className="addToCartButtonContainer">
    <button
      className="addToCartButton"
      onClick={onAddToCartClick}
    >
      ADD TO CART
    </button>
    <style jsx>
      {`
        .addToCartButtonContainer {
          flex-grow: 0;
          display: flex;
          justify-content: center;
        }
        .addToCartButton {
          width: ${addToCartButtonWidth};
          height: ${addToCartButtonHeight};
          border-radius: ${borderRadius};
          background-color: ${primaryColor};
          color: ${btnTextColor};
          font-size: ${fontSize};
          cursor: pointer;
          box-shadow: none;
          outline: none;
          border: none;
        }
        .addToCartButton:hover {
          background-color: ${primaryBtnHoverColor};
        }
      `}
    </style>
  </div>
);

export default AddToCartButton;
