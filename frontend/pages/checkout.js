// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';
import { translate } from 'react-i18next';
import SelectBox from '../components/SelectBox';
import BuyerHeader from '../components/BuyerHeader';
import BuyerFooter from '../components/BuyerFooter';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { connect } from '../state/RxState';
import kitchenActions from '../actions/kitchenActions';
import orderActions from '../actions/orderActions';
import errorActions from '../actions/errorActions';
import i18n from '../i18n';
import {
  greyBackgroundColor,
  shallowGreyBgColor,
} from '../utils/styleVariables';
import { IMAGE_URL } from '../utils/constants';

type Props = {
  url: {
    query: {
      kitchen: string,
    },
  },
  createOrder$: (order: Object) => Rx.Observable,
  error: {
    title: string,
    message: string,
    isShowModal: boolean,
  },
  deliveryList: Array<Object>,
};

type State = {
  newOrder: {
    firstName: string,
    lastName: string,
    buyerEmail: string,
    buyerPhoneNumber: string,
    messageFromBuyer: string,
    deliveryTime: string,
    deliveryId: string,
  },
  cartOrderList: ?Array<Object>,
  fetchKitchen$: (kitchenName: string) => Rx.Observable,
};

class Checkout extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      newOrder: {
        firstName: '',
        lastName: '',
        buyerEmail: '',
        buyerPhoneNumber: '',
        messageFromBuyer: '',
        deliveryTime: '',
        deliveryId: '',
      },
      cartOrderList: null,
    };
  }
  componentDidMount() {
    if (!this.state.cartOrderList) {
      const orderJson = window.localStorage.getItem(
        `${encodeURIComponent(this.props.url.query.kitchen)}_cart`,
      );
      console.log(JSON.parse(orderJson).orders);
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        cartOrderList: orderJson ? JSON.parse(orderJson).orders : [],
      });
    }
    if (!this.props.deliveryList.length) {
      this.props.fetchKitchen$(this.props.url.query.kitchen);
    }
  }

  getTotal: (?Array<{ subTotal: number }>) => number;
  getTotal = (orders: Array<{ subTotal: number }>) =>
    orders ? orders.reduce((total, order) => total + order.subTotal, 0) : 0;
  orders: Array<Object>;

  render() {
    return (
      <div>
        <BuyerHeader />
        <div className="checkout">
          <div className="checkout-header">
            {/* TODO Bible: Replace with i18n */}
            Checkout Detail
          </div>
          <hr />
          <div className="content">
            <section className="info">
              <h3>YOUR INFO</h3>
              <div className="infoWrapper">
                <h4>First Name*</h4>
                <p className="subtitle">subtitle</p>
                <TextInput
                  type="text"
                  placeholder="Enter your first name"
                  size="medium"
                  value={this.state.newOrder.firstName}
                  onChange={event => {
                    if (event && event.target) {
                      this.setState({
                        newOrder: {
                          ...this.state.newOrder,
                          firstName: event.target.value,
                        },
                      });
                    }
                  }}
                />
              </div>
              <div className="infoWrapper">
                <h4>Last Name*</h4>
                <p className="subtitle">subtitle</p>
                <TextInput
                  type="text"
                  placeholder="Enter your last name"
                  size="medium"
                  value={this.state.newOrder.lastName}
                  onChange={event => {
                    if (event && event.target) {
                      this.setState({
                        newOrder: {
                          ...this.state.newOrder,
                          lastName: event.target.value,
                        },
                      });
                    }
                  }}
                />
              </div>
              <div className="infoWrapper">
                <h4>Email Address*</h4>
                <p className="subtitle">subtitle</p>
                <TextInput
                  type="email"
                  pattern="^.+@.+\..+$"
                  validationMessage={this.props.t('validationmessage_email')}
                  placeholder="Enter your email address"
                  size="medium"
                  value={this.state.newOrder.buyerEmail}
                  onChange={event => {
                    if (event && event.target) {
                      this.setState({
                        newOrder: {
                          ...this.state.newOrder,
                          buyerEmail: event.target.value,
                        },
                      });
                    }
                  }}
                />
              </div>
              <div className="infoWrapper">
                <h4>Phone Numbers*</h4>
                <p className="subtitle">subtitle</p>
                <TextInput
                  type="text"
                  placeholder="Enter your phone number"
                  size="medium"
                  value={this.state.newOrder.buyerPhoneNumber}
                  onChange={event => {
                    if (event && event.target) {
                      this.setState({
                        newOrder: {
                          ...this.state.newOrder,
                          buyerPhoneNumber: event.target.value,
                        },
                      });
                    }
                  }}
                />
              </div>
              <h3>DELIVERY DETAIL</h3>
              <SelectBox
                options={
                  // TODO Bible: Add shipping type and move to constant file in the future
                  [{ text: 'Meet Up', value: 'meetup' }]
                }
                selectedValue="meetup"
                defaultText="Meet Up"
                onChange={(selectedValue: string | number) => {
                  console.log(selectedValue);
                }}
              />
              <SelectBox
                options={this.props.deliveryList.map(deliveryItem => ({
                  text: deliveryItem.meetupAddress,
                  value: deliveryItem._id,
                }))}
                selectedValue={''}
                defaultText="Select the delivery option"
                onChange={(selectedValue: string | number) => {
                  this.setState({
                    newOrder: {
                      ...this.state.newOrder,
                      deliveryId: selectedValue,
                    },
                  });
                }}
              />
              <SelectBox
                options={[
                  { text: '11:58', value: '2017-12-01T11:58:31+00:00' },
                ]}
                selectedValue={''}
                defaultText="2017-12-01T11:58:31+00:00"
                onChange={(selectedValue: string | number) => {
                  this.setState({
                    newOrder: {
                      ...this.state.newOrder,
                      deliveryTime: selectedValue,
                    },
                  });
                }}
              />
            </section>
            <section className="orderList">
              <h3>YOUR ORDER</h3>
              <div className="order-content">
                {this.state.cartOrderList &&
                  this.state.cartOrderList.map(order => (
                    <section className="cartItem" key={order._id}>
                      <div
                        className="orderImage"
                        style={{
                          backgroundImage: `url('${
                            order.images && order.images.length > 0
                              ? `${IMAGE_URL}/${order.images.shift()}`
                              : '/static/svg/mechef_logo_white.svg'
                          }')`,
                        }}
                      />
                      <div className="orderInfo">
                        <h4>{order.dishName}</h4>
                        <p className="messageFromBuyer">
                          {order.messageFromBuyer}
                        </p>
                        <div className="otherInfo">
                          <span className="quantity">
                            {order.quantity * order.unitPrice}
                          </span>
                          <span className="quantity">{order.quantity}</span>
                        </div>
                      </div>
                    </section>
                  ))}
                <div className="cart-footer__item">
                  <span className="cart-footer__item__label">TOTAL</span>
                  <span>{`$${this.getTotal(
                    this.state.cartOrderList,
                  )}.00`}</span>
                </div>
              </div>
            </section>
          </div>
          <hr />
          <Button
            buttonStyle="primary"
            size="small"
            onClick={() => {
              const { firstName, lastName, ...rest } = this.state.newOrder;
              this.props.createOrder$({
                buyerName: `${firstName} ${lastName}`,
                menuList: this.state.cartOrderList
                  ? this.state.cartOrderList.map(order => ({
                      menuId: order.dishId,
                      quantity: order.quantity,
                    }))
                  : [],
                ...rest,
              });
            }}
          >
            {/* TODO Bible: Replace with i18n */}
            CHECKOUT
          </Button>
        </div>
        <BuyerFooter />
        <style jsx>
          {`
            hr {
              width: 100%;
              height: 2px;
              opacity: 0.3;
              background-color: #9b9b9b;
            }
            .checkout {
              margin: 0 100px;
              min-width: 596px;
            }
            .checkout-header {
              width: 100%;
              padding: 90px 0 30px;
              font-family: Playball;
              font-size: 30px;
              line-height: 1;
              color: #525252;
              text-align: center;
            }
            .content {
              display: flex;
              margin-bottom: 50px;
            }
            .info {
              flex: 1;
            }
            .orderList {
              flex: 1;
            }
            .infoWrapper {
              margin-bottom: 30px;
            }
            .infoWrapper > h4 {
              margin-bottom: 5px;
            }
            .subtitle {
              margin-top: 0;
              margin-bottom: 15px;
            }

            .order-content {
              background-color: ${shallowGreyBgColor};
              padding: 10px;
            }

            .cartItem {
              display: flex;
              height: 144px;
              width: 100%;
              border-bottom: 1px solid ${greyBackgroundColor};
              padding: 5px;
              box-sizing: border-box;
            }
            .orderImage {
              display: flex;
              flex-basis: 160px;
              height: 100%;
              flex-grow: 0;
              flex-shrink: 0;
              background-repeat: no-repeat;
              background-size: contain;
              background-position: center;
              background-color: ${greyBackgroundColor};
            }

            .orderInfo {
              flex: 1;
              padding: 10px;
            }

            .otherInfo {
              display: flex;
              justify-content: space-between;
            }

            .cart-footer {
              line-height: 24px;
              text-align: right;
              padding-bottom: 100px;
            }
            .cart-footer__item {
              display: flex;
              justify-content: flex-end;
            }
            .cart-footer__item .cart-footer__item__label {
              text-align; right;
            }
            .cart-footer__item .cart-footer__item__label + span {
              display: inline-block;
            }
            .cart-footer > .cart-footer__item + .cart-footer__item {
              padding-top: 18px;
            }
          `}
        </style>
      </div>
    );
  }
}

const stateSelector = ({ error, kitchen }) => ({
  deliveryList:
    kitchen && kitchen.kitchen && kitchen.kitchen.deliveryList
      ? kitchen.kitchen.deliveryList
      : [],
  error,
});

const actionSubjects = {
  ...errorActions,
  ...orderActions,
  ...kitchenActions,
};

const Extended = translate(['common'], { i18n, wait: process.browser })(
  Checkout,
);

export default connect(
  stateSelector,
  actionSubjects,
)(Extended);
