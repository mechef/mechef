// @flow
import React from 'react';
import Router from 'next/router';

import CartButton from './CartButton';

import { connect } from '../state/RxState';
import type { CartObject } from '../utils/flowTypes';
import { textColor, smallBreak, whiteColor } from '../utils/styleVariables';

type Props = {
  cart: CartObject,
  kitchenName?: string,
};

const BuyerHeader = ({ cart, kitchenName = '' }: Props) => (
  <div className="buyer-header">
    <div className="buyer-header--left">
      <img
        className="buyer-header__logo"
        src="/static/img/food.png"
        alt="mechef"
      />
    </div>
    <div className="buyer-header--right">
      <span className="buyer-header__link">FAQ</span>
      <span className="buyer-header__link">HOW IT WORKS</span>
      <span className="buyer-header__cart">
        {kitchenName ? (
          <CartButton
            itemCount={
              cart.orders
                ? cart.orders.reduce(
                    (total, order) => total + (order.quantity || 0),
                    0,
                  )
                : 0
            }
            onCartClicked={() => {
              Router.push({
                pathname: `/cart/${encodeURIComponent(kitchenName)}`,
              });
            }}
          />
        ) : null}
      </span>
    </div>
    <style jsx>
      {`
        .buyer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 64px;
          background-color: ${whiteColor};
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
          font-family: Ubuntu;
        }
        .buyer-header--left {
          margin-left: 8px;
        }
        .buyer-header__logo {
          height: 50px;
        }
        .buyer-header--right {
          display: inline-flex;
          height: 30px;
          padding-right: 16px;
          flex-grow: 1;
          align-items: center;
          justify-content: flex-end;
        }
        .buyer-header__link {
          cursor: pointer;
          font-size: 1.5rem;
          line-height: 1;
          letter-spacing: 0.6;
          color: ${textColor};
          margin-right: 30px;
          display: none;
        }
        @media (min-width: ${smallBreak}) {
          .buyer-header {
            height: 90px;
          }
          .buyer-header--left {
            margin: 13px 0 7px 89px;
          }
          .buyer-header--right {
            padding-right: 64px;
          }
          .buyer-header__logo {
            height: 70px;
          }
          .buyer-header__link {
            display: inline;
          }
        }
      `}
    </style>
  </div>
);

const stateSelector = ({ cart }) => ({ cart });

export default connect(
  stateSelector,
  {},
)(BuyerHeader);
