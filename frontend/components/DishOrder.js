// @flow

import React from 'react';

import ServingModifier from './ServingModifier';

type Props = {
  price: number,
  maxServing: number,
};

type State = {
  quantity: number,
  subTotal: number,
  note?: string,
};

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

  onNoteChange: Function;
  onNoteChange(event: any) {
    this.setState({ note: event.target.value });
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
              line-height: 14px;
              letter-spacing: 0.6;
            }
            .dish-order__note {
              padding-bottom: 12px;
            }
            .dish-order__note-input {
              max-width: 250px;
              max-height: 120px;
              width: 250px;
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
            .dish-order__field-name {
              color: #4a4a4a;
            }
            .dish-order__quanity {
              display: inline-block;
            }
            .dish-order__subtotal {
              font-size: 14px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default DishOrder;
