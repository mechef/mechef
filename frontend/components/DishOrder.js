// @flow

import React from 'react';
import { translate } from 'react-i18next';
import i18n from '../i18n';

import ServingModifier from './ServingModifier';
import TextAreaInput from './TextAreaInput';

import {
  fontSize,
  fontWeight,
  textColor,
  borderRadius,
  secondaryBtnHoverColor,
} from '../utils/styleVariables';

type Props = {
  price?: string | number,
  maxServing?: string | number,
  onOrderChange?: DishOrderType => Function,
  textAreaWidth?: string | number,
  textAreaHeight?: string | number,
  t: (key: string) => string,
};

export type DishOrderType = {
  quantity: number,
  subTotal: number,
  messageFromBuyer: string,
  unitPrice: number,
  maxServing: number,
};

type State = DishOrderType;

class DishOrder extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const unitPrice = parseInt(props.price, 10) || 0;
    const maxServing = parseInt(props.maxServing, 10) || 0;

    this.state = {
      unitPrice,
      maxServing,
      quantity: maxServing > 0 ? 1 : 0,
      subTotal: unitPrice,
      messageFromBuyer: '',
    };

    this.onNoteChange = this.onNoteChange.bind(this);
    this.recalculateSubTotal = this.recalculateSubTotal.bind(this);
  }

  onNoteChange: Function;
  onNoteChange(event: any) {
    const messageFromBuyer = event.target.value;
    this.setState({ messageFromBuyer });
    const order = {
      ...this.state,
      messageFromBuyer,
    };
    this.invokeOrderChange(order);
  }

  invokeOrderChange: Function;
  invokeOrderChange(order: DishOrderType) {
    if (typeof this.props.onOrderChange === 'function') {
      this.props.onOrderChange(order);
    }
  }

  formatPrice: Function;
  formatPrice = (price: number) => `$${price}.00`;

  recalculateSubTotal: Function;
  recalculateSubTotal(quantity: number) {
    const subTotal = quantity * (this.state.unitPrice || 0);
    this.setState({
      quantity,
      subTotal,
    });
    const order = {
      ...this.state,
      quantity,
      subTotal,
    };
    this.invokeOrderChange(order);
  }

  render() {
    const { t } = this.props;
    return (
      <div className="dish-order">
        <div className="dish-order__field dish-order__field--column">
          <div className="dish-order__note">{t('productadd_note_to_chef')}</div>
          <TextAreaInput
            placeholder="Any preference? Let the seller know here..."
            value={this.state.messageFromBuyer}
            onChange={this.onNoteChange}
            width={this.props.textAreaWidth || 250}
            height={this.props.textAreaHeight || 120}
          />
        </div>
        <div className="dish-order__field dish-order__field--row">
          <span className="dish-order__field-name">
            {t('productadd_quantity')}
          </span>
          <div className="dish-order__quanity">
            <ServingModifier
              maxServing={this.state.maxServing}
              onQuantityChanged={this.recalculateSubTotal}
            />
          </div>
        </div>
        <div className="dish-order__field dish-order__field--row">
          <span className="dish-order__field-name">
            {t('productdetail_subtotal')}
          </span>
          <span className="dish-order__subtotal">
            {this.formatPrice(this.state.subTotal)}
          </span>
        </div>
        <style jsx>
          {`
            .dish-order {
              color: ${textColor};
              font-size: ${fontSize};
              letter-spacing: 0.6;
            }
            .dish-order__note {
              padding-bottom: 12px;
              font-size: ${fontSize};
              line-height: 1;
            }
            .dish-order :global(.textAreaInput) {
              max-height: 120px;
            }
            .dish-order__note-input {
              max-width: 250px;
              max-height: 120px;
              width: 100%;
              height: 120px;
              border-radius: ${borderRadius};
              border: solid 1px ${secondaryBtnHoverColor};
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
              color: ${textColor};
              font-size: ${fontSize};
              line-height: 1;
              letter-spacing: 0.6px;
            }
            .dish-order__quanity {
              display: inline-block;
            }
            .dish-order__subtotal,
            .dish-order__quanity {
              font-weight: ${fontWeight};
            }
          `}
        </style>
      </div>
    );
  }
}

const Extended = translate(['common'], {
  i18n,
  wait: typeof window !== 'undefined',
})(DishOrder);

export default Extended;
