// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import BuyerHeader from '../components/BuyerHeader';
import BuyerFooter from '../components/BuyerFooter';
import CartItem from '../components/CartItem';

import { connect } from '../state/RxState';
import cartActions from '../actions/cartActions';
import type { CartObject, CartOrderObject } from '../utils/flowTypes';

import { fontSize } from '../utils/styleVariables';

type Props = {
  cart: CartObject,
  removeFromCart$: (index: number) => Rx.Observable,
  modifyOrderInCart$: (index: number, update: Object) => Rx.Observable,
};

type State = {
  orders: Array<CartOrderObject>,
  shipping: number,
  total: number,
  subTotal: number,
};

class Cart extends React.PureComponent<Props, State> {
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

    this.onOrderModified = this.onOrderModified.bind(this);
    this.onRemoveButtonClicked = this.onRemoveButtonClicked.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const subTotal = this.calculateSubTotal(nextProps.cart.orders);
    this.setState({
      subTotal,
      total: subTotal,
    });
  }

  formatPrice: Function;
  formatPrice(price) {
    return `$${price}.00`;
  }

  calculateSubTotal: Function;
  calculateSubTotal(orders) {
    return orders.reduce((total, order) => {
      return total + this.calculateOrderPrice(order);
    }, 0);
  }

  calculateOrderPrice: Function;
  calculateOrderPrice(order) {
    const quantity = order.quantity || 1;
    const unitPrice = order.unitPrice || 0;
    return quantity * unitPrice;
  }

  onOrderModified: Function;
  onOrderModified(id: number, update: Object) {
    this.props.modifyOrderInCart$(id, update);
  }

  onRemoveButtonClicked: Function;
  onRemoveButtonClicked(id: number) {
    this.props.removeFromCart$(id);
  }

  render() {
    const { cart } = this.props;

    const renderNoOrder = () => {
      return (
        <div className="cart-content__no-order">No Order</div>
      );
    };

    const renderOrders = (orders) => {
      return (
        <div className="cart-content">
          {
            orders.map(order => (
              <div>
                <CartItem
                  key={order._id}
                  order={order}
                  onOrderModified={this.onOrderModified}
                  onOrderRemoved={this.onRemoveButtonClicked}
                />
                <hr />
              </div>
            ))
          }
        </div>
      );
    };

    return (
      <div>
        <BuyerHeader />
        <div className="cart">
          <div className="cart-header">
            My Shopping Cart
          </div>
          <hr />
          {
            cart.orders && cart.orders.length > 0 ?
              renderOrders(cart.orders) :
              renderNoOrder()
          }
          <div className="cart-footer">
            <div className="cart-footer__item">
              <span className="cart-footer__item__label">SUBTOTAL</span>
              <span>{this.formatPrice(this.state.subTotal)}</span>
            </div>
            <div className="cart-footer__item">
              <span className="cart-footer__item__label">SHIPPING</span>
              <span>{this.formatPrice(this.state.shipping)}</span>
            </div>
            <hr />
            <div className="cart-footer__item">
              <span className="cart-footer__item__label">TOTAL</span>
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
              min-width: 326px;
            }
            .cart-footer__item .cart-footer__item__label {
              width: 120px;
              text-align; right;
            }
            .cart-footer__item .cart-footer__item__label + span {
              width: 153px;
              display: inline-block;
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

const actionSubjects = {
//   ...errorActions,
   ...cartActions,
 };

export default connect(stateSelector, actionSubjects)(Cart);
