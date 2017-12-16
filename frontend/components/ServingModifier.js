// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

type Props = {
  maxServing: number,
  onQuantityChanged?: (newQuantity: number) => Rx.Observable,
};

type State = {
  quantity: number,
  isMinusDisabled: boolean,
  isPlusDisabled: boolean,
};

class ServingModifier extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      quantity: 1,
      isMinusDisabled: true,
      isPlusDisabled: false,
    }

    this.onQuantityIncreased = this.onQuantityIncreased.bind(this);
    this.onQuantityDecreased = this.onQuantityDecreased.bind(this);
  }

  updateHandlerDisabledState: Function;
  updateHandlerDisabledState(quantity: number) {
    const isPlusDisabled = quantity >= this.props.maxServing;
    const isMinusDisabled = quantity <= 1;
    this.setState({
      isMinusDisabled,
      isPlusDisabled,
    });
  }

  onQuantityDecreased: Function;
  onQuantityDecreased() {
    const newQuantity = this.state.isMinusDisabled ? 1 : this.state.quantity - 1;
    this.updateHandlerDisabledState(newQuantity);
    this.setState({
      quantity: newQuantity,
    });
    if (typeof this.props.onQuantityChanged === 'function') {
      this.props.onQuantityChanged(newQuantity);
    }
  }

  onQuantityIncreased: Function;
  onQuantityIncreased() {
    const newQuantity =  this.state.isPlusDisabled ? this.props.maxServing : this.state.quantity + 1;
    this.updateHandlerDisabledState(newQuantity);
    this.setState({
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
            .ServingModifier > div:not(:last-child) {
              margin-right: 8px;
              display: inline-block;
            }
            .ServingModifierHandler--minus,
            .ServingModifierHandler--minus--disabled {
              display: inline-block;
              height: 16px;
              width: 16px;
              cursor: pointer;
              background-image: url('/static/svg/ic-minus.svg');
            }
            .ServingModifierHandler--plus,
            .ServingModifierHandler--plus--disabled {
              display: inline-block;
              height: 16px;
              width: 16px;
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
              line-height: 16px;
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
