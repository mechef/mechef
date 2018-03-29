// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import {
  fontSize,
  smallIconSize,
} from '../utils/styleVariables';

type Props = {
  maxServing?: number,
  quantity?: number,
  onQuantityChanged?: (newQuantity: number) => Rx.Observable,
};

type State = {
  maxServing: number,
  quantity: number,
  isMinusDisabled: boolean,
  isPlusDisabled: boolean,
};

const MAX_SERVING = 10;

class ServingModifier extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const maxServing = props.maxServing && props.maxServing > 0 ? props.maxServing : MAX_SERVING;
    const quantity = props.quantity && props.quantity < maxServing ? props.quantity : 1;
    this.state = {
      maxServing,
      quantity: 1,
      isMinusDisabled: this.isMinusDisabled(quantity),
      isPlusDisabled: this.isPlusDisabled(quantity, maxServing),
    }

    this.onQuantityIncreased = this.onQuantityIncreased.bind(this);
    this.onQuantityDecreased = this.onQuantityDecreased.bind(this);
  }

  componentDidMount() {
    const quantity = this.props.quantity && this.props.quantity < this.state.maxServing ? this.props.quantity : 1;
    this.setState({
      quantity: this.state.maxServing > 0 ? quantity : 0,
    });
  }

  isPlusDisabled: Function;
  isPlusDisabled(quantity: number, maxServing: number) {
    return quantity >= maxServing;
  }

  isMinusDisabled: Function;
  isMinusDisabled(quantity: number) {
    return quantity <= 1;
  }

  onQuantityDecreased: Function;
  onQuantityDecreased() {
    const newQuantity = this.state.isMinusDisabled ? 1 : this.state.quantity - 1;
    this.setState({
      isMinusDisabled: this.isMinusDisabled(newQuantity),
      isPlusDisabled: this.isPlusDisabled(newQuantity, this.state.maxServing),
      quantity: newQuantity,
    });
    if (typeof this.props.onQuantityChanged === 'function') {
      this.props.onQuantityChanged(newQuantity);
    }
  }

  onQuantityIncreased: Function;
  onQuantityIncreased() {
    const newQuantity =  this.state.isPlusDisabled ? this.state.maxServing : this.state.quantity + 1;
    this.setState({
      isMinusDisabled: this.isMinusDisabled(newQuantity),
      isPlusDisabled: this.isPlusDisabled(newQuantity, this.state.maxServing),
      quantity: newQuantity,
    });
    if (typeof this.props.onQuantityChanged === 'function') {
      this.props.onQuantityChanged(newQuantity);
    }
  }

  render() {
    return (
      <div className="ServingModifier">
          <div
            className={`ServingModifierHandler--minus${this.state.isMinusDisabled ? '--disabled' : ''}`}
            onClick={this.onQuantityDecreased}
          />
          <div className="ServingModifierDisplay">{this.state.quantity}</div>
          <div
            className={`ServingModifierHandler--plus${this.state.isPlusDisabled ? '--disabled' : ''}`}
            onClick={this.onQuantityIncreased}
          />
        <style jsx>
          {`
            .ServingModifier {
              display: flex;
              align-items: center;
            }
            .ServingModifier > div:not(:last-child) {
              margin-right: 8px;
              display: inline-block;
            }
            .ServingModifierHandler--minus,
            .ServingModifierHandler--minus--disabled {
              display: inline-block;
              height: ${smallIconSize};
              width: ${smallIconSize};
              cursor: pointer;
              background-image: url('/static/svg/ic-minus.svg');
            }
            .ServingModifierHandler--plus,
            .ServingModifierHandler--plus--disabled {
              display: inline-block;
              height: ${smallIconSize};
              width: ${smallIconSize};
              cursor: pointer;
              background-image: url('/static/svg/ic-plus.svg');
            }
            .ServingModifierHandler--plus--disabled,
            .ServingModifierHandler--minus--disabled {
              opacity: 0.4;
              cursor: not-allowed;
              pointer-events: none;
            }
            .ServingModifierDisplay {
              font-size: ${fontSize};
              line-height: 1;
              min-width: 30px;
              text-align: center;
            }
          `}
        </style>
      </div>
    );
  }
}

export default ServingModifier;
