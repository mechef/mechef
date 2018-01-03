// @flow

import * as React from 'react';
import KitchenHeader from './KitchenHeader';
import ImageSlider from './ImageSlider';
import DishOrder from './DishOrder';
import AddToCartButton from './AddToCartButton';
import type { DishOrderType } from './DishOrder';

import { MeetupObject } from '../utils/flowTypes';

type Props = {
  kitchen: string,
  id: string,
  //fetchDish$: any => Rx.Observable,
};

type State = {
  kitchenName: string,
  profileImage?: string,
  quantity: number,
  subTotal: number,
  dish: {
    dishName: string,
    quantity: number,
    unitPrice: number,
    images: Array<string>,
    deliveryList: Array<MeetupObject>,
  },
  order: DishOrderType,
};

class DishPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      kitchenName: 'momokitchen',
      profileImage: '/static/avatar.jpg',
      quantity: 1,
      dish: {
        dishName: 'Food. Very good food in fact. You have to try this!',
        unitPrice: 9,
        quantity: 10,
        images: ['dummy', 'dummy2'],
        deliveryList: [
          {
            type: 'Meet Up',
            note: '9F cafeteria',
            meetupAddress: 'Rakuten Crimson House, Nikotama, Tokyo',
            meetupMonday: true,
            meetupStartTime: '8:00',
            meetupEndTime: '9:00',
          },
          {
            type: 'Meet Up',
            note: '9F cafeteria',
            meetupAddress: 'Rakuten Crimson House, Nikotama, Tokyo',
            meetupFriday: true,
            meetupStartTime: '17:00',
            meetupEndTime: '18:00',
          },
        ]
      },
      subTotal: 0,
      order: {
        quantity: 1,
        subTotal: 0,
      },
    };

    this.setState({
      subTotal: this.state.dish.unitPrice,
      order: { subTotal: this.state.dish.unitPrice },
    });

    this.onOrderChanged = this.onOrderChanged.bind(this);
    this.addToCartClick = this.addToCartClick.bind(this);
  }

  componentDidMount() {
    // this.props.fetchDish();
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
    return (
      <div className="dish-page">
        <div className="dish-page__main">
          <div className="dish-page__left">
            <KitchenHeader
              name={this.state.kitchenName}
              profileImage={this.state.profileImage}
            />
            <div className="dish-page__left__header">
              <div>
                <div className="dish-page__left__header--left">
                  <ImageSlider images={this.state.dish.images} />
                </div>
                <div className="dish-page__left__header--right">
                  <div className="dish-page__left__field-title dish-page__left__dish-name">
                    { this.state.dish.dishName }
                  </div>
                  <div>
                    {
                      this.state.dish.deliveryList.reduce((all, deliveryOption) => {
                        if (!all.includes(deliveryOption.type)) {
                          all.push(deliveryOption.type);
                        }
                        return all;
                      }, []).map((deliveryOption) => (
                        <span className="dish-page__left__delivery-option-badge">{deliveryOption}</span>
                      ))
                    }
                  </div>
                </div>
              </div>
              <div className="dish-page__left__header--bottom">
                <div>
                  <span className="dish-page__left__header__title">Remaining Quantity</span>
                  <span className="dish-page__left__header__field">{this.state.dish.quantity}</span>
                </div>
                <div>
                  <span className="dish-page__left__header__title">Unit Price</span>
                  <span className="dish-page__left__header__field">{this.state.dish.unitPrice}</span>
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
                  3 ~ 4 People
                </div>
              </div>
              <div className="dish-page__left__section__cell">
                <div className="dish-page__left__field-title">
                  Preparation Time
                </div>
                <div className="dish-page__left__field-content">
                  3 Days
                </div>
              </div>
            </div>
            <div className="dish-page__left__section">
              <div className="dish-page__left__field-title dish-page__left__category">
                Category
              </div>
              <div className="dish-page__left__field-content">
                <div className="dish-page__left__field-content__label">
                  Food
                </div>
                <div className="dish-page__left__field-content__label">
                  Vegetarian
                </div>
                <div className="dish-page__left__field-content__label">
                  Brunch
                </div>
              </div>
            </div>
            <div className="dish-page__left__section">
              <div className="dish-page__left__field-title  dish-page__left__ingredients">
                Ingredients
              </div>
              <div className="dish-page__left__field-content">
                <div className="dish-page__left__field-content__label">
                  Flour and shit and shit and shit and carcinogen and gmo and shit and shit
                </div>
                <div className="dish-page__left__field-content__label">
                  Egg
                </div>
                <div className="dish-page__left__field-content__label">
                  Milk
                </div>
              </div>
            </div>
            <hr className="dish-page__left__section-divider" />
            <div className="dish-page__left__section">
              <div className="dish-page__left__field-title">
                Delivery
              </div>
              <div className="dish-page__left__field-content">
                {
                  this.state.dish.deliveryList.map((deliveryOption) => (
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
                price={this.state.dish.unitPrice}
                maxServing={this.state.dish.quantity}
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
