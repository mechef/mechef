// @flow
import React from 'react';
import type { OrderObject } from '../utils/flowTypes';
import { whiteColor, textHintColor } from '../utils/styleVariables';

type Props = {
  deliveryTimeTitle: string,
  buyerName: string,
  dishName: string,
  deliveryTime: string,
  quantity: number,
};

const MobileOrderItem = ({
  deliveryTimeTitle,
  buyerName,
  dishName,
  deliveryTime,
  quantity,
}: Props) => (
  <div className="container">
    <h3>{`@${buyerName}`}</h3>
    <h4>{dishName}</h4>
    <p className="quantity">{quantity}</p>
    <p className="divider" />
    <footer className="footer">
      <span>{deliveryTimeTitle}</span>
      <span>{deliveryTime}</span>
    </footer>
    <style jsx>
      {`
        .container {
          background-color: ${whiteColor};
          width: 100%;
          padding: 24px 20px;
          box-sizing: border-box;
        }
        .quantity {
          display: flex;
          justify-content: flex-end;
        }
        .divier {
          height: 1px;
          width: 100%;
          background-color: ${textHintColor};
        }
        .footer {
          display: flex;
          justify-content: space-between;
          color: ${textHintColor};
        }
      `}
    </style>
  </div>
);

export default MobileOrderItem;
