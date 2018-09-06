// @flow

import React from 'react';
import Rx from 'rxjs/Rx';
import moment from 'moment';

import {
  borderRadius,
  whiteColor,
  primaryColor,
  lineHeight,
  titleFontSize,
  subtitleFontSize,
  textColor,
  textHintColor,
  transparent,
  fontSize,
  connectErrorColor,
} from '../utils/styleVariables';

import MailButton from './MailButton';
type Props = {
  sellerId?: string,
  menuTitle?: string,
  buyerEmail?: string,
  quantity?: number,
  orderTime?: string,
  deliveryTo?: string,
  deliveryTime?: string,
  totalPrice?: number,
  status?: string,
  profileImageUrl?: string,
  menuImageUrl?: string,
  t: (key: string) => string,
};

class OrderItem extends React.Component<Props> {
  static defaultProps = {
    description: '',
    profileImageUrl: '',
    menuImageUrl: '',
  };

  render() {
    return (
      <div className="orderContainer">
        <div className="orderThumbnail" />
        <div className="orderText">
          <div className="firstRow">
            <span className="sellerId">{this.props.sellerId}</span>
            <MailButton buyerEmail={this.props.buyerEmail} />
          </div>
          <div className="secondRow">{this.props.menuTitle}</div>
          <div className="thirdRow">
            <span className="quantity">{this.props.quantity}</span>
            <span className="totalPrice">$ {this.props.totalPrice}</span>
          </div>
          <div className="divider" />
          <div className="infoWrapper">
            <div className="infoTitle">
              {this.props.t('orderdetailview_order_time')}
            </div>
            <span className="infoContent">
              {moment(this.props.orderTime).format('MMM DD hh:mm')}
            </span>
          </div>
          <div className="infoWrapper">
            <div className="infoTitle">
              {this.props.t('orderdetailview_deli_to')}
            </div>
            <span className="infoContent">{this.props.deliveryTo}</span>
          </div>
          <div className="infoWrapper">
            <div className="infoTitle">
              {this.props.t('orderdetailview_Deli_time')}
            </div>
            <span className="infoContent">
              {moment(this.props.deliveryTime).format('MMM DD hh:mm')}
            </span>
          </div>
        </div>
        <style jsx>
          {`
            .orderContainer {
              display: flex;
              border-radius: ${borderRadius};
              background-color: ${whiteColor};
            }

            .orderThumbnail {
              background-image: ${this.props.menuImageUrl
                ? `url('${this.props.menuImageUrl}')`
                : "url('../static/img/pancake.jpg')"};
              background-size: cover;
              background-position: center;
              width: 195px;
              height: 195px;
              border-top-left-radius: ${borderRadius};
              border-bottom-left-radius: ${borderRadius};
              position: relative;
            }

            .orderText {
              flex: 1;
              display: flex;
              flex-direction: column;
              padding: 20px;
            }

            .firstRow {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .secondRow {
              font-size: ${fontSize};
              margin-bottom: 12px;
            }

            .thirdRow {
              display: flex;
              justify-content: space-between;
              color: ${textColor};
              font-weight: 500;
              margin-bottom: 12px;
            }

            .divider {
              height: 1px;
              width: 100%;
              background-color: ${connectErrorColor};
              margin-bottom: 12px;
            }

            .quantity {
              font-size: ${fontSize};
            }

            .totalPrice {
              font-size: 1.8rem;
            }

            .infoWrapper {
              display: flex;
              margin-bottom: 12px;
            }

            .infoTitle {
              width: 150px;
              margin-right: 20px;
              font-size: 1.2rem;
              color: ${connectErrorColor};
            }

            .infoContent {
              font-size: 1.2rem;
              color: ${textColor};
            }

            .sellerId {
              font-size: 1.4rem;
              font-weight: 500;
              color: ${textColor};
              margin-bottom: 10px;
            }

            @media (max-width: 768px) {
              .orderContainer {
                flex-direction: column;
              }
              .orderThumbnail {
                width: 100%;
                height: 70px;
                border-top-right-radius: ${borderRadius};
                border-bottom-left-radius: 0;
              }
            }
          `}
        </style>
      </div>
    );
  }
}

export default OrderItem;
