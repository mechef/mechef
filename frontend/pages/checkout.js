// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';
import { translate } from 'react-i18next';
import _ from 'lodash';
import moment from 'moment';
import 'react-dates/initialize';

import { SingleDatePicker } from 'react-dates';
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
import Modal from '../components/Modal';
import {
  primaryColor,
  greyBackgroundColor,
  shallowGreyBgColor,
  smallBreak,
  textHintColor,
  borderRadius,
} from '../utils/styleVariables';
import { IMAGE_URL } from '../utils/constants';

type Props = {
  url: {
    query: {
      kitchenName: string,
    },
  },
  createOrder$: (order: Object) => Rx.Observable,
  setError$: ({
    isShowModal: boolean,
    title: string,
    message: string,
  }) => Rx.Observable,
  error: {
    title: string,
    message: string,
    isShowModal: boolean,
  },
  deliveryList: Array<Object>,
  fetchKitchen$: (kitchenName: string) => Rx.Observable,
  t: (key: string) => string,
};

type State = {
  newOrder: {
    firstName: string,
    lastName: string,
    buyerEmail: string,
    buyerPhoneNumber: string,
    messageFromBuyer: string,
    deliveryDate: ?moment,
    deliveryHHmm: string,
    deliveryId: string,
  },
  cartOrderList: ?Array<Object>,
  isFocusOnCalendar: boolean,
};

const get30MinIntervalList = (startTime, endTime) => {
  if (!startTime || !endTime) {
    return [];
  }
  const resultList = [];
  const start = moment(startTime, 'HH:mm');
  const end = moment(endTime, 'HH:mm');
  while (end.diff(start) >= 0) {
    const formatedTime = start.format('HH:mm');
    resultList.push({ text: formatedTime, value: formatedTime });
    start.add(30, 'm');
  }
  return resultList;
};

