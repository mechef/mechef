// @flow

import React from 'react';
import Rx from 'rxjs/Rx';
import Media from 'react-media';
import { translate } from 'react-i18next';
import { withProps } from 'recompose';
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
import DashboardContentLayout from './DashboardContentLayout';
import OrderItem from './OrderItem';
import Spinner from '../components/Spinner';
import TitleWithNotification from '../components/TitleWithNotification';
import SelectBox from './SelectBox';

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
  currentOrder: ?OrderObject,
  filter: string,
};

class OrderPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isShowOrderModal: false,
      currentOrder: null,
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

    const orderStateOptions = [
      {
        text: (
          <TitleWithNotification
            key="order"
            title={this.props.t('order')}
            isSelected={this.state.filter === 'all'}
            count={orderList.length}
          />
        ),
        value: 'all',
      },
      {
        text: (
          <TitleWithNotification
            key="pending"
            title={this.props.t('pending')}
            isSelected={this.state.filter === 'waiting'}
            count={
              orderList.filter(
                (order: OrderObject) => order.state === 'waiting',
              ).length
            }
          />
        ),
        value: 'waiting',
      },
      {
        text: (
          <TitleWithNotification
            key="cancelled"
            title={this.props.t('cancelled')}
            isSelected={this.state.filter === 'cancelled'}
            count={
              orderList.filter(
                (order: OrderObject) => order.state === 'cancelled',
              ).length
            }
          />
        ),
        value: 'cancelled',
      },
      {
        text: (
          <TitleWithNotification
            key="delivered"
            title={this.props.t('delivered')}
            isSelected={this.state.filter === 'finished'}
            count={
              orderList.filter(
                (order: OrderObject) => order.state === 'finished',
              ).length
            }
          />
        ),
        value: 'finished',
      },
    ];

    return (
      <DashboardContentLayout>
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
        {this.state.isShowOrderModal && this.state.currentOrder ? (
          <OrderModal
            order={this.state.currentOrder}
            onUpdateState={(orderState: OrderState) => {
              this.props.setLoading$(true);
              if (this.state.currentOrder && this.state.currentOrder._id) {
                updateOrderState$({
                  id: this.state.currentOrder._id || '',
                  state: orderState,
                });
              }
              this.setState({
                isShowOrderModal: false,
              });
            }}
            onCancel={() => {
              this.setState({
                isShowOrderModal: false,
                currentOrder: null,
              });
            }}
            t={this.props.t}
          />
        ) : null}
        {orderList && orderList.length ? (
          <div className="orderWrapper">
            <Media query="(max-width: 540px)">
              {matches =>
                matches ? (
                  <SelectBox
                    options={orderStateOptions}
                    selectedValue={this.state.filter}
                    defaultText={orderStateOptions[0].text}
                    onChange={selectedValue => {
                      this.setState({ filter: String(selectedValue) });
                    }}
                  />
                ) : (
                  <div className="header">
                    {orderStateOptions.map(option =>
                      React.cloneElement(option.text, {
                        onClick: () => {
                          this.setState({ filter: option.value });
                        },
                      }),
                    )}
                  </div>
                )
              }
            </Media>
            {orderList
              .filter(
                order =>
                  order.state === this.state.filter ||
                  this.state.filter === 'all',
              )
              .map(order => (
                <div
                  key={order._id}
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
              {this.props.t('storesellerpreview_my_store_link')}
            </button>
          </DefaultComponent>
        ) : null}
        <style jsx>
          {`
            .orderWrapper {
              height: 100%;
              min-height: 400px;
              overflow: scroll;
              position: relative;
            }
            .header {
              display: flex;
              width: 100%;
              max-width: 744px;
              justify-content: space-around;
              margin-bottom: 27px;
            }

            .orderItemWrapper {
              width: 100%;
              max-width: 744px;
              margin-bottom: 20px;
              cursor: pointer;
              box-sizing: border-box;
            }

            .textSection {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding-top: 31px;
            }
            .title {
              font-family: 'Playball', cursive;
              font-size: 2.4rem;
              color: ${textColor};
            }

            .description {
              width: 315px;
              display: flex;
              justify-content: center;
              line-height: 1.5;
              font-size: 1.6rem;
              text-align: center;
              color: ${textColor};
            }
            .addDish {
              border: 0;
              padding: 0;
              margin-top: 70px;
              background-color: ${whiteColor};
              color: ${primaryColor};
              font-size: 1.6rem;
              margin: auto;
              cursor: pointer;
              outline: none;
            }
            .addDish:hover {
              color: ${primaryBtnHoverColor};
            }
          `}
        </style>
      </DashboardContentLayout>
    );
  }
}

const stateSelector = ({ order, error }) => ({ order, error });

const actionSubjects = {
  ...errorActions,
  ...orderActions,
};

const Extended = translate(['common'], {
  i18n,
  wait: typeof window !== 'undefined',
})(OrderPage);

export default connect(
  stateSelector,
  actionSubjects,
)(Extended);
