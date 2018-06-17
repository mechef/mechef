// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';
import { translate } from 'react-i18next';
import i18n from '../i18n';

import ImageSlider from './ImageSlider';
import DishOrder from './DishOrder';
import AddToCartButton from './AddToCartButton';
import DishDeliveryOption from './DishDeliveryOption';
import Spinner from './Spinner';

import type { DishOrderType } from './DishOrder';
import type { KitchenObject, MenuObject } from '../utils/flowTypes';
import { connect } from '../state/RxState';
import cartActions from '../actions/cartActions';
import kitchenActions from '../actions/kitchenActions';
import errorActions from '../actions/errorActions';

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
  dishId: string,
  kitchen: KitchenObject,
  selectedDish: MenuObject,
  addToCart$: (order: DishOrderType) => Rx.Observable,
  fetchDish$: (dishId: string) => Rx.Observable,
  t: (key: string) => string,
};

type State = { order?: DishOrderType };

class DishPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { order: undefined };

    this.onOrderChanged = this.onOrderChanged.bind(this);
    this.addToCartClicked = this.addToCartClicked.bind(this);
  }

  componentDidMount() {
    this.props.fetchDish$(this.props.dishId);
  }

  onOrderChanged: Function;
  onOrderChanged(order: DishOrderType) {
    this.setState({ order });
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
  }

  addToCartClicked: Function;
  addToCartClicked() {
    if (!this.props.selectedDish) {
      return;
    }
    const {
      _id,
      dishName,
      images,
      description,
    } = this.props.selectedDish;
    const defaultOrder = this.createDefaultOrder(this.props.selectedDish);
    const order = {
      ...(this.state.order ? this.state.order : defaultOrder),
      kitchen: this.props.kitchen.kitchenName,
      dishId: _id,
      dishName,
      description,
      images: images ? [...images] : [],
    };
    this.props.addToCart$(order);
    // TODO: add notification or redirect to cart page
  }

  render() {
    const { t, selectedDish } = this.props;

    const renderDeliveryOptions = deliveryList => (
      // filter is workaround for bug in api
      deliveryList && deliveryList
        .filter(deliveryOption => Boolean(deliveryOption))
        .reduce((all, deliveryOption) => {
          if (!all.includes(deliveryOption.type)) {
            all.push(deliveryOption.type);
          }
          return all;
        }, []).map(deliveryOption => (
          <span
            key={deliveryOption}
            className="dish-page__left__delivery-option-badge"
          >
            {deliveryOption}
          </span>
        ))
    );

    return (
      <div className="dish-page">
        { this.props.isLoading ? <Spinner /> : null }
        {
          !this.props.isLoading && selectedDish && selectedDish.dishName ?
            <div className="dish-page__main">
              <div className="dish-page__left">
                <div className="dish-page__left__header">
                  <div className="dish-page__left__header--left">
                    <ImageSlider images={selectedDish.images} />
                  </div>
                  <div className="dish-page__left__header--right">
                    <div className="dish-page__left__header__row">
                      <div className="dish-page__left__dish-name">
                        { selectedDish.dishName }
                      </div>
                      <div className="dish-page__left__dish-delivery">
                        {
                          renderDeliveryOptions(selectedDish.deliveryList)
                        }
                      </div>
                    </div>
                    <div className="dish-page__left__header__row">
                      <div className="dish-page__left__header__title">{ t('productdetail_remain_quantity') }</div>
                      <div className="dish-page__left__header__field">{selectedDish.quantity}</div>
                    </div>
                    <div className="dish-page__left__header__row">
                      <div className="dish-page__left__header__title">{ t('productdetail_unit_price') }</div>
                      <div className="dish-page__left__header__field">{selectedDish.unitPrice}</div>
                    </div>
                  </div>
                </div>
                <hr className="dish-page__left__header-divider" />
                <div className="dish-page__left__section">
                  <div className="dish-page__left__field-title">
                    { t('productdetail_product_description') }
                  </div>
                  <div className="dish-page__left__field-content">
                    {selectedDish.description}
                  </div>
                </div>
                <div className="dish-page__left__section">
                  <div className="dish-page__left__section__cell">
                    <div className="dish-page__left__field-title">
                      { t('productdetail_serving') }
                    </div>
                    <div className="dish-page__left__field-content">
                      {
                        selectedDish.serving ?
                          `${selectedDish.serving} ${t('productdetail_serving_unit')}` :
                          '-'
                      }
                    </div>
                  </div>
                  <div className="dish-page__left__section__cell">
                    <div className="dish-page__left__field-title">
                      { t('productdetail_prep_time') }
                    </div>
                    <div className="dish-page__left__field-content">
                      {
                        selectedDish.cookingBuffer ?
                          `${selectedDish.cookingBuffer} ${t('productdetail_prep_time_unit')}` :
                          '-'
                      }
                    </div>
                  </div>
                </div>
                {
                  selectedDish.category && selectedDish.category.length > 0 ?
                  (
                    <div className="dish-page__left__section">
                      <div className="dish-page__left__field-title dish-page__left__category">
                        { t('productdetail_category') }
                      </div>
                      <div className="dish-page__left__field-content">
                        {
                          selectedDish.category && selectedDish.category.map(categoryText => (
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
                  ) : null
                }
                {
                  selectedDish.ingredients && selectedDish.ingredients.length > 0 ?
                  (
                    <div className="dish-page__left__section">
                      <div className="dish-page__left__field-title  dish-page__left__ingredients">
                        { t('productdetail_ingredients') }
                      </div>
                      <div className="dish-page__left__field-content">
                        {
                          selectedDish.ingredients && selectedDish.ingredients.map(ingredient => (
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
                  ) : null
                }
                <hr className="dish-page__left__section-divider" />
                <div className="dish-page__left__section">
                  <div className="dish-page__left__field-title">
                    { t('productdetail_deli') }
                  </div>
                  {
                    selectedDish.deliveryList && selectedDish.deliveryList.length > 0 ?
                      <div className="dish-page__left__field-content">
                        {
                          // filter is workaround for bug in api
                          selectedDish.deliveryList
                            .filter(deliveryOption => Boolean(deliveryOption))
                            .map(deliveryOption => (
                              <DishDeliveryOption
                                {...deliveryOption}
                                key={deliveryOption._id}
                              />
                            ))
                        }
                      </div> :
                      <div>Delivery Not Available</div>
                  }
                </div>
              </div>
              <div className="dish-page__right">
                <div className="dish-page__right__header">{t('productdetail_your_order')}</div>
                <hr />
                <div className="dish-page__right__order-detail">
                  <DishOrder
                    price={selectedDish.unitPrice}
                    maxServing={selectedDish.quantity}
                    onOrderChange={this.onOrderChanged}
                  />
                </div>
                <hr />
                <div className="dish-page__right__footer">
                  <AddToCartButton
                    onAddToCartClick={this.addToCartClicked}
                  />
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
            { t('productdetail_order_question') }
          </div>
          {
            this.props.kitchen.email ?
              <a href={`mailto:${this.props.kitchen.email || ''}`} className="dish-page__footer__contact">
                { t('productdetail_contact_chef') }
              </a> :
              null
          }
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
              display: block;
              padding-top: 30px;
              font-family: Ubuntu;
              font-size: 16px;
              text-align: center;
              color: ${primaryColor};
              padding-bottom: 50px;
              text-decoration: none;
            }
          `}
        </style>
      </div>
    );
  }
}

const Extended = translate(['common'], { i18n, wait: process.browser })(DishPage);

const stateSelector = ({ kitchen, error }) => ({
  isLoading: kitchen.isLoading,
  kitchen: kitchen.kitchen,
  selectedDish: kitchen.selectedDish,
  error,
});

const actionSubjects = {
  ...errorActions,
  ...cartActions,
  ...kitchenActions,
};

export default connect(stateSelector, actionSubjects)(Extended);
