// @flow

import React from 'react';

import ImageSlider from './ImageSlider';
import DishOrder from './DishOrder';
import AddToCartButton from './AddToCartButton';
import type { DishOrderType } from './DishOrder';
import type { MenuObject } from '../utils/flowTypes';

import {
  borderRadius,
  whiteColor,
  textColor,
  fontSize,
} from '../utils/styleVariables';

type Props = {
  dish: MenuObject,
  onClose: Function,
  onDishAdded: Function,
};

type State = { order?: DishOrderType };

class DishModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { order: undefined };

    this.onOrderChanged = this.onOrderChanged.bind(this);
    this.onAddToCartClicked = this.onAddToCartClicked.bind(this);
  }

  onOrderChanged: Function;
  onOrderChanged(order: DishOrderType) {
    console.log(order);
    this.setState({ order });
  }

  onAddToCartClicked: Function;
  onAddToCartClicked() {
    const { _id, dishName, images, description } = this.props.dish;
    const defaultOrder = this.createDefaultOrder(this.props.dish);
    const order = {
      ...(this.state.order ? this.state.order : defaultOrder),
      dishId: _id,
      images: images ? [...images] : [],
      dishName,
      description,
    };
    this.props.onDishAdded && this.props.onDishAdded(order);
    this.props.onClose();
  }

  createDefaultOrder: Function;
  createDefaultOrder = (menuItem: MenuObject) => {
    const unitPrice = parseInt(menuItem.unitPrice, 10) || 0;
    const maxServing = parseInt(menuItem.quantity, 10) || 0;
    const defaultOrder = {
      unitPrice,
      maxServing,
      quantity: 1,
      subTotal: unitPrice,
      messageFromBuyer: '',
    };
    return defaultOrder;
  };

  render() {
    const { dish } = this.props;
    return (
      <div className="dish-modal-overlay">
        <div className="dish-modal">
          <ImageSlider images={dish.images} />
          <div className="dish-modal__content">
            <div className="dish-modal__content-wrapper">
              <div className="dish-modal__name">{dish.dishName}</div>
              <div className="dish-modal__description">{dish.description}</div>
              <DishOrder
                price={dish.unitPrice}
                maxServing={dish.quantity}
                onOrderChange={this.onOrderChanged}
                textAreaWidth={380}
                textAreaHeight={80}
              />
            </div>
            <div className="dish-modal__content__button-container">
              <AddToCartButton onAddToCartClick={this.onAddToCartClicked} />
            </div>
          </div>
          <div
            className="dish-modal__close-button"
            onClick={this.props.onClose}
          />
        </div>
        <style jsx>
          {`
            .dish-modal-overlay {
              position: fixed;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .dish-modal {
              position: relative;
              min-width: 715px;
              height: 456px;
              border-radius: ${borderRadius};
              background-color: ${whiteColor};
              box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.3);
            }
            .dish-modal :global(.image-slider) {
              display: inline-block;
              width: 290px;
              height: 100%;
              border-radius: ${borderRadius} 0 0 ${borderRadius};
            }
            .dish-modal :global(.image-slider__legend) {
              position: absolute;
              bottom: 0;
              padding-bottom: 24px;
            }
            .dish-modal :global(.image-slider__legend-circle) {
              border: 0;
            }
            .dish-modal__content {
              display: inline-flex;
              width: calc(100% - 294px);
              max-width: 421px;
              height: 100%;
              vertical-align: top;
              flex-direction: column;
              justify-content: space-between;
              align-items: flex-end;
            }
            .dish-modal__close-button {
              position: absolute;
              right: 20px;
              top: 16px;
              height: 16px;
              width: 16px;
              cursor: pointer;
              background-image: url('/static/svg/cancel-grey.svg');
            }
            .dish-modal__content-wrapper {
              width: 100%;
              padding: 0 20px;
              box-sizing: border-box;
            }
            .dish-modal__content-wrapper :global(.dish-order__field-name) {
              color: #909090;
            }
            .dish-modal__content-wrapper :global(.dish-order__subtotal) {
              font-size: 20px;
              line-height: 1.2;
              letter-spacing: 0.8px;
            }
            .dish-modal__name {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: ${textColor};
              width: 228px;
              font-size: ${fontSize};
              line-height: 1.2;
              margin-top: 20px;
            }
            .dish-modal__description {
              overflow: hidden;
              margin: 10px 20px 20px 0;
              font-size: 12px;
              line-height: 1.5;
              max-height: 36px;
              color: #9b9b9b;
            }
            .dish-modal .dish-order__subtotal {
              font-size: 20px;
              line-height: 1.2;
            }
            .dish-modal__content__button-container {
              margin-right: 20px;
              margin-bottom: 32px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default DishModal;
