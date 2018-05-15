// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import ImageSlider from './ImageSlider';
import DishOrder from './DishOrder';
import AddToCartButton from './AddToCartButton';
import DishDeliveryOption from './DishDeliveryOption';
import type { DishOrderType } from './DishOrder';
import Spinner from './Spinner';

import { connect } from '../state/RxState';
import cartActions from '../actions/cartActions';
import kitchenActions from '../actions/kitchenActions';
import errorActions from '../actions/errorActions';

import type { KitchenObject, MenuObject } from '../utils/flowTypes';
import { IMAGE_URL } from '../utils/constants';
import {
  primaryColor,
  borderRadius,
  dishPageImageSize,
  dishPageRightHorizontalMargin,
  dishPageRightWidth,
  dishPageRightBackground,
  dishPageHeaderColor,
  dishPageTextColor,
} from '../utils/styleVariables';

type Props = {
  kitchen: KitchenObject,
  dishId: string,
  addToCart$: (order: DishOrderType) => Rx.Observable,
  fetchDish$: (dishId: string) => Rx.Observable,
};

type State = DishOrderType;

class DishPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const currentDish = props.kitchen.currentDish || {};

    const unitPrice = Number(currentDish.unitPrice) || 0;
    const maxServing = Number(currentDish.quantity) || 0;
    this.state = {
      unitPrice,
      maxServing,
      quantity: 1,
      subTotal: unitPrice,
      messageFromBuyer: '',
    };

    this.onOrderChanged = this.onOrderChanged.bind(this);
    this.addToCartClicked = this.addToCartClicked.bind(this);
  }

  componentDidMount() {
    this.props.fetchDish$(this.props.dishId);
  }

  onOrderChanged: Function;
  onOrderChanged(order: DishOrderType) {
    this.setState(order);
  }

  addToCartClicked: Function;
  addToCartClicked() {
    if (!this.props.kitchen.currentDish) {
      return;
    }
    const { _id, dishName, images, description } = this.props.kitchen.currentDish;
    const order = {
      ...this.state,
      dishId: _id,
      dishName: dishName,
      images: images ? [...images] : [],
      description: description,
    };
    this.props.addToCart$(order);
    // TODO: add notification or redirect to cart page
  }

  render() {
    const { currentDish } = this.props.kitchen;

    const renderDeliveryOptions = (deliveryList) => (
      deliveryList && deliveryList.reduce((all, deliveryOption) => {
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
    );

    return (
      <div className="dish-page">
        { this.props.kitchen.isLoading ? <Spinner /> : null }
        {
          currentDish && currentDish.dishName ?
            <div className="dish-page__main">
              <div className="dish-page__left">
                <div className="dish-page__left__header">
                  <div className="dish-page__left__header--left">
                    <ImageSlider images={currentDish.images} />
                  </div>
                  <div className="dish-page__left__header--right">
                    <div className="dish-page__left__header__row">
                      <div className="dish-page__left__dish-name">
                        { currentDish.dishName }
                      </div>
                      <div className="dish-page__left__dish-delivery">
                        {
                          renderDeliveryOptions(currentDish.deliveryList)
                        }
                      </div>
                    </div>
                    <div className="dish-page__left__header__row">
                      <div className="dish-page__left__header__title">Remaining Quantity</div>
                      <div className="dish-page__left__header__field">{currentDish.quantity}</div>
                    </div>
                    <div className="dish-page__left__header__row">
                      <div className="dish-page__left__header__title">Unit Price</div>
                      <div className="dish-page__left__header__field">{currentDish.unitPrice}</div>
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
                        currentDish.serving ?
                          `${currentDish.serving} People` :
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
                        currentDish.cookingBuffer ?
                          `${currentDish.cookingBuffer} Days` :
                          '-'
                      }
                    </div>
                  </div>
                </div>
                {
                  currentDish.category && currentDish.category.length > 0 &&
                  <div className="dish-page__left__section">
                    <div className="dish-page__left__field-title dish-page__left__category">
                      Category
                    </div>
                    <div className="dish-page__left__field-content">
                      {
                        currentDish.category.map(categoryText => (
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
                }
                {
                  currentDish.ingredients && currentDish.ingredients.length > 0 &&
                  <div className="dish-page__left__section">
                    <div className="dish-page__left__field-title  dish-page__left__ingredients">
                      Ingredients
                    </div>
                    <div className="dish-page__left__field-content">
                      {
                        currentDish.ingredients.map(ingredient => (
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
                }
                <hr className="dish-page__left__section-divider" />
                <div className="dish-page__left__section">
                  <div className="dish-page__left__field-title">
                    Delivery
                  </div>
                  {
                    currentDish.deliveryList && currentDish.deliveryList.length > 0 ?
                      <div className="dish-page__left__field-content">
                        {
                          currentDish.deliveryList.map((deliveryOption) => (
                            <DishDeliveryOption
                              {...deliveryOption}
                              key={deliveryOption._id} />
                          ))
                        }
                      </div> :
                      <div>Delivery Not Available</div>
                  }
                </div>
              </div>
              <div className="dish-page__right">
                <div className="dish-page__right__header">Your Order</div>
                <hr />
                <div className="dish-page__right__order-detail">
                  <DishOrder
                    price={currentDish.unitPrice}
                    maxServing={currentDish.quantity}
                    onOrderChange={this.onOrderChanged}
                  />
                </div>
                <hr/>
                <div className="dish-page__right__footer">
                  <AddToCartButton onAddToCartClick={this.addToCartClicked} />
                </div>
              </div>
            </div> :
            <div className="dish-not-found">
              Oops, dish not found
            </div>
        }
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
              box-sizing: border-box;primaryColor
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
            .dish-not-found {
              width: 100%;
              min-height: 300px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .dish-page__left {
              max-width: calc(100% - ${dishPageRightWidth});
              flex-basis: auto;
              flex-grow: 1;
              padding-left: 100px;
              padding-right: 27px;
              padding-top: 34px;
              padding-bottom: 100px;
              color: ${dishPageTextColor};
              font-size: 12px;
            }
            .dish-page__left__header-divider {
              width: 100%;
              margin: 50px auto 40px;
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
              color: ${dishPageHeaderColor};
              font-weight: 500;
              padding-bottom: 15px;
            }
            .dish-page__left__field-content {
              font-size: 12px;
              line-height: 1.5;
              color: ${dishPageTextColor};
            }
            .dish-page__left__field-content__label {
              display: inline-block;
              max-width: 100%;
              border: 1px solid ${primaryColor};
              border-radius: ${borderRadius};
              height: 50px;
              color: ${primaryColor};
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
            .dish-page__left__header--left {
              display: inline-block;
              width: ${dishPageImageSize};
              vertical-align: top;
            }
            .dish-page__left__header--left :global(.image-slider__images-container) {
              width: ${dishPageImageSize};
              height: ${dishPageImageSize};
            }
            .dish-page__left__header--right {
              display: inline-flex;
              flex-direction: column;
              height: ${dishPageImageSize};
              width: calc(100% - ${dishPageImageSize});
              padding-left: 30px;
            }
            .dish-page__left__header__row {
              display: flex;
              width: 100%;
              flex-direction: row;
              font-size: 14px;
              line-height: 1;
              letter-spacing: 0.6px;
            }
            .dish-page__left__header__row + .dish-page__left__header__row {
              margin-top: 20px;
            }
            .dish-page__left__header__row:first-child {
              flex-direction: column;
              flex-basis: auto;
              flex-grow: 1;
            }
            .dish-page__left__header__title {
              color: #909090;
              flex-grow: 1;
            }
            .dish-page__left__header__field {
              color: ${dishPageHeaderColor};
            }
            .dish-page__left__dish-name {
              color: ${dishPageHeaderColor};
              font-size: 16px;
              font-weight: 500;
              letter-spacing: 0.7px;
              line-height: 1.5;
              margin-bottom: 20px;
            }
            .dish-page__left__dish-delivery :global(span) {
              border: solid 1px ${primaryColor};
              border-radius: 100px;
              padding: 5px 12px;
              color: ${primaryColor};
              font-size: 10px;
              letter-spacing: 0.4px;
              line-height: 1.4;
              text-transform: uppercase;
            }
            .dish-page__left__category,
            .dish-page__left__ingredients {
              padding-bottom: 5px;
            }
            .dish-page__left__field-content :global(.dish-delivery-option):not(:last-child) {
              margin-bottom: 25px;
            }
            .dish-page__right {
              flex-basis: ${dishPageRightWidth};
              flex-grow: 0;
              flex-shrink: 0;
              background-color: ${dishPageRightBackground};
            }
            .dish-page__right :global(.textAreaInput) {
              background-color: ${dishPageRightBackground};
              max-width: 250px;
            }
            .dish-page__right__header {
              text-align: center;
              display: block;
              width: ${dishPageRightWidth};
              line-height: 1.5;
              font-size: 16px;
              color: ${dishPageHeaderColor};
              margin: 0 auto;
              padding-top: 38px;
              padding-bottom: 38px;
            }
            .dish-page__right hr {
              width: calc(100% - (${dishPageRightHorizontalMargin} * 2));
            }
            .dish-page__right__order-detail {
              padding: 47px ${dishPageRightHorizontalMargin} 30px;
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
              background-color: ${primaryColor};
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
              color: ${dishPageHeaderColor};
            }
            .dish-page__footer__contact {
              padding-top: 30px;
              font-family: Ubuntu;
              font-size: 16px;
              text-align: center;
              color: ${primaryColor};
              padding-bottom: 50px;
            }
          `}
        </style>
      </div>
    );
  }
}

const stateSelector = ({ kitchen, error, global }) => ({ kitchen, error });

const actionSubjects = {
  ...errorActions,
  ...cartActions,
  ...kitchenActions,
};

export default connect(stateSelector, actionSubjects)(DishPage);
