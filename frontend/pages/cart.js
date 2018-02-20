// @flow

import * as React from 'react';

import BuyerHeader from '../components/BuyerHeader';
import BuyerFooter from '../components/BuyerFooter';

import { connect } from '../state/RxState';
import type { CartObject, CartOrderObject } from '../utils/flowTypes';

import { fontSize } from '../utils/styleVariables';

type Props = {
  cart: CartObject,
};

type State = {
  orders: Array<CartOrderObject>,
  shipping: number,
  total: number,
  subTotal: number,
};

class Cart extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const subTotal = this.calculateSubTotal(props.cart.orders);
    const shipping = 0;
    this.state = {
      orders: [ ...props.cart.orders ],
      subTotal,
      shipping,
      total: subTotal + shipping,
    };
  }

  formatPrice(price) {
    return `$${price}.00`;
  }

  calculateSubTotal(orders) {
    return orders.reduce((total, order) => {
      return total + this.calculateOrderPrice(order);
    }, 0);
  }

  calculateOrderPrice(order) {
    const quantity = order.quantity || 1;
    const unitPrice = order.unitPrice || 0;
    return quantity * unitPrice;
  }

  render() {
    const { cart } = this.props;

    const renderNoOrder = () => {
      return (
        <div className="cart-content__no-order">No Order</div>
      );
    };

    const renderOrders = (orders) => {
      return orders && orders.forEach(order => (
        <div>order.dishName</div>
      ));
    };

    return (
      <div>
        <BuyerHeader />
        <div className="cart">
          <div className="cart-header">
            My Shopping Cart
          </div>
          <hr />
          <div className="cart-content">
            {
              !cart.orders || cart.orders.length === 0 ?
                renderNoOrder() :
                renderOrders(cart.orders)
            }
          </div>
          <div className="cart-footer">
            <div className="cart-footer__item">
              <span>SUBTOTAL</span>
              <span>{this.formatPrice(this.state.subTotal)}</span>
            </div>
            <div className="cart-footer__item">
              <span>SHIPPING</span>
              <span>{this.formatPrice(this.state.shipping)}</span>
            </div>
            <hr />
            <div className="cart-footer__item">
              <span>TOTAL</span>
              <span>{this.formatPrice(this.state.total)}</span>
            </div>
          </div>
        </div>
        <BuyerFooter />
        <style jsx>
          {`
            body {
              font-size: ${fontSize};
              letter-spacing: 0.6px;
            }
            hr {
              width: 100%;
              height: 2px;
              opacity: 0.3;
              background-color: #9b9b9b;
            }
            .cart {
              margin: 0 100px;
            }
            .cart-header {
              width: 100%;
              padding: 90px 0 30px;
              font-family: Playball;
              font-size: 30px;
              line-height: 1;
              color: #525252;
              text-align: center;
            }
            .cart-content__no-order {
              text-align: center;
              width: 100%;
            }
            .cart-footer {
              line-height: 24px;
              text-align: right;
              padding-bottom: 100px;
            }
            .cart-footer__item {
              padding: 25px 50px;
            }
            .cart-footer > .cart-footer__item + .cart-footer__item {
              padding-top: 18px;
            }
          `}
        </style>
      </div>
    );
  }
}

const stateSelector = ({ cart, error, global }) => ({ cart, error });

// const actionSubjects = {
//   ...errorActions,
//   ...kitchenActions,
// };

export default connect(stateSelector, {})(Cart);
