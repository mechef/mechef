// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import ServingModifier from './ServingModifier';

import {
  fontSize,
} from '../utils/styleVariables';

type Props = {
  price: number,
  maxServing: number,
  onOrderChange?: (DishOrderType) => Rx.Observable,
};

export type DishOrderType = {
  quantity?: number,
  subTotal?: number,
  note?: string,
};

type State = DishOrderType;

class DishOrder extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      quantity: 1,
      subTotal: this.formatPrice(props.price || 0),
      note: '',
    };

    this.onNoteChange = this.onNoteChange.bind(this);
    this.recalculateSubTotal = this.recalculateSubTotal.bind(this);
  }

  invokeOrderChange: Function;
  invokeOrderChange() {
    if (typeof this.props.onOrderChange === 'function') {
      this.props.onOrderChange({ ...this.state });
    }
  }

  onNoteChange: Function;
  onNoteChange(event: any) {
    this.setState({ note: event.target.value });
    this.invokeOrderChange();
  }

  formatPrice: Function;
  formatPrice(price: number) {
    return `$${price}.00`;
  }

  recalculateSubTotal: Function;
  recalculateSubTotal(quantity: number) {
    const subTotal = quantity * (this.props.price || 0);
    this.setState({
      quantity: quantity,
      subTotal: this.formatPrice(subTotal),
    });
    this.invokeOrderChange();
  }

  render() {
    return (
      <div className="dish-order">
        <div className="dish-order__field dish-order__field--column">
          <div className="dish-order__note">Note to seller</div>
          <textarea
            className="dish-order__note-input"
            autoComplete="off"
            placeholder="Any preference? Let the seller know here..."
            onChange={this.onNoteChange}
          ></textarea>
        </div>
        <div className="dish-order__field dish-order__field--row">
          <span className="dish-order__field-name">Quantity</span>
          <div className="dish-order__quanity">
            <ServingModifier
              maxServing={this.props.maxServing}
              onQuantityChanged={this.recalculateSubTotal}
            />
          </div>
        </div>
        <div className="dish-order__field dish-order__field--row">
          <span className="dish-order__field-name">Subtotal</span>
          <span className="dish-order__subtotal">{this.state.subTotal}</span>
        </div>
        <style jsx>
          {`
            .dish-order {
              color: #4a4a4a;
              font-size: ${fontSize};
              letter-spacing: 0.6;
            }
            .dish-order__note {
              padding-bottom: 12px;
              font-size: ${fontSize};
              line-height: 1;
            }
            .dish-order__note-input {
              max-width: 250px;
              max-height: 120px;
              width: 100%;
              height: 120px;
              border-radius: 4px;
              border: solid 1px #979797;
              outline: 0;
            }
            .dish-order__field--row {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .dish-order__field:not(:first-child) {
              margin-top: -2px;
              padding-top: 40px;
            }
            .dish-order__field-name,
            .dish-order__subtotal,
            .dish-order__quanity {
              color: #4a4a4a;
              font-size: ${fontSize};
              line-height: 1;
              letter-spacing: 0.6px;
            }
            .dish-order__quanity {
              display: inline-block;
            }
            .dish-order__subtotal,
            .dish-order__quanity {
              font-weight: 500;
            }
          `}
        </style>
      </div>
    );
  }
}

export default DishOrder;
