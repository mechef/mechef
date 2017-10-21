// @flow
import React from 'react';

import CartButton from './CartButton';

const BuyerHeader = () => (
  <div className="buyerHeader">
    <img className="logo" src="/static/food.png" alt="mechef" />
    <div className="buyerContainer">
      <CartButton itemCount={100} onCartClicked={() => console.log('cart is clicked')} />
    </div>
    <style jsx>
      {`
        .buyerHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 90px;
          background-color: #ffffff;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
        }
        .logo {
          height: 70px;
          width: 113px;
          margin: 13px 0px 7px 89px;
        }
        .buyerContainer {
          padding-right: 100px;
          height: 30px;
        }
        .buyerAvatar {
          width: 30px;
          height: 30px;
          border-radius: 15px;
          cursor: pointer;
        }
      `}
    </style>
  </div>
);

export default BuyerHeader;
