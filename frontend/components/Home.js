// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import { connect } from '../state/RxState';
import accountActions from '../actions/accountActions';
import errorActions from '../actions/errorActions';
import Modal from './Modal';
import { transparent, whiteColor, textColor, textHintColor } from '../utils/styleVariables';
import { AccountObject } from '../utils/flowTypes';
import { IMAGE_URL } from '../utils/constants'

const sampleOrders = [
  {
    _id: 1,
    deliveryTime: 'JUN 22 18:00 - 19:00',
    buyerName: '@alvinarmstrong',
    orderName: 'Jasmine Honey Green Tea',
    quantity: 1,
  },
  {
    _id: 2,
    deliveryTime: 'JUN 22 17:00 - 18:00',
    buyerName: '@bibletangg',
    orderName: '飯糰',
    quantity: 5,
  },
  {
    _id: 3,
    deliveryTime: 'JUN 22 14:00 - 13:00',
    buyerName: '@yuan',
    orderName: '沙茶牛肉飯',
    quantity: 1,
  },
  {
    _id: 4,
    deliveryTime: 'JUN 22 14:00 - 13:00',
    buyerName: '@tzu',
    orderName: '番茄炒蛋',
    quantity: 4,
  },
];

type Props = {
  account: AccountObject,
  fetchAccountDetail$: any => Rx.Observable,
  setError$: ({ isShowModal: boolean, title: string, message: string }) => Rx.Observable,
  error: {
    title: string,
    message: string,
    isShowModal: bool,
  },
}

export class Home extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchAccountDetail$();
  }
  render() {
    const {
      account,
      setError$,
      error,
    } = this.props;
    return (
      <div className="homeContainer">
        {
          error.isShowModal ?
            <Modal
              title={error.title}
              message={error.message}
              onCancel={() => setError$({ isShowModal: false, title: '', message: '' })}
            />
            : null
        }
        <div className="dashboard-content__header" />
        <div className="topWrapper">
          <div className="nameWrapper">
            <p className="sellerId">{`@${account.name || ''}`}</p>
            <p className="sellerName">{`@${account.kitchenName || ''}`}</p>
          </div>
          <button className="myKitchenLink">
            <span className="kitchenLinkText">My Kitchen’s Link</span>
          </button>
        </div>
        <p className="orderTableTitle">
          <span className="titleText">ORDERS</span>
          <span className="orderCount">
            <span className="orderCountNum">
              14
            </span>
          </span>
        </p>
        <div className="orderTable">
          <div className="tableHeader">
            <span className="firstCell">Delivery Time</span>
            <span className="secondCell">Buyer‘s Name</span>
            <span className="thirdCell">Order Name</span>
            <span className="fourthCell">Quantity</span>
          </div>
          {
            sampleOrders.map((order, index) => (
              <div
                key={order._id}
                className={`
                  tableBody
                  ${index % 2 === 0 ? 'greyBackground' : 'whiteBackground'}
                  ${index === sampleOrders.length - 1 ? 'borderBottomRadius' : ''}
                `}
              >
                <span className="firstCell greyText">{order.deliveryTime}</span>
                <span className="secondCell boldText">{order.buyerName}</span>
                <span className="thirdCell boldText">{order.orderName}</span>
                <span className="fourthCell boldText">{order.quantity}</span>
              </div>
            ))
          }
        </div>
        <style jsx>
          {`
            .homeContainer {
              background-color: #f8f7f7;
              height: 100%;
              min-height: 882px;
            }
            .dashboard-content__header {
              margin-bottom: 25px;
              width: 100%;
              height: 240px;
              background-image: url('${this.props.account.coverPhoto ? `${IMAGE_URL}/${this.props.account.coverPhoto}` : "../static/pancake.jpg"}'), url('../static/pancake.jpg');
              background-size: cover;
              background-position: center;
              position: relative;
            }

            .dashboard-content__header:after {
              content: '';
              position: absolute;
              top: 200px;
              left: 20px;
              background-image: url('${this.props.account.profileImage ? `${IMAGE_URL}/${this.props.account.profileImage}` : "../static/avatar.jpg"}'), url('../static/avatar.jpg');
              background-size: cover;
              background-position: center;
              width: 80px;
              height: 80px;
              border-radius: 40px;
            }

            .topWrapper {
              display: flex;
              justify-content: space-between;
            }

            .nameWrapper {
              display: flex;
              flex-direction: column;
            }

            .myKitchenLink {
              height: 26px;
              border-radius: 26px;
              border: solid 1px #4a4a4a;
              margin-top: 20px;
              padding: 5px 16px;
              display: flex;
              align-items: center;
              margin-right: 26px;
              background-color: ${transparent};
              cursor: pointer;
            }

            .kitchenLinkText {
              font-size: 12px;
              line-height: 1.33;
              letter-spacing: 0.3px;
              color: #4a4a4a;
            }

            .sellerId {
              margin-left: 98px;
              margin-bottom: 11px;
              font-size: 24px;
              font-weight: 600;
              line-height: 0.83;
              letter-spacing: 0.6px;
              color: #4a4a4a;
            }
            .sellerName {
              margin-left: 101px;
              margin-bottom: 20px;
              font-size: 14px;
              line-height: 1.43;
              letter-spacing: 0.6px;
              color: #4a4a4a;
            }
            .orderTable {
              width: 747px;
              margin-left: 20px;
            }

            .tableHeader {
              background-color: ${whiteColor};
              width: 100%;
              height: 50px;
              display: flex;
              align-items: center;
              font-size: 12px;
              color: ${textColor};
              border-top-left-radius: 4px;
              border-top-right-radius: 4px;
            }

            .tableBody {
              display: flex;
              height: 80px;
              align-items: center;
            }

            .greyBackground {
              background-color: '#f7f6f6';
            }

            .whiteBackground {
              background-color: ${whiteColor};
            }

            .borderBottomRadius {
              border-bottom-left-radius: 4px;
              border-bottom-right-radius: 4px;
            }

            .greyText {
              color: ${textHintColor};
              font-size: 12px;
            }

            .boldText {
              font-weight: 500;
            }

            .firstCell {
              flex: 1;
              padding-left: 28px;
            }

            .secondCell {
              flex: 2;
              padding-left: 28px;
            }

            .thirdCell {
              flex: 3;
              padding-left: 28px;
            }

            .fourthCell {
              flex: 1;
              padding-left: 28px;
            }

            .orderTableTitle {
              display: flex;
              align-items: center;
              margin-bottom: 15px;
              margin-left: 20px;
            }
            .titleText {
              font-size: 18px;
              line-height: 1.11;
              letter-spacing: 0.5px;
              color: #4a4a4a;
            }
            .orderCount {
              width: 40px;
              height: 26px;
              border-radius: 26px;
              background-color: #3e9f40;
              display: flex;
              margin-left: 8px;
            }
            .orderCountNum {
              font-size: 16px;
              line-height: 1;
              letter-spacing: 0.4px;
              color: #ffffff;
              margin: auto;
            }
          `}
        </style>
      </div>
    )
  }
}

const stateSelector = ({ account, error }) => ({ account, error });

const actionSubjects = {
  ...errorActions,
  ...accountActions,
};

export default connect(stateSelector, actionSubjects)(Home);
