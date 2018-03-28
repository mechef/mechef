// @flow
import * as React from 'react';
import Rx from 'rxjs/Rx';

import {
  addToCartButtonHeight,
} from '../utils/styleVariables';

type Props = {
  onAddToCartClick: Function,
};

const AddToCartButton = ({ onAddToCartClick }: Props) => (
  <div className="addToCartButtonContainer">
    <button className="addToCartButton" onClick={onAddToCartClick}>ADD TO CART</button>
    <style jsx>
      {`
        .addToCartButtonContainer {
          flex-grow: 0;
          display: flex;
          justify-content: center;
        }
        .addToCartButton {
          width: 228px;
          height: ${addToCartButtonHeight};
          border-radius: 4px;
          background-color: #3e9f40;
          color: #ffffff;
          font-size: 14px;
          cursor: pointer;
          box-shadow: none;
          outline: none;
          border: none;
        }
        .addToCartButton:hover {
          background-color: #367d36;
        }
      `}
    </style>
  </div>
);

export default AddToCartButton;
