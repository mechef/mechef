// @flow

import React from 'react';
import Rx from 'rxjs/Rx';
import moment from 'moment';
import { translate } from 'react-i18next';
import Media from 'react-media';
import i18n from '../i18n';
import { connect } from '../state/RxState';
import accountActions from '../actions/accountActions';
import errorActions from '../actions/errorActions';
import orderActions from '../actions/orderActions';
import Modal from './Modal';
import {
  transparent,
  whiteColor,
  textColor,
  textHintColor,
  textSize,
} from '../utils/styleVariables';
import type { AccountObject, OrderObject } from '../utils/flowTypes';
import { IMAGE_URL, ORDER_STATE } from '../utils/constants';
import DefaultComponent from './DefaultComponent';

type Props = {
  account: {
    currentAccount: AccountObject,
  },
  order: {
    orderList: Array<OrderObject>,
  },
  fetchAccountDetail$: any => Rx.Observable,
  fetchOrders$: any => Rx.Observable,
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

export class Home extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchAccountDetail$();
    this.props.fetchOrders$();
  }
  render() {
    const {
      account,
      order: { orderList },
      setError$,
      error,
    } = this.props;
    return (
      <div className="homeContainer">
        {error.isShowModal ? (
          <Modal
            title={error.title}
            message={error.message}
            onCancel={() =>
              setError$({ isShowModal: false, title: '', message: '' })
            }
          />
        ) : null}
        <div
          className="dashboard-content__header"
          style={{
            backgroundImage: `url('${
              this.props.account.currentAccount.coverPhoto
                ? `${IMAGE_URL}/${this.props.account.currentAccount.coverPhoto}`
                : '../static/avatar.jpg'
            }`,
          }}
        />
        <div className="topWrapper">
          <div className="nameWrapper">
            <p className="sellerId">{`@${account.currentAccount.name ||
              ''}`}</p>
            <p className="sellerName">
              {account.currentAccount.kitchenName || ''}
            </p>
          </div>
          <button className="myKitchenLink">
            <span className="kitchenLinkText">
              {this.props.t('button_my_store')}
            </span>
          </button>
        </div>
        <p className="orderTableTitle">
          <span className="titleText">{this.props.t('home_order')}</span>
          {orderList && orderList.length ? (
            <span className="orderCount">
              <span className="orderCountNum">{orderList.length}</span>
            </span>
          ) : null}
        </p>
        {orderList && orderList.length ? (
          <Media query="(max-width: 768px)">
            {matches =>
              matches ? (
                <div>Test</div>
              ) : (
                <div className="orderTable">
                  <div className="tableHeader">
                    <span className="firstCell">
                      {this.props.t('delivery_time')}
                    </span>
                    <span className="secondCell">
                      {this.props.t('buyer_name')}
                    </span>
                    <span className="thirdCell">
                      {this.props.t('order_name')}
                    </span>
                    <span className="fourthCell">
                      {this.props.t('home_quantity')}
                    </span>
                  </div>
                  {orderList
                    .filter(order => order.state === ORDER_STATE.waiting)
                    .map((orderItem, index) => (
                      <div
                        key={orderItem._id}
                        className={`
                      tableBody
                      ${index % 2 === 0 ? 'greyBackground' : 'whiteBackground'}
                      ${
                        index === orderList.length - 1
                          ? 'borderBottomRadius'
                          : ''
                      }
                    `}
                      >
                        <span className="firstCell greyText">
                          {moment(orderItem.deliveryTime).format(
                            'MMM DD hh:mm',
                          )}
                        </span>
                        <span className="secondCell boldText">
                          {orderItem.buyerName}
                        </span>
                        <span className="thirdCell boldText">
                          {orderItem.dishName}
                        </span>
                        <span className="fourthCell boldText">
                          {orderItem.quantity}
                        </span>
                      </div>
                    ))}
                </div>
              )
            }
          </Media>
        ) : (
          <div className="defaultComponentWrapper">
            <DefaultComponent>
              <div className="textSection">
                <h2 className="title">{this.props.t('hello_there')}</h2>
                <p className="description">
                  {this.props.t('home_default_description')}
                </p>
              </div>
            </DefaultComponent>
          </div>
        )}
        <style jsx>
          {`
            .homeContainer {
              background-color: #f8f7f7;
              height: 100%;
              min-height: 882px;
              overflow: scroll;
            }
            .dashboard-content__header {
              margin-bottom: 25px;
              width: 100%;
              height: 240px;
              background-size: cover;
              background-position: center;
              position: relative;
            }

            .dashboard-content__header:after {
              content: '';
              position: absolute;
              top: 200px;
              left: 20px;
              background-image: url('${
                account.currentAccount.profileImage
                  ? `${IMAGE_URL}/${account.currentAccount.profileImage}`
                  : '../static/avatar.jpg'
              }'), url('../static/avatar.jpg');
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
              margin-left: 116px;
              margin-bottom: 11px;
              font-size: 24px;
              font-weight: 600;
              line-height: 0.83;
              letter-spacing: 0.6px;
              color: #4a4a4a;
            }
            .sellerName {
              margin: 8px 0 20px 116px;
              font-size: 14px;
              line-height: 1.43;
              letter-spacing: 0.6px;
              color: #4a4a4a;
            }
            @media all and (max-width: 768px) {
              .sellerId {
                margin-left: 20px;
                margin-top: 40px;
              }
              .sellerName {
                margin-left: 20px;
              }
            }
            .orderTable {
              width: calc(100% - 40px);
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
            .textSection {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding-top: 31px;
              margin-top: 150px;
            }
            .title {
              font-family: 'Playball', cursive;
              font-size: 24px;
              color: ${textColor};
            }

            .subtitle {
              font-size: ${textSize};
              font-weight: 500;
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

            .defaultComponentWrapper {
              margin-left: 20px;
            }
          `}
        </style>
      </div>
    );
  }
}

const stateSelector = ({ account, error, order }) => ({
  account,
  error,
  order,
});

const actionSubjects = {
  ...errorActions,
  ...accountActions,
  ...orderActions,
};

const Extended = translate(['common'], { i18n, wait: process.browser })(Home);

export default connect(
  stateSelector,
  actionSubjects,
)(Extended);
