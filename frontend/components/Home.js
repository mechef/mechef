// @flow

import * as React from 'react';
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
import MobileOrderItem from './MobileOrderItem';
import {
  borderRadius,
  borderColor,
  transparent,
  whiteColor,
  textColor,
  textHintColor,
  shallowGreyBgColor,
  primaryColor,
} from '../utils/styleVariables';
import type { AccountObject, OrderObject } from '../utils/flowTypes';
import { IMAGE_URL, ORDER_STATE, STORE_LINK_BASE } from '../utils/constants';
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

type State = {
  showShareStoreLinkModal: boolean,
};

export class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showShareStoreLinkModal: false,
    };
  }

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
            type="error"
            title={error.title}
            message={error.message}
            onCancel={() =>
              setError$({ isShowModal: false, title: '', message: '' })
            }
          />
        ) : null}
        {this.state.showShareStoreLinkModal ? (
          <Modal
            type="success"
            title={this.props.t('myhomestorelink_my_store_link')}
            message={this.props.t('myhomestorelink_copy_link')}
            onCancel={() => this.setState({ showShareStoreLinkModal: false })}
          >
            {account.currentAccount.kitchenName ? (
              <div className="storeLinkWrapper">
                <p className="storeLink">{`${STORE_LINK_BASE}/${
                  account.currentAccount.kitchenName
                }`}</p>
                <button
                  className="copyBtn"
                  onClick={() => {
                    // $FlowFixMe
                    document.oncopy = function(event) {
                      if (account.currentAccount.kitchenName) {
                        event.clipboardData.setData(
                          'text/plain',
                          `${STORE_LINK_BASE}/${
                            account.currentAccount.kitchenName
                          }`,
                        );
                      }
                      event.preventDefault();
                    };
                    document.execCommand('copy', false, null);
                    window.alert('Copied to Clipboard');
                  }}
                >
                  {this.props.t('myhomestorelink_button_copy_link')}
                </button>
              </div>
            ) : null}
          </Modal>
        ) : null}
        <div
          className="dashboard-content__header"
          style={{
            backgroundImage: `url('${
              this.props.account.currentAccount.coverPhoto
                ? `${IMAGE_URL}/${this.props.account.currentAccount.coverPhoto}`
                : '../static/img/pancake.jpg'
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
          <button
            className="myKitchenLink"
            onClick={() => {
              this.setState({ showShareStoreLinkModal: true });
            }}
          >
            <span className="kitchenLinkText">
              {this.props.t('myhome_button_my_store')}
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
        <div className="orderWrapper">
          {orderList && orderList.length ? (
            <Media query="(max-width: 768px)">
              {matches =>
                matches ? (
                  orderList
                    .filter(order => order.state === ORDER_STATE.waiting)
                    .map(orderItem => (
                      <MobileOrderItem
                        deliveryTimeTitle={this.props.t('delivery_time')}
                        deliveryTime={moment(orderItem.deliveryTime).format(
                          'MMM DD   hh:mm',
                        )}
                        buyerName={orderItem.buyerName}
                        quantity={orderItem.quantity}
                        dishName={orderItem.dishName || ''}
                      />
                    ))
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
        </div>
        <style jsx>
          {`
            .homeContainer {
              background-color: #f8f7f7;
              height: 100%;
              min-height: 882px;
              overflow-x: hidden;
              overflow-y: scroll;
            }
            .storeLinkWrapper {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .storeLink {
              display: flex;
              width: 100%;
              height: 50px;
              justify-content: center;
              align-items: center;
              background-color: ${shallowGreyBgColor};
              padding-left: 5px;
              padding-right: 5px;
              font-size: 12px;
            }
            .copyBtn {
              border: 0;
              margin: auto;
              width: 100%;
              border: 1px solid ${borderColor};
              border-radius: ${borderRadius};
              color: ${borderColor};
              font-size: 14px;
              cursor: pointer;
              padding: 10px;
              letter-spacing: 0.7px;
            }

            .copyBtn:hover {
              border-color: ${primaryColor};
              color: ${primaryColor};
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
                  : '../static/img/avatar.jpg'
              }');
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
              font-size: 1.2rem;
              line-height: 1.33;
              letter-spacing: 0.3px;
              color: #4a4a4a;
            }

            .sellerId {
              margin-left: 116px;
              margin-bottom: 11px;
              font-size: 2.4rem;
              font-weight: 600;
              line-height: 1.2;
              letter-spacing: 0.6px;
              color: #4a4a4a;
            }
            .sellerName {
              margin: 8px 0 20px 116px;
              font-size: 1.4rem;
              line-height: 1.43;
              letter-spacing: 0.6px;
              color: #4a4a4a;
            }
            .orderWrapper {
              padding: 20px;
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
            }

            .tableHeader {
              background-color: ${whiteColor};
              width: 100%;
              height: 50px;
              display: flex;
              align-items: center;
              font-size: 1.2rem;
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
              font-size: 1.2rem;
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
              font-size: 1.8rem;
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
              font-size: 1.6rem;
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

const Extended = translate(['common'], {
  i18n,
  wait: typeof window !== 'undefined',
})(Home);

export default connect(
  stateSelector,
  actionSubjects,
)(Extended);
