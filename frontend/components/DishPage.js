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
  smallBreak,
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
  };

  addToCartClicked: Function;

  addToCartClicked() {
    if (!this.props.selectedDish) {
      return;
    }
    const { _id, dishName, images, description } = this.props.selectedDish;
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

    const renderDeliveryOptions = deliveryList =>
      // filter is workaround for bug in api
      deliveryList &&
      deliveryList
        .filter(deliveryOption => Boolean(deliveryOption))
        .reduce((all, deliveryOption) => {
          if (!all.includes(deliveryOption.type)) {
            all.push(deliveryOption.type);
          }
          return all;
        }, [])
        .map(deliveryOption => (
          <span
            key={deliveryOption}
            className="dish-page__product-info__delivery-option-badge"
          >
            {deliveryOption}
          </span>
        ));

    return (
      <div className="dish-page">
        {this.props.isLoading ? <Spinner /> : null}
        {!this.props.isLoading && selectedDish && selectedDish.dishName ? (
          <div className="dish-page__main">
            <div className="dish-page__product-info">
              <div className="dish-page__product-info__header">
                <div className="dish-page__product-info__images">
                  <ImageSlider images={selectedDish.images} />
                </div>
                <div className="dish-page__product-info__summary">
                  <div className="dish-page__product-info__header__row">
                    <div className="dish-page__product-info__dish-name">
                      {selectedDish.dishName}
                    </div>
                    <div className="dish-page__product-info__dish-delivery">
                      {renderDeliveryOptions(selectedDish.deliveryList)}
                    </div>
                  </div>
                  <div className="dish-page__product-info__header__row">
                    <div className="dish-page__product-info__header__title">
                      {t('productdetail_remain_quantity')}
                    </div>
                    <div className="dish-page__product-info__header__field">
                      {selectedDish.quantity}
                    </div>
                  </div>
                  <div className="dish-page__product-info__header__row">
                    <div className="dish-page__product-info__header__title">
                      {t('productdetail_unit_price')}
                    </div>
                    <div className="dish-page__product-info__header__field">
                      {selectedDish.unitPrice}
                    </div>
                  </div>
                </div>
              </div>
              <hr className="dish-page__product-info__header-divider" />
              <div className="dish-page__product-info__section">
                <div className="dish-page__product-info__field-title">
                  {t('productdetail_product_description')}
                </div>
                <div className="dish-page__product-info__field-content">
                  {selectedDish.description}
                </div>
              </div>
              <div className="dish-page__product-info__section">
                <div className="dish-page__product-info__section__cell">
                  <div className="dish-page__product-info__field-title">
                    {t('productdetail_serving')}
                  </div>
                  <div className="dish-page__product-info__field-content">
                    {selectedDish.serving
                      ? `${selectedDish.serving} ${t(
                          'productdetail_serving_unit',
                        )}`
                      : '-'}
                  </div>
                </div>
                <div className="dish-page__product-info__section__cell">
                  <div className="dish-page__product-info__field-title">
                    {t('productdetail_prep_time')}
                  </div>
                  <div className="dish-page__product-info__field-content">
                    {selectedDish.cookingBuffer
                      ? `${selectedDish.cookingBuffer} ${t(
                          'productdetail_prep_time_unit',
                        )}`
                      : '-'}
                  </div>
                </div>
              </div>
              {selectedDish.category && selectedDish.category.length > 0 ? (
                <div className="dish-page__product-info__section">
                  <div className="dish-page__product-info__field-title dish-page__product-info__category">
                    {t('productdetail_category')}
                  </div>
                  <div className="dish-page__product-info__field-content">
                    {selectedDish.category &&
                      selectedDish.category.map(categoryText => (
                        <div
                          className="dish-page__product-info__field-content__label"
                          key={categoryText}
                        >
                          {categoryText}
                        </div>
                      ))}
                  </div>
                </div>
              ) : null}
              {selectedDish.ingredients &&
              selectedDish.ingredients.length > 0 ? (
                <div className="dish-page__product-info__section">
                  <div className="dish-page__product-info__field-title  dish-page__product-info__ingredients">
                    {t('productdetail_ingredients')}
                  </div>
                  <div className="dish-page__product-info__field-content">
                    {selectedDish.ingredients &&
                      selectedDish.ingredients.map(ingredient => (
                        <div
                          className="dish-page__product-info__field-content__label"
                          key={ingredient}
                        >
                          {ingredient}
                        </div>
                      ))}
                  </div>
                </div>
              ) : null}
              <hr className="dish-page__product-info__section-divider" />
              <div className="dish-page__product-info__section">
                <div className="dish-page__product-info__field-title">
                  {t('productdetail_deli')}
                </div>
                {selectedDish.deliveryList &&
                selectedDish.deliveryList.length > 0 ? (
                  <div className="dish-page__product-info__field-content">
                    {// filter is workaround for bug in api
                    selectedDish.deliveryList
                      .filter(deliveryOption => Boolean(deliveryOption))
                      .map(deliveryOption => (
                        <DishDeliveryOption
                          {...deliveryOption}
                          key={deliveryOption._id}
                        />
                      ))}
                  </div>
                ) : (
                  <div>Delivery Not Available</div>
                )}
              </div>
            </div>
            <div className="dish-page__order">
              <div className="dish-page__order__header">
                {t('productdetail_your_order')}
              </div>
              <hr />
              <div className="dish-page__order__order-detail">
                <DishOrder
                  price={selectedDish.unitPrice}
                  maxServing={selectedDish.quantity}
                  onOrderChange={this.onOrderChanged}
                  textAreaWidth="100%"
                />
              </div>
              <hr />
              <div className="dish-page__order__footer">
                <AddToCartButton onAddToCartClick={this.addToCartClicked} />
              </div>
            </div>
          </div>
        ) : (
          <div className="dish-not-found">Oops, dish not found</div>
        )}
        <div className="dish-page__footer">
          <div className="dish-page__footer__image" />
          <div className="dish-page__footer__question">
            {t('productdetail_order_question')}
          </div>
          {this.props.kitchen.email ? (
            <a
              href={`mailto:${this.props.kitchen.email || ''}`}
              className="dish-page__footer__contact"
            >
              {t('productdetail_contact_chef')}
            </a>
          ) : null}
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
              flex-direction: column;
            }
            .dish-not-found {
              width: 100%;
              min-height: 300px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .dish-page__product-info {
              width: 100%;
              color: ${dishPageTextColor};
              font-size: 12px;
              padding-bottom: 35px;
            }
            .dish-page__product-info__header {
              width: 100%;
            }
            .dish-page__product-info__header-divider {
              width: calc(100% - 12px - 12px);
              margin: 30px 12px;
            }
            .dish-page__product-info__section-divider {
              width: calc(100% - 12px - 12px);
              margin: 40px auto;
            }
            .dish-page__product-info__section {
              padding: 0 12px;
            }
            .dish-page__product-info__section + .dish-page__product-info__section {
              margin-top: 40px;
            }
            .dish-page__product-info__section__cell {
              display: inline-block;
              margin-right: 45px;
            }
            .dish-page__product-info__field-title {
              font-size: 16px;
              line-height: 1;
              color: ${dishPageHeaderColor};
              font-weight: 500;
              padding-bottom: 27px;
            }
            .dish-page__product-info__field-content {
              font-size: 12px;
              line-height: 1.5;
              color: ${dishPageTextColor};
            }
            .dish-page__product-info__field-content__label {
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
            .dish-page__product-info__field-content__label:not(:last-child) {
              margin-right: 10px;
            }
            .dish-page__product-info__summary {
              flex-direction: column;
              width: 100%;
              padding: 12px 12px 0;
            }
            .dish-page__product-info__images {
              width: 100%;
              height: 320px;
            }
            .dish-page__product-info__images :global(.image-slider__legend-circle) {
              background-color: transparent;
            }
            .dish-page__product-info__header__row {
              display: flex;
              width: 100%;
              flex-direction: row;
              font-size: 14px;
              line-height: 1;
              letter-spacing: 0.6px;
            }
            .dish-page__product-info__header__row + .dish-page__product-info__header__row {
              margin-top: 20px;
            }
            .dish-page__product-info__header__row:first-child {
              flex-direction: column;
              flex-basis: auto;
              flex-grow: 1;
            }
            .dish-page__product-info__header__title {
              color: #909090;
              flex-grow: 1;
            }
            .dish-page__product-info__header__field {
              color: ${dishPageHeaderColor};
            }
            .dish-page__product-info__dish-name {
              color: ${dishPageHeaderColor};
              font-size: 16px;
              font-weight: 500;
              letter-spacing: 0.7px;
              line-height: 1.5;
              margin-bottom: 20px;
            }
            .dish-page__product-info__dish-delivery :global(span) {
              border: solid 1px ${primaryColor};
              border-radius: 100px;
              padding: 5px 12px;
              color: ${primaryColor};
              font-size: 10px;
              letter-spacing: 0.4px;
              line-height: 1.4;
              text-transform: uppercase;
            }
            .dish-page__product-info__category,
            .dish-page__product-info__ingredients {
              padding-bottom: 17px;
            }
            .dish-page__product-info__field-content :global(.dish-delivery-option):not(:last-child) {
              margin-bottom: 25px;
            }
            .dish-page__order {
              background-color: ${dishPageRightBackground};
              padding: 0 12px;
              box-sizing: border-box;
            }
            .dish-page__order :global(.textAreaInput) {
              background-color: ${dishPageRightBackground};
              max-width: 100%;
            }
            .dish-page__order hr {
              width: 100%;
            }
            .dish-page__order__header {
              text-align: center;
              display: block;
              width: 100%;
              line-height: 1.5;
              font-size: 16px;
              color: ${dishPageHeaderColor};
              padding: 33px 0 23px;
            }
            .dish-page__order__order-detail {
              padding: 27px 0 30px;
            }
            .dish-page__order__footer {
              margin: 30px 0;
            }
            .dish-page__order__footer .addToCartButtonContainer {
              margin: 0;
            }

            .dish-page__footer {
              display: none;
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

            @media (min-width: ${smallBreak}) {
              .dish-page__main {
                flex-direction: row;
              }
              .dish-page__product-info {
                max-width: calc(100% - ${dishPageRightWidth});
                flex-basis: auto;
                flex-grow: 1;
                padding-left: 100px;
                padding-right: 27px;
                padding-top: 34px;
                padding-bottom: 100px;
              }
              .dish-page__product-info__summary {
                display: inline-flex;
                width: calc(100% - ${dishPageImageSize});
                padding: 0;
                padding-left: 30px;
                box-sizing: border-box;
              }
              .dish-page__product-info__header-divider {
                width: 100%;
                margin: 26px auto 40px;
              }
              .dish-page__product-info__section + .dish-page__product-info__section {
                margin-top: 50px;
              }
              .dish-page__product-info__section-divider {
                width: 100%;
                margin: 50px auto;
              }
              .dish-page__product-info__images {
                display: inline-block;
                width: ${dishPageImageSize};
                height: 300px;
                vertical-align: top;
              }
              .dish-page__product-info__images :global(.image-slider__images-container) {
                height: calc(100% - 50px);
              }
              .dish-page__product-info__images :global(.image-slider__legend) {
                padding-top: 25px;
              }
              .dish-page__product-info__section {
                padding: 0;
              }
              .dish-page__order {
                max-width: ${dishPageRightWidth};
                flex-basis: ${dishPageRightWidth};
                flex-grow: 0;
                flex-shrink: 0;
                padding: 0 ${dishPageRightHorizontalMargin};
              }
              .dish-page__order__header {
                padding: 38px 0;
              }
              .dish-page__order__order-detail {
                padding: 47px 0 30px;
              }
              .dish-page__order__footer {
                margin: 40px 0;
              }
              .dish-page__footer {
                display: block;
              }
            }
          `}
        </style>
      </div>
    );
  }
}

const Extended = translate(['common'], { i18n, wait: process.browser })(
  DishPage,
);

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

export default connect(
  stateSelector,
  actionSubjects,
)(Extended);
