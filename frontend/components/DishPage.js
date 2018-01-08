// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import ImageSlider from './ImageSlider';
import DishOrder from './DishOrder';
import AddToCartButton from './AddToCartButton';
import type { DishOrderType } from './DishOrder';

import { MenuObject } from '../utils/flowTypes';
import { IMAGE_URL } from '../utils/constants';

type Props = {
  dish: MenuObject
};

type State = {
  order: DishOrderType,
};

class DishPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      order: {
        quantity: 1,
        subTotal: 0,
      },
    };

    this.onOrderChanged = this.onOrderChanged.bind(this);
    this.addToCartClick = this.addToCartClick.bind(this);
  }

  onOrderChanged: Function;
  onOrderChanged(order: DishOrderType) {
    this.setState({ order });
  }

  addToCartClick: Function;
  addToCartClick() {
    console.log('adding item to cart. TODO: call api to update cart.')
  }

  render() {
    const { dish } = this.props;
    return (
      <div className="dish-page">
        <div className="dish-page__main">
          <div className="dish-page__left">
            <div className="dish-page__left__header">
              <div>
                <div className="dish-page__left__header--left">
                  <ImageSlider images={dish.images} />
                </div>
                <div className="dish-page__left__header--right">
                  <div className="dish-page__left__field-title dish-page__left__dish-name">
                    { dish.dishName }
                  </div>
                  <div>
                    {
                      dish.deliveryList.reduce((all, deliveryOption) => {
                        if (!all.includes(deliveryOption.type)) {
                          all.push(deliveryOption.type);
                        }
                        return all;
                      }, []).map((deliveryOption) => (
                        <span
                          key={deliveryOption}
                          className="dish-page__left__delivery-option-badge"
                        >{deliveryOption}</span>
                      ))
                    }
                  </div>
                </div>
              </div>
              <div className="dish-page__left__header--bottom">
                <div>
                  <span className="dish-page__left__header__title">Remaining Quantity</span>
                  <span className="dish-page__left__header__field">{dish.quantity}</span>
                </div>
                <div>
                  <span className="dish-page__left__header__title">Unit Price</span>
                  <span className="dish-page__left__header__field">{dish.unitPrice}</span>
                </div>
              </div>
            </div>
            <hr className="dish-page__left__header-divider" />
            <div className="dish-page__left__section">
              <div className="dish-page__left__field-title">
                Description
              </div>
              <div className="dish-page__left__field-content">
                description
              </div>
            </div>
            <div className="dish-page__left__section">
              <div className="dish-page__left__section__cell">
                <div className="dish-page__left__field-title">
                  Serving
                </div>
                <div className="dish-page__left__field-content">
                  {
                    dish.serving ?
                      `${dish.serving} People` :
                      '-'
                  }
                </div>
              </div>
              <div className="dish-page__left__section__cell">
                <div className="dish-page__left__field-title">
                  Preparation Time
                </div>
                <div className="dish-page__left__field-content">
                  {
                    dish.cookingBuffer ?
                      `${dish.cookingBuffer} Days` :
                      '-'
                  }
                </div>
              </div>
            </div>
            <div className="dish-page__left__section">
              <div className="dish-page__left__field-title dish-page__left__category">
                Category
              </div>
              <div className="dish-page__left__field-content">
                {
                  dish.category.map(categoryText => (
                    <div
                      className="dish-page__left__field-content__label"
                      key={categoryText}
                    >
                      {categoryText}
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="dish-page__left__section">
              <div className="dish-page__left__field-title  dish-page__left__ingredients">
                Ingredients
              </div>
              <div className="dish-page__left__field-content">
                {
                  dish.ingredients.map(ingredient => (
                    <div
                      className="dish-page__left__field-content__label"
                      key={ingredient}
                    >
                      {ingredient}
                    </div>
                  ))
                }
              </div>
            </div>
            <hr className="dish-page__left__section-divider" />
            <div className="dish-page__left__section">
              <div className="dish-page__left__field-title">
                Delivery
              </div>
              <div className="dish-page__left__field-content">
                {
                  dish.deliveryList.map((deliveryOption) => (
                    <div
                      className="dish-page__left__delivery-option"
                      key={`${deliveryOption.type}-${deliveryOption.meetupAddress}-${deliveryOption.meetupStartTime}-${deliveryOption.meetupEndTime}`}>
                      <div className="dish-page__left__delivery-type">{deliveryOption.type}</div>
                      <div>{deliveryOption.meetupAddress}</div>
                      <div>
                        <span></span>
                        <span>{deliveryOption.meetupStartTime} - {deliveryOption.meetupEndTime}</span>
                      </div>
                      {
                        deliveryOption.note ?
                          <div className="dish-page__left__delivery-note">
                            {deliveryOption.note}
                          </div> :
                          ''
                      }
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="dish-page__right">
            <div className="dish-page__right__header">Your Order</div>
            <hr />
            <div className="dish-page__right__order-detail">
              <DishOrder
                price={dish.unitPrice}
                maxServing={dish.quantity}
                onOrderChange={this.onOrderChanged}
              />
            </div>
            <hr/>
            <div className="dish-page__right__footer">
              <AddToCartButton dishId="this.props.id" onAddToCartClick={this.addToCartClick} />
            </div>
          </div>
        </div>
        <div className="dish-page__footer">
          <div className="dish-page__footer__image" />
          <div className="dish-page__footer__question">
            Any question about your order?
          </div>
          <div className="dish-page__footer__contact">CONTACT CHEF</div>
        </div>
        <style jsx>
          {`
            div {
              box-sizing: border-box;
            }
            hr {
              height: 1px;
              background-color: #b9b9b9;
              border: 0;
              margin: 0 auto;
            }
            .dish-page__main {
              font-family: Ubuntu;
              min-height: 100%;
              display: flex;
              flex-direction: row;
            }
            .dish-page__left {
              max-width: calc(100% - 340px);
              flex-basis: auto;
              flex-grow: 1;
              padding-left: 100px;
              padding-right: 27px;
              padding-top: 34px;
              padding-bottom: 100px;
              color: #9b9b9b;
              font-size: 12px;
            }
            .dish-page__left__header-divider {
              width: 100%;
              margin: 20px auto 40px;
            }
            .dish-page__left__section-divider {
              width: 100%;
              margin: 50px auto;
            }
            .dish-page__left__section + .dish-page__left__section {
              margin-top: 50px;
            }
            .dish-page__left__section__cell {
              display: inline-block;
              margin-right: 45px;
            }
            .dish-page__left__field-title {
              font-size: 16px;
              line-height: 1;
              color: #4a4a4a;
              font-weight: 500;
              padding-bottom: 15px;
            }
            .dish-page__left__field-content {
              font-size: 12px;
              line-height: 1.5;
              color: #9b9b9b;
            }
            .dish-page__left__field-content__label {
              display: inline-block;
              max-width: 100%;
              border: 1px solid #3f9f40;
              border-radius: 4px;
              height: 50px;
              color: #3f9f40;
              font-size: 14px;
              font-weight: 1;
              margin-top: 10px;
              margin-bottom: -2px;
              padding: 14px 16px 0;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
            .dish-page__left__field-content__label:not(:last-child) {
              margin-right: 10px;
            }
            .dish-page__left__header {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
            }
            .dish-page__left__header--left {
              display: inline-block;
              width: 200px;
              vertical-align: top;
            }
            .dish-page__left__header--left :global(.image-slider__images-container) {
              width: 200px;
              height: 200px;
            }
            .dish-page__left__header--right {
              display: inline-block;
              width: calc(100% - 200px);
              vertical-align: top;
              padding-left: 16px;
            }
            .dish-page__left__header--bottom {
              font-size: 14px;
              line-height: 1;
              width: 100%;
              margin-top: 30px;
            }
            .dish-page__left__header--bottom > div {
              display: inline-block;
              width: 100%;
            }
            .dish-page__left__header--bottom > div + div {
              margin-top: 20px;
            }
            .dish-page__left__header__title {
              color: #909090;
              float: left;
            }
            .dish-page__left__header__field {
              float: right;
              color: #4a4a4a;
            }
            .dish-page__left__dish-name {
              line-height: 1.5;
            }
            .dish-page__left__delivery-option-badge {
              border: solid 1px #3f9f40;
              border-radius: 100px;
              padding: 5px 12px;
              color: #3f9f40;
              font-size: 10px;
              letter-spacing: 0.4px;
              line-height: 1.4;
              text-transform: uppercase;
            }
            .dish-page__left__category,
            .dish-page__left__ingredients {
              padding-bottom: 5px;
            }
            .dish-page__left__delivery-option {
              border-left: 2px solid #3f9f40;
              padding-left: 20px;
              line-height: 1;
              font-size: 14px;
              color: #4a4a4a;
            }
            .dish-page__left__delivery-option > div + div {
              margin-top: 12px;
            }
            .dish-page__left__delivery-option:not(:last-child) {
              margin-bottom: 25px;
            }
            .dish-page__left__delivery-type {
              color: #9b9b9b;
            }
            .dish-page__left__delivery-note {
              font-size: 12px;
            }
            .dish-page__right {
              flex-basis: 340px;
              flex-grow: 0;
              flex-shrink: 0;
              background-color: #f8f8f8;
            }
            .dish-page__right__header {
              text-align: center;
              display: block;
              width: 250px;
              line-height: 1.5;
              font-size: 16px;
              color: #4a4a4a;
              margin: 0 auto;
              padding-top: 38px;
              padding-bottom: 38px;
            }
            .dish-page__right hr {
              width: 250px;
            }
            .dish-page__right__order-detail {
              padding: 47px 45px 30px;
            }
            .dish-page__right__order-detail .dish-order__note-input {
              background-color: #f8f8f8;
            }
            .dish-page__right__footer {
              margin: 40px 0;
            }
            .dish-page__right__footer .addToCartButton {
              width: 250px;
            }

            .dish-page__footer {
              position: relative;
              border-top: 1px solid #b9b9b9;
            }
            .dish-page__footer__image {
              display: block;
              width: 60px;
              height: 60px;
              border-radius: 50%;
              position: absolute;
              top: -30px;
              left: calc(50% - 30px);
              background-color: #3f9f40;
            }
            .dish-page__footer__image:after {
              content: '';
              width: 60px;
              height: 60px;
              position: absolute;
              background-image: url('/static/svg/default-icon.svg');
              background-position: center;
              background-repeat: no-repeat;
            }
            .dish-page__footer__question {
              padding-top: 70px;
              font-family: Playball;
              font-size: 20px;
              text-align: center;
              color: #4a4a4a;
            }
            .dish-page__footer__contact {
              padding-top: 30px;
              font-family: Ubuntu;
              font-size: 16px;
              text-align: center;
              color: #3f9f40;
              padding-bottom: 50px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default DishPage;
