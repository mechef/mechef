// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import { connect } from '../state/RxState';
import orderActions from '../actions/orderActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import Modal from './Modal';
import { OrderObject } from '../utils/flowTypes';
import { IMAGE_URL } from '../utils/constants';
import { primaryColor, textColor, whiteColor, primaryBtnHoverColor } from '../utils/styleVariables';
import DefaultComponent from './DefaultComponent';
import OrderItem from './OrderItem';

type Props = {
  order: {
    orderList: Array<OrderObject>,
  },
  fetchOrders$: any => Rx.Observable,
  updateOrderStatus$: () => Rx.Observable,
  setError$: ({ isShowModal: boolean, title: string, message: string }) => Rx.Observable,
  error: {
    title: string,
    message: string,
    isShowModal: bool,
  },
}

const sampleOrderList = [
  {
    sellerId: '@bibletang',
    menuTitle: 'Lemon Tea',
    quantity: 1,
    orderTime: 'JUN 20 18:12:34',
    deliveryTo: 'Rakuten Crimson House',
    deliveryTime: 'JUN 21 18:30:00',
    totalPrice: '100.00',
    status: 'finished',
    profileImage: '8f4221976dbd9c7c513d51b76b1e704b',
    menuImage: '909769ed91bdfaef92411e91826159ee',
  },
  {
    sellerId: '@yuan',
    menuTitle: '沙茶牛肉',
    quantity: 14,
    orderTime: 'JUN 20 18:12:34',
    deliveryTo: 'Rakuten Crimson House',
    deliveryTime: 'JUN 21 18:30:00',
    totalPrice: '100.00',
    status: 'cancelled',
    profileImage: '8f4221976dbd9c7c513d51b76b1e704b',
    menuImage: '909769ed91bdfaef92411e91826159ee',
  },
  {
    sellerId: '@tzu',
    menuTitle: 'Hamburger',
    quantity: 2,
    orderTime: 'JUN 20 18:12:34',
    deliveryTo: 'Rakuten Crimson House',
    deliveryTime: 'JUN 21 18:30:00',
    totalPrice: '100.00',
    status: 'waiting',
    profileImage: '8f4221976dbd9c7c513d51b76b1e704b',
    menuImage: '909769ed91bdfaef92411e91826159ee',
  },
];

class OrderPage extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchOrders$();
  }
  render() {
    const {
      order: { orderList },
      setError$,
      error,
      updateOrderStatus$,
    } = this.props;

    return (
      <div className="container">
        {
          error.isShowModal ?
            <Modal
              title={error.title}
              message={error.message}
              onCancel={() => setError$({ isShowModal: false, title: '', message: '' })}
            />
            : null
        }
        {
          orderList && orderList.length ?
            <div className="orderWrapper">
              <div className="header">
                <div className="titleWithNotification">
                  <span className="orderTitle">Orders</span>
                  <button className="notification selected">14</button>
                </div>
                <div className="titleWithNotification">
                  <span className="orderTitle">Pending Orders</span>
                  <button className="notification">14</button>
                </div>
                <div className="titleWithNotification">
                  <span className="orderTitle">Cancelled Orders</span>
                  <button className="notification">14</button>
                </div>
              </div>
              {
                orderList.map(order => (
                  <div className="orderItemWrapper">
                    <OrderItem
                      sellerId={order.buyerName}
                      menuTitle={order.bueryName}
                      quantity={order.quantity}
                      orderTime={order.orderTime}
                      deliveryTo={order.deliveryAddress}
                      deliveryTime={order.deliveryTime}
                      totalPrice={order.amount}
                      status={'WAITING'}
                      profileImageUrl={`${IMAGE_URL}/${order.profileImage}`}
                      menuImageUrl={`${IMAGE_URL}/${order.menuImage}`}
                    />
                  </div>
                ))
              }
            </div>
            :
            <DefaultComponent coverPhotoSrc="../static/img/orders_default.jpg">
              <div className="textSection">
                <h2 className="title">Hello there!</h2>
                <p className="description">Share your menu to get your first order!</p>
              </div>
              <button className="addDish" onClick={() => {}}>MY STORE'S LINK</button>
            </DefaultComponent>
        }
        <style jsx>
          {`
            .container {
              margin: 0;
              padding-top: 49px
              padding-left: 19px;
              width: 100%;
              min-height: 792px;
              height: 100%;
              background-color: #f8f7f7;
            }

            .orderWrapper {
              height: 100%;
              overflow: scroll;
            }

            .header {
              display: flex;
              width: 619px;
              justify-content: space-around;
              margin-bottom: 27px;
            }

            .titleWithNotification {
              display: flex;
            }

            .orderTitle {
              font-size: 18px;
              line-height: 1.11;
              letter-spacing: 0.5px;
              color: ${textColor};
            }

            .notification {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 40px;
              height: 26px;
              margin-left: 15px;
              background-color: #b9b9b9;
              border-radius: 26px;
              color: ${whiteColor};
              border: 0;
              outline: none;
              font-size: 16px;
              cursor: pointer;
            }

            .notification:hover, .notification.selected {
              background-color: ${primaryColor};
            }

            .orderItemWrapper {
              margin-bottom: 20px;
            }

            .textSection {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding-top: 31px;
            }
            .title {
              font-family: 'Playball', cursive;
              font-size: 24px;
              color: ${textColor};
            }

            .description {
              width: 315px;
              display: flex;
              justify-content: center;
              line-height: 1.5;
              font-size: 16px;
              text-align: center;
              color: ${textColor};
            }
            .addDish {
              border: 0;
              padding: 0;
              margin-top: 70px;
              background-color: ${whiteColor};
              color: ${primaryColor};
              font-size: 16px;
              margin: auto;
              cursor: pointer;
              outline: none;
            }
            .addDish:hover {
              color: ${primaryBtnHoverColor};
            }
          `}
        </style>
      </div>
    );
  }
}


const stateSelector = ({ order, error, global }) => ({ order, error, global });

const actionSubjects = {
  ...errorActions,
  ...globalActions,
  ...orderActions,
};

export default connect(stateSelector, actionSubjects)(OrderPage);
