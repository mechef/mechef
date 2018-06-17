// @flow

import * as React from 'react';

import ServingModifier from './ServingModifier';

import type { CartOrderObject } from '../utils/flowTypes';
import { IMAGE_URL } from '../utils/constants';
import {
  borderRadius,
  greyBackgroundColor,
  fontWeight,
  smallIconSize,
  textHintColor,
  textColor,
  secondaryBtnHoverColor,
} from '../utils/styleVariables';

type Props = {
  order: CartOrderObject,
  onOrderModified: (update: CartOrderObject) => Function,
  onOrderRemoved: (id: number) => Function,
};

type State = {
  unitPrice: number,
  subTotal: number,
};

class CartItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const quantity = props.order.quantity || 0;
    const unitPrice = props.order.unitPrice || 0;
    const subTotal = this.calculateSubTotal(quantity, unitPrice);
    this.state = {
      unitPrice,
      subTotal,
    };

    this.onQuantityChanged = this.onQuantityChanged.bind(this);
    this.onRemoveButtonClicked = this.onRemoveButtonClicked.bind(this);
  }

  onQuantityChanged: Function;
  onQuantityChanged(newQuantity: number) {
    const update = {
      subTotal: this.calculateSubTotal(newQuantity, this.state.unitPrice),
    };
    this.setState(update);

    const orderUpdate = {
      _id: this.props.order._id,
      quantity: newQuantity,
      ...update,
    };
    this.props.onOrderModified(orderUpdate);
  }

  onRemoveButtonClicked: Function;
  onRemoveButtonClicked() {
    this.props.onOrderRemoved(this.props.order._id);
  }

  calculateSubTotal: Function;
  calculateSubTotal = (quantity: number, unitPrice: number) => quantity * unitPrice;

  render() {
    const {
      dishName,
      description,
      images,
      messageFromBuyer,
      maxServing,
      quantity,
    } = this.props.order;
    const image =
      images && images.length > 0
        ? `${IMAGE_URL}/${images.shift()}`
        : '/static/svg/mechef_logo_white.svg';
    return (
      <div className="cart-item">
        <div
          className="cart-item__image"
          style={{ backgroundImage: `url('${image}'), url('/static/svg/mechef_logo_white.svg')` }}
        />
        <div className="cart-item__dish-detail">
          <div className="cart-item__dish-detail__name">{dishName}</div>
          {undefined ? <div className="cart-item__dish-detail__error">not enough food</div> : null}
          <div className="cart-item__dish-detail__description">{description}</div>
          <div className="cart-item__dish-detail__note">{messageFromBuyer}</div>
        </div>
        <div className="cart-item__modifier">
          <ServingModifier
            quantity={quantity}
            maxServing={maxServing}
            onQuantityChanged={this.onQuantityChanged}
          />
        </div>
        <div className="cart-item__subTotal">{this.state.subTotal}</div>
        <div className="cart-item__remove" role="Button" onClick={this.onRemoveButtonClicked} />
        <style jsx>
          {`
            .cart-item {
              height: 160px;
              padding: 30px 0 18px;
              display: flex;
            }
            .cart-item__image {
              display: flex;
              flex-basis: 160px;
              height: 100%;
              flex-grow: 0;
              flex-shrink: 0;
              background-repeat: no-repeat;
              background-size: contain;
              background-position: center;
              background-color: ${greyBackgroundColor};
            }
            .cart-item__dish-detail {
              padding-left: 18px;
              padding-right: 80px;
              vertical-align: top;
              height: 100%;
              flex-basis: 236px;
              display: flex;
              flex-direction: column;
              flex-grow: 1;
            }
            .cart-item__dish-detail__name {
              font-size: 20px;
              font-weight: ${fontWeight};
              line-height: 0.8;
              letter-spacing: 0.8px;
              color: ${textColor};
              padding-bottom: 12px;
            }
            .cart-item__dish-detail__error {
              padding-bottom: 16px;
              color: red;
            }
            .cart-item__dish-detail__description {
              height: 36px;
              font-size: 12px;
              line-height: 1.5;
              letter-spacing: 0.5px;
              color: ${textHintColor};
              overflow: hidden;
              position: relative;
            }
            .cart-item__dish-detail__description:after {
              content: '...';
              position: absolute;
              right: 0;
              top: 18px;
            }
            .cart-item__dish-detail__note {
              margin-top: auto;
            }
            .cart-item__modifier {
              align-self: center;
            }
            .cart-item__modifier :global(.ServingModifierHandler--plus),
            .cart-item__modifier :global(.ServingModifierHandler--plus--disabled),
            .cart-item__modifier :global(.ServingModifierHandler--minus),
            .cart-item__modifier :global(.ServingModifierHandler--minus--disabled) {
              border: 1px solid ${secondaryBtnHoverColor};
              border-radius: ${borderRadius};
              width: 30px;
              height: 30px;
              background-repeat: no-repeat;
              background-size: initial;
              background-position: center;
            }
            .cart-item__modifier :global(.ServingModifier > div):not(:last-child) {
              margin-right: 16px;
            }
            .cart-item__subTotal {
              align-self: center;
              margin-left: 8px;
              margin-right: 35px;
              display: inline-flex;
              flex-grow: 1;
              flex-basis: auto;
              justify-content: flex-end;
            }
            .cart-item__remove {
              display: flex;
              flex-basis: ${smallIconSize};
              height: ${smallIconSize};
              flex-shrink: 0;
              align-self: center;
              cursor: pointer;
              background-image: url('/static/svg/cancel-grey.svg');
              background-repeat: no-repeat;
              background-position: center;
            }
          `}
        </style>
      </div>
    );
  }
}

export default CartItem;
