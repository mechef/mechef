// @flow
import React from 'react';
import Router from 'next/router';

import CartButton from './CartButton';

import { connect } from '../state/RxState';
import type { CartObject } from '../utils/flowTypes';

type Props = {
  cart: CartObject,
};

const BuyerHeader = ({ cart }) => (
  <div className="buyer-header">
    <div className="buyer-header--left">
      <img className="buyer-header__logo" src="/static/img/food.png" alt="mechef" />
    </div>
    <div className="buyer-header--right">
      <span className="buyer-header__link">FAQ</span>
      <span className="buyer-header__link">HOW IT WORKS</span>
      <span className="buyer-header__cart">
        <CartButton
          itemCount={cart.orders ? cart.orders.reduce((total, order) => total + (order.quantity || 0), 0) : 0}
          onCartClicked={() => {
            Router.push({
                pathname: '/cart',
              });
          }}
        />
      </span>
    </div>
    <style jsx>
      {`
        .buyer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 90px;
          background-color: #ffffff;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
          font-family: Ubuntu;
        }
        .buyer-header--left {
          margin: 13px 0px 7px 89px;
        }
        .buyer-header__logo {
          height: 70px;
          width: 113px;
        }
        .buyer-header--right {
          padding-right: 100px;
          height: 30px;
          display: inline-flex;
          flex-grow: 1;
          align-items: center;
          justify-content: flex-end;
        }
        .buyer-header__link {
          cursor: pointer;
          font-size: 15px;
          line-height: 1;
          letter-spacing: 0.6;
          color: #4a4a4a;
          margin-right: 30px;
        }
      `}
    </style>
  </div>
);

const stateSelector = ({ cart }) => ({ cart });

export default connect(stateSelector, {})(BuyerHeader);
