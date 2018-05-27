// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import BuyerHeader from '../components/BuyerHeader';
import BuyerFooter from '../components/BuyerFooter';
import CartItem from '../components/CartItem';

import { connect } from '../state/RxState';
import kitchenActions from '../actions/kitchenActions';
import cartActions from '../actions/cartActions';
import type { CartObject, CartOrderObject } from '../utils/flowTypes';

import { fontSize } from '../utils/styleVariables';

type Props = {
  url: {
    query: {
      kitchen: string,
    }
  },
  cart: CartObject,
  restoreCart$: (kitchen: string) => Rx.Observable,
  removeFromCart$: ({ kitchen: string, id: number }) => Rx.Observable,
  modifyOrderInCart$: ({ kitchen: string, order: CartOrderObject }) => Rx.Observable,
};

type State = {
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
      subTotal,
      shipping,
      total: subTotal,
    };

    this.onOrderModified = this.onOrderModified.bind(this);
    this.onRemoveButtonClicked = this.onRemoveButtonClicked.bind(this);
  }

  componentDidMount() {
    this.props.restoreCart$(this.props.url.query.kitchen);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.updatePrices(nextProps.cart.orders);
  }

  onOrderModified: Function;
  onOrderModified(order: CartOrderObject) {
    this.props.modifyOrderInCart$({ order, kitchen: this.props.url.query.kitchen });
  }

  onRemoveButtonClicked: Function;
  onRemoveButtonClicked(id: number) {
    this.props.removeFromCart$({ kitchen: this.props.url.query.kitchen, id });
  }

  calculateOrderPrice: Function;
  calculateOrderPrice = ({ quantity = 1, unitPrice = 0 }) => quantity * unitPrice;

  calculateSubTotal: Function;
  calculateSubTotal(orders) {
    return orders.reduce((total, order) => total + this.calculateOrderPrice(order), 0);
  }

  formatPrice: Function;
  formatPrice = price => `$${price}.00`;

  updatePrices: Function;
  updatePrices(orders: Array<CartOrderObject>) {
    const subTotal = this.calculateSubTotal(orders);
    const total = subTotal;
    this.setState({
      subTotal,
      total,
    });
  }

  render() {
    const { cart } = this.props;

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
              <div className="cart-content">
                {
                  cart.orders.map(order => (
                    <div key={order._id}>
                      <CartItem
                        order={order}
                        onOrderModified={this.onOrderModified}
                        onOrderRemoved={this.onRemoveButtonClicked}
                      />
                      <hr />
                    </div>
                  ))
                }
              </div> :
              <div className="cart-content__no-order">Cart is empty</div>
          }
          {
            cart.orders && cart.orders.length > 0 ?
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
              </div> :
              null
          }
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
              min-width: 596px;
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
              display: flex;
              justify-content: center;
              flex-basis: auto;
              flex-grow: 1;
              align-items: center;
              min-height: 120px;
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

const stateSelector = ({ cart, error }) => ({
  cart,
  error,
});

const actionSubjects = {
//   ...errorActions,
  ...kitchenActions,
  ...cartActions,
};

export default connect(stateSelector, actionSubjects)(Cart);
