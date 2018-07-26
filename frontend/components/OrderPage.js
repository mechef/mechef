// @flow

import React from 'react';
import Rx from 'rxjs/Rx';
import { translate } from 'react-i18next';
import i18n from '../i18n';
import { connect } from '../state/RxState';
import orderActions from '../actions/orderActions';
import errorActions from '../actions/errorActions';
import Modal from './Modal';
import OrderModal from './OrderModal';
import type { OrderObject, OrderState } from '../utils/flowTypes';
import { IMAGE_URL } from '../utils/constants';
import {
  primaryColor,
  textColor,
  whiteColor,
  primaryBtnHoverColor,
} from '../utils/styleVariables';
import DefaultComponent from './DefaultComponent';
import OrderItem from './OrderItem';
import Spinner from '../components/Spinner';

type Props = {
  order: {
    orderList: Array<OrderObject>,
    isLoading: boolean,
  },
  fetchOrders$: any => Rx.Observable,
  setLoading$: boolean => Rx.Observable,
  updateOrderState$: ({ id: string, state: OrderState }) => Rx.Observable,
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
  t: (key: string) => string,
};

type State = {
  isShowOrderModal: boolean,
  currentOrder: OrderObject,
  filter: string,
};

class OrderPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isShowOrderModal: false,
      currentOrder: {},
      filter: 'all',
    };
  }
  componentWillMount() {
    this.props.setLoading$(true);
  }
  componentDidMount() {
    this.props.fetchOrders$();
  }
  render() {
    const {
      order: { orderList, isLoading },
      setError$,
      error,
      updateOrderState$,
    } = this.props;

    return (
      <div className="container">
        {error.isShowModal ? (
          <Modal
            title={error.title}
            message={error.message}
            onCancel={() =>
              setError$({ isShowModal: false, title: '', message: '' })
            }
          />
        ) : null}
        {isLoading ? <Spinner /> : null}
        {this.state.isShowOrderModal ? (
          <OrderModal
            order={this.state.currentOrder}
            onUpdateState={(orderState: OrderState) => {
              this.props.setLoading$(true);
              updateOrderState$({
                id: this.state.currentOrder._id || '',
                state: orderState,
              });
              this.setState({
                isShowOrderModal: false,
              });
            }}
            onCancel={() => {
              this.setState({
                isShowOrderModal: false,
                currentOrder: {},
              });
            }}
            t={this.props.t}
          />
        ) : null}
        {orderList && orderList.length ? (
          <div className="orderWrapper">
            <div className="header">
              <div className="titleWithNotification">
                <span className="orderTitle">{this.props.t('order')}</span>
                <button
                  className={`
                      notification
                      ${this.state.filter === 'all' ? 'selected' : ''}
                    `}
                  onClick={() => {
                    this.setState({ filter: 'all' });
                  }}
                >
                  {orderList.length}
                </button>
              </div>
              <div className="titleWithNotification">
                <span className="orderTitle">{this.props.t('pending')}</span>
                <button
                  className={`
                      notification
                      ${this.state.filter === 'pending' ? 'selected' : ''}
                    `}
                  onClick={() => {
                    this.setState({ filter: 'waiting' });
                  }}
                >
                  {
                    orderList.filter(
                      (order: OrderObject) => order.state === 'waiting',
                    ).length
                  }
                </button>
              </div>
              <div className="titleWithNotification">
                <span className="orderTitle">{this.props.t('cancelled')}</span>
                <button
                  className={`
                      notification
                      ${this.state.filter === 'cancelled' ? 'selected' : ''}
                    `}
                  onClick={() => {
                    this.setState({ filter: 'cancelled' });
                  }}
                >
                  {
                    orderList.filter(
                      (order: OrderObject) => order.state === 'cancelled',
                    ).length
                  }
                </button>
              </div>
              <div className="titleWithNotification">
                <span className="orderTitle">{this.props.t('delivered')}</span>
                <button
                  className={`
                      notification
                      ${this.state.filter === 'finished' ? 'selected' : ''}
                    `}
                  onClick={() => {
                    this.setState({ filter: 'finished' });
                  }}
                >
                  {orderList.filter(order => order.state === 'finished').length}
                </button>
              </div>
            </div>
            {orderList
              .filter(
                order =>
                  order.state === this.state.filter ||
                  this.state.filter === 'all',
              )
              .map(order => (
                <div
                  className="orderItemWrapper"
                  onClick={() => {
                    this.setState({
                      isShowOrderModal: true,
                      currentOrder: order,
                    });
                  }}
                >
                  <OrderItem
                    sellerId={order.buyerName}
                    menuTitle={order.buyerName}
                    buyerEmail={order.buyerEmail}
                    quantity={order.quantity}
                    orderTime={order.orderTime}
                    deliveryTo={order.deliveryAddress}
                    deliveryTime={order.deliveryTime}
                    totalPrice={order.amount}
                    status="WAITING"
                    menuImageUrl={
                      order.image ? `${IMAGE_URL}/${order.image}` : ''
                    }
                    t={this.props.t}
                  />
                </div>
              ))}
          </div>
        ) : !isLoading ? (
          <DefaultComponent coverPhotoSrc="../static/img/orders_default.jpg">
            <div className="textSection">
              <h2 className="title">{this.props.t('hello_there')}</h2>
              <p className="description">
                {this.props.t('order_default_description')}
              </p>
            </div>
            <button className="addDish" onClick={() => {}}>
              {this.props.t('my_store_link')}
            </button>
          </DefaultComponent>
        ) : null}
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
              overflow: scroll;
            }

            .orderWrapper {
              height: 100%;
              overflow: scroll;
            }

            .header {
              display: flex;
              width: 744px;
              justify-content: space-around;
              margin-bottom: 27px;
            }

            .titleWithNotification {
              display: flex;
              align-items: center;
            }

            .orderTitle {
              font-size: 14px;
              line-height: 1.11;
              letter-spacing: 0.2px;
              color: ${textColor};
            }

            .notification {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 30px;
              height: 20px;
              margin-left: 15px;
              background-color: #b9b9b9;
              border-radius: 26px;
              color: ${whiteColor};
              border: 0;
              outline: none;
              cursor: pointer;
            }

            .notification:hover, .notification.selected {
              background-color: ${primaryColor};
            }

            .orderItemWrapper {
              width: 744px;
              height: 195px;
              margin-bottom: 20px;
              cursor: pointer;
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

const stateSelector = ({ order, error }) => ({ order, error });

const actionSubjects = {
  ...errorActions,
  ...orderActions,
};

const Extended = translate(['common'], { i18n, wait: process.browser })(
  OrderPage,
);

export default connect(
  stateSelector,
  actionSubjects,
)(Extended);