const getTimeOptionList = (deliveryList, deliveryId) => {
  const deliveryItem = _.defaultTo(
    _.find(deliveryList, { _id: deliveryId }),
    {},
  );
  return get30MinIntervalList(
    deliveryItem.meetupStartTime,
    deliveryItem.meetupEndTime,
  );
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
        deliveryDate: null,
        deliveryHHmm: '',
        deliveryId: '',
      },
      cartOrderList: null,
      isFocusOnCalendar: false,
    };
    this.longestBufferDay = props.deliveryList.reduce(
      (currentMaxBufferDay, nextDeliveryItem) => {
        return nextDeliveryItem.cookingBuffer > currentMaxBufferDay
          ? nextDeliveryItem.cookingBuffer
          : currentMaxBufferDay;
      },
      0,
    );
  }

  longestBufferDay: number;

  componentDidMount() {
    if (!this.state.cartOrderList) {
      const orderJson = window.localStorage.getItem(
        `${encodeURIComponent(this.props.url.query.kitchenName)}_cart`,
      );
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        cartOrderList: orderJson ? JSON.parse(orderJson).orders : [],
      });
    }
    if (!this.props.deliveryList.length) {
      this.props.fetchKitchen$(this.props.url.query.kitchenName);
    }
  }

  getTotal: (?Array<{ subTotal: number }>) => number;

  getTotal = (orders: Array<{ subTotal: number }>) =>
    orders ? orders.reduce((total, order) => total + order.subTotal, 0) : 0;

  orders: Array<Object>;

  onDateChange = date => {
    this.setState({
      newOrder: {
        ...this.state.newOrder,
        deliveryDate: date,
      },
    });
  };

  onFocusChange = ({ focused }) => {
    this.setState({ isFocusOnCalendar: focused });
  };

  render() {
    const { error, setError$ } = this.props;
    return (
      <div>
        <BuyerHeader kitchenName={this.props.url.query.kitchenName} />
        {error.isShowModal ? (
          <Modal
            title={error.title}
            message={error.message}
            onCancel={() =>
              setError$({ isShowModal: false, title: '', message: '' })
            }
          />
        ) : null}
        <div className="checkout">
          <h1 className="checkout-header">Checkout Detail</h1>
          <hr />
          <div className="content">
            <section className="info">
              <h3>YOUR INFO</h3>
              <div className="infoWrapper">
                <h4>First Name*</h4>
                <p className="subtitle">subtitle</p>
                <div className="textInputWrapper">
                  <TextInput
                    type="text"
                    placeholder="Enter your first name"
                    size="medium"
                    value={this.state.newOrder.firstName}
                    onChange={event => {
                      if (event && event.currentTarget) {
                        this.setState({
                          newOrder: {
                            ...this.state.newOrder,
                            firstName: event.currentTarget.value,
                          },
                        });
                      }
                    }}
                  />
                </div>
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
                    if (event && event.currentTarget) {
                      this.setState({
                        newOrder: {
                          ...this.state.newOrder,
                          lastName: event.currentTarget.value,
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
                    if (event && event.currentTarget) {
                      this.setState({
                        newOrder: {
                          ...this.state.newOrder,
                          buyerEmail: event.currentTarget.value,
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
                    if (event && event.currentTarget) {
                      this.setState({
                        newOrder: {
                          ...this.state.newOrder,
                          buyerPhoneNumber: event.currentTarget.value,
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
                options={this.props.deliveryList
                  .filter(deliveryItem => deliveryItem.meetupAddress)
                  .map(deliveryItem => ({
                    text: deliveryItem.meetupAddress,
                    value: deliveryItem._id,
                  }))}
                selectedValue={this.state.newOrder.deliveryId}
                defaultText="Select the delivery option"
                onChange={(selectedValue: string | number) => {
                  this.setState({
                    newOrder: {
                      ...this.state.newOrder,
                      deliveryId: String(selectedValue),
                    },
                  });
                }}
              />
              {this.state.newOrder.deliveryId ? (
                <div className="datePickerWrapper">
                  <SingleDatePicker
                    id="date_input"
                    date={this.state.newOrder.deliveryDate}
                    focused={this.state.isFocusOnCalendar}
                    onDateChange={this.onDateChange}
                    onFocusChange={this.onFocusChange}
                    isDayBlocked={moment => {
                      const currentDeliveryOption = _.find(
                        this.props.deliveryList,
                        { _id: this.state.newOrder.deliveryId },
                      );
                      const currentDay = moment.day();
                      if (currentDeliveryOption === undefined) {
                        return false;
                      }
                      if (
                        (currentDeliveryOption !== undefined &&
                          currentDeliveryOption !== null) ||
                        (!currentDeliveryOption.meetupSunday &&
                          currentDay === 0) ||
                        (!currentDeliveryOption.meetupMonday &&
                          currentDay === 1) ||
                        (!currentDeliveryOption.meetupTuesday &&
                          currentDay === 2) ||
                        (!currentDeliveryOption.meetupWednesday &&
                          currentDay === 3) ||
                        (!currentDeliveryOption.meetupThursday &&
                          currentDay === 4) ||
                        (!currentDeliveryOption.meetupFriday &&
                          currentDay === 5) ||
                        (!currentDeliveryOption.meetupSaturday &&
                          currentDay === 6)
                      ) {
                        return true;
                      } else {
                        return false;
                      }
                    }}
                  />
                </div>
              ) : null}
              {this.state.newOrder.deliveryDate ? (
                <SelectBox
                  options={getTimeOptionList(
                    this.props.deliveryList,
                    this.state.newOrder.deliveryId,
                  )}
                  selectedValue={this.state.newOrder.deliveryHHmm}
                  defaultText=""
                  onChange={(selectedValue: string | number) => {
                    this.setState({
                      newOrder: {
                        ...this.state.newOrder,
                        deliveryHHmm: String(selectedValue),
                      },
                    });
                  }}
                />
              ) : null}
            </section>
            <section className="orderList">
              <h3 className="orderListHeader">YOUR ORDER</h3>
              <div className="orderContentWrapper">
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
                            <span className="quantity">{order.quantity}</span>
                            <span className="unitPrice">
                              {`$${order.quantity * order.unitPrice}.00`}
                            </span>
                          </div>
                        </div>
                      </section>
                    ))}
                  <div className="cart-footer__item">
                    <span className="cart-footer__item__label">TOTAL</span>
                    <span className="totalPrice">
                      {`$${
                        this.state.cartOrderList
                          ? this.getTotal(this.state.cartOrderList)
                          : 0
                      }.00`}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <hr className="footerLine" />
          <section className="paymentDetail">
            <h2 classname="paymentTitle">Payment Detail</h2>
            <h5 className="paymentSubtitle">Cash on delivery</h5>
            <p className="paymentDetailDescription">
              Please stay tune, more payment method like credit card is coming
              soon!
            </p>
          </section>
          <Button
            buttonStyle="primary"
            size="small"
            onClick={() => {
              const {
                firstName,
                lastName,
                deliveryDate,
                deliveryHHmm,
                ...rest
              } = this.state.newOrder;
              const HH = Number(deliveryHHmm.split(':')[0]);
              const mm = Number(deliveryHHmm.split(':')[1]);
              this.props.createOrder$({
                buyerName: `${firstName} ${lastName}`,
                menuList: this.state.cartOrderList
                  ? this.state.cartOrderList.map(order => ({
                      menuId: order.dishId,
                      quantity: order.quantity,
                    }))
                  : [],
                deliveryTime: deliveryDate
                  ? deliveryDate
                      .hour(HH)
                      .minute(mm)
                      .toString()
                  : '',
                ...rest,
                kitchenName: this.props.url.query.kitchenName,
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
              display: flex;
              flex-direction: column;
              max-width: 822px;
              margin: auto;
              padding: 40px;
            }
            .checkout-header {
              width: 100%;
              font-family: Playball;
              font-size: 2.8rem;
              line-height: 1;
              color: #525252;
              text-align: center;
            }
            .content {
              display: flex;
              flex-direction: column;
              margin-bottom: 40px;
            }
            .info {
              order: 2;
              padding: 20px 12px;
              box-sizing: border-box;
            }
            .orderList {
              order: 1;
            }
            .orderListHeader {
              display: none;
            }
            @media (min-width: ${smallBreak}) {
              .content {
                flex-direction: row;
              }
              .info {
                order: 1;
                flex: 1;
              }
              .orderList {
                order: 2;
                flex: 1;
              }
              .orderListHeader {
                display: block;
              }
            }
            .infoWrapper {
              margin-bottom: 30px;
            }
            .infoWrapper > h4 {
              margin-bottom: 5px;
              font-size: 1.4rem;
            }
            .textInputWrapper {
              width: 100%;
            }
            .subtitle {
              margin-top: 0;
              margin-bottom: 15px;
              font-size: 1.2rem;
            }
            .orderContentWrapper {
              background-color: ${primaryColor};
              padding-bottom: 10px;
              border-bottom-left-radius: ${borderRadius};
              border-bottom-right-radius: ${borderRadius};
            }
            .order-content {
              background-color: ${shallowGreyBgColor};
              padding: 10px;
            }

            .cartItem {
              display: flex;
              width: 100%;
              border-bottom: 1px solid ${greyBackgroundColor};
              padding: 20px 8px;
              box-sizing: border-box;
            }
            .orderImage {
              display: flex;
              flex-grow: 0;
              flex-shrink: 0;
              background-repeat: no-repeat;
              background-size: contain;
              background-position: center;
              background-color: ${greyBackgroundColor};
              width: 100px;
              height: 100px;
            }

            .orderInfo {
              flex: 1;
              padding-left: 10px;
              padding-right: 10px;
            }
            .orderInfo > h4 {
              margin: 0;
            }

            .otherInfo {
              display: flex;
              justify-content: space-between;
            }

            .cartItem {
              padding-top: 15px;
              padding-bottom: 15px;
            }

            .cart-footer {
              line-height: 24px;
              text-align: right;
              padding-bottom: 100px;
            }
            .cart-footer__item {
              display: flex;
              justify-content: flex-end;
              margin-top: 20px;
              margin-bottom: 10px;
              padding-left: 15px;
              padding-right: 15px;
            }
            .cart-footer__item .cart-footer__item__label {
              text-align: right;
              margin-right: 40px;
            }
            .cart-footer__item .cart-footer__item__label + span {
              display: inline-block;
            }
            .cart-footer > .cart-footer__item + .cart-footer__item {
              padding-top: 18px;
            }
            .totalPrice {
              color: ${primaryColor};
            }
            .footerLine {
              margin-bottom: 50px;
            }
            .paymentDetail {
              margin-bottom: 60px;
            }
            .paymentDetailDescription {
              color: ${textHintColor};
              font-size: 1.2rem;
            }
            .datePickerWrapper {
              margin-bottom: 5px;
            }
          `}
        </style>
      </div>
    );
  }
}

const stateSelector = ({ error, kitchen }) => ({
  deliveryList:
    kitchen && kitchen.currentKitchen
      ? kitchen.currentKitchen.deliveryList
      : [],
  error,
});

const actionSubjects = {
  ...errorActions,
  ...orderActions,
  ...kitchenActions,
};

const Extended = translate(['common'], {
  i18n,
  wait: typeof window !== 'undefined',
})(Checkout);

export default connect(
  stateSelector,
  actionSubjects,
)(Extended);
