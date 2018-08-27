// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';
import Router from 'next/router';
import { translate } from 'react-i18next';
import i18n from '../i18n';

import BuyerHeader from '../components/BuyerHeader';
import BuyerFooter from '../components/BuyerFooter';
import CartItem from '../components/CartItem';
import Button from '../components/Button';
import { connect } from '../state/RxState';
import kitchenActions from '../actions/kitchenActions';
import cartActions from '../actions/cartActions';
import type { CartObject, CartOrderObject } from '../utils/flowTypes';

import { smallBreak, fontSize } from '../utils/styleVariables';

type Props = {
  t: (key: string) => string,
  url: {
    query: {
      kitchenName: string,
    },
  },
  cart: CartObject,
  restoreCart$: (kitchen: string) => Rx.Observable,
  removeFromCart$: ({ kitchenName: string, dishId: number }) => Rx.Observable,
  modifyOrderInCart$: ({
    kitchen: string,
    order: CartOrderObject,
  }) => Rx.Observable,
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
    this.props.restoreCart$(this.props.url.query.kitchenName);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.updatePrices(nextProps.cart.orders);
  }

  onOrderModified: Function;

  onOrderModified(order: CartOrderObject) {
    this.props.modifyOrderInCart$({
      order,
      kitchen: this.props.url.query.kitchenName,
    });
  }

  onRemoveButtonClicked: Function;

  onRemoveButtonClicked(dishId: number) {
    this.props.removeFromCart$({
      kitchenName: this.props.url.query.kitchenName,
      dishId,
    });
  }

  calculateOrderPrice: Function;

  calculateOrderPrice = ({ quantity = 1, unitPrice = 0 }) =>
    quantity * unitPrice;

  calculateSubTotal: Function;

  calculateSubTotal(orders) {
    return orders.reduce(
      (total, order) => total + this.calculateOrderPrice(order),
      0,
    );
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
    const { cart, t, url } = this.props;
    const { subTotal, shipping, total } = this.state;

    return (
      <div className="wrapper">
        <BuyerHeader cart={cart} kitchenName={url.query.kitchenName} />
        <div className="cart">
          <div className="cart-header">
            {t('shoppingcart_my_shopping_cart')}
          </div>
          <hr />
          {cart.orders && cart.orders.length > 0 ? (
            <div className="cart-content">
              {cart.orders.map(order => (
                <div key={order._id}>
                  <CartItem
                    order={order}
                    onOrderModified={this.onOrderModified}
                    onOrderRemoved={this.onRemoveButtonClicked}
                  />
                  <hr />
                </div>
              ))}
            </div>
          ) : (
            <div className="cart-content__no-order">
              {t('shoppingcart_empty_cart')}
            </div>
          )}
          {cart.orders && cart.orders.length > 0 ? (
            <div className="cart-footer">
              <div className="cart-footer__item">
                <span className="cart-footer__item__label">
                  {t('shoppingcart_subtotal')}
                </span>
                <span>{this.formatPrice(subTotal)}</span>
              </div>
              <div className="cart-footer__item">
                <span className="cart-footer__item__label">
                  {t('shoppingcart_shipping_c')}
                </span>
                <span>{this.formatPrice(shipping)}</span>
              </div>
              <hr />
              <div className="cart-footer__item">
                <span className="cart-footer__item__label">
                  {t('shoppingcart_total')}
                </span>
                <span>{this.formatPrice(total)}</span>
              </div>
              <div className="cart-footer__buttons-container">
                <Button
                  buttonStyle="greenBorderOnly"
                  onClick={() => {
                    Router.push({
                      pathname: `/kitchen/${url.query.kitchenName}`,
                    });
                  }}
                >
                  {t('shoppingcart_continue_shopping')}
                </Button>
                <Button
                  buttonStyle="primary"
                  onClick={() => {
                    Router.push({
                      pathname: `/kitchen/${url.query.kitchenName}/checkout`,
                    });
                  }}
                >
                  {t('shoppingcart_place_order')}
                </Button>
              </div>
            </div>
          ) : null}
        </div>
        <BuyerFooter />
        <style jsx>
          {`
            body {
              font-size: ${fontSize};
              letter-spacing: 0.6px;
            }
            .wrapper {
              display: flex;
          flex-direction: column;
          min-height: 100vh;
          justify-content: space-between;
            }
            hr {
              width: calc(100% - 16px);
              margin: 0 8px;
              height: 2px;
              opacity: 0.3;
              background-color: #9b9b9b;
            }
            @media (min-width: ${smallBreak}) {
              hr {
                margin: 0;
                width: 100%;
              }
            }
            .cart {
              margin: 0;
              min-width: 100%;
            }
            @media (min-width: ${smallBreak}) {
              .cart {
                margin: 0 100px;
                min-width: 596px;
              }
            }
            .cart-header {
              width: 100%;
              padding: 52px 0 20px;
              font-family: Playball;
              font-size: 1.8rem;
              line-height: 1;
              color: #525252;
              text-align: center;
            }
            @media (min-width: ${smallBreak}) {
              .cart-header {
                padding: 90px 0 30px;
                font-size: 30px;
              }
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
              text-align: right;
              padding-bottom: 40px;
            }
            @media (min-width: ${smallBreak}) {
              .cart-footer {
                line-height: 24px;
                padding-bottom: 100px;
              }
            }
            .cart-footer__item {
              padding: 21px 24px;
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
            }
            @media (min-width: ${smallBreak}) {
              .cart-footer__item {
                padding: 24px 50px;
                min-width: 326px;
                justify-content: flex-end;
              }
            }
            .cart-footer__item + .cart-footer__item {
              padding-top: 0;
            }
            .cart-footer__item .cart-footer__item__label {
              display: block;
              width: 150px;
              text-align; right;
            }
            .cart-footer__item .cart-footer__item__label + span {
              width: 125px;
              display: block;
            }
            @media (min-width: ${smallBreak}) {
              .cart-footer__item .cart-footer__item__label + span {
                width: 160px;
              }
            }
            .cart-footer__buttons-container {
              padding: 48px 24px 0;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .cart-footer__buttons-container :global(button) {
              width: 100%;
            }
            .cart-footer__buttons-container :global(button:not(:last-child)) {
              margin-bottom: 20px;
            }
            @media (min-width: ${smallBreak}) {
              .cart-footer__buttons-container {
                padding: 28px 0 0;
                flex-direction: row;
                justify-content: space-between;
              }
              .cart-footer__buttons-container :global(button) {
                width: 212px;
              }
              .cart-footer__buttons-container :global(button:not(:last-child)) {
                margin-bottom: 0;
              }
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

const Extended = translate(['common'], { i18n, wait: process.browser })(Cart);

export default connect(
  stateSelector,
  actionSubjects,
)(Extended);
